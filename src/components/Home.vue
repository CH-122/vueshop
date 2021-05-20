<template>
  <!-- <div> -->
  <el-container class="container">
    <el-header>
      <div class="logo">
        <img src="../assets/img/ch.jpg" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <el-container>
      <el-aside :width="isToggle ? '64px' : '200px'">
        <div class="toggle" @click="toggleClick">|||</div>
        <el-menu
          background-color="#82c077"
          text-color="#eee"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isToggle"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item.path"
              v-for="item in item.children"
              :key="item.id"
              @click="saveState(item.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>
<script>
import { getHomeMenu } from "../network/home";
import Welcome from "./Welcome.vue";
export default {
  components: { Welcome },
  created() {
    this.getHomeMenu();

    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    // 获取网络请求数据
    getHomeMenu() {
      getHomeMenu().then((res) => {
        if (res.meta.status !== 200)
          return this.$message.console.error(res.meta.msg);
        this.menuList = res.data;
        console.log(this.menuList);
      });
    },

    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleClick() {
      this.isToggle = !this.isToggle;
    },
    saveState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
  data() {
    return {
      menuList: [],
      icons: {
        125: "el-icon-user-solid",
        103: "el-icon-s-claim",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-data",
      },
      isToggle: false,
      activePath: "",
    };
  },
};
</script>
<style scoped>
.el-header {
  background-color: #72ad68;
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;

  align-items: center;
  color: #eee;
}

.el-header img {
  height: 50px;
}
.logo {
  display: flex;
  align-items: center;
}

.logo span {
  margin-left: 15px;
}
.el-aside {
  background-color: #82c077;
}

.el-main {
  background-color: #eee;
}

.container {
  height: 100%;
}

.el-menu {
  border-right: 0;
}

.toggle {
  background-color: #398a2b;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2;
  color: #eee;
  /* 鼠标放上变成小手 */
  cursor: pointer;
}
</style>