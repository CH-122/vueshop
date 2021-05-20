<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"> 添加用户 </el-button>
        </el-col>
      </el-row>

      <!-- 数据展示 -->
      <el-table :data="userList" :border="true" :stripe="true">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mobile" label="电话" width="140">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="stateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="165">
          <template>
            <!-- slot-scope="scope" -->
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>

            <el-tooltip effect="dark" content="权限分配" placement="top">
              <el-button
                type="warning"
                icon="el-icon-setting"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userParam.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="userParam.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { getUserInfo } from "../../network/user";
import { request } from "../../network/request";
export default {
  data() {
    return {
      userList: [],
      total: 0,
      userParam: {
        query: "",
        pagenum: 1,
        pagesize: 4,
      },
    };
  },
  created() {
    this.getUserList(
      this.userParam.query,
      this.userParam.pagenum,
      this.userParam.pagesize
    );
  },
  methods: {
    getUserList(query, pagenum, pagesize) {
      getUserInfo(query, pagenum, pagesize).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.console.error("获取用户列表失败");
        }
        this.userList = res.data.users;
        this.total = res.data.total;
      });
    },
    handleSizeChange(newSize) {
      this.userParam.pagesize = newSize;
      this.getUserList(
        this.userParam.query,
        this.userParam.pagenum,
        this.userParam.pagesize
      );
    },
    handleCurrentChange(newPage) {
      this.userParam.pagenum = newPage;
      this.getUserList(
        this.userParam.query,
        this.userParam.pagenum,
        this.userParam.pagesize
      );
    },
    stateChanged(userInfo) {
      // console.log(userInfo);
      request("put", {
        // 注意使用反引号
        url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
      }).then((res) => {
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error("更新用户状态失败");
        }
        this.$message.success("状态更新成功");
      });
    },
  },
};
</script>
<style scoped>
.el-table {
  margin-top: 15px;
}
</style>