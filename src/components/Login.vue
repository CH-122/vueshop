<template>
  <div class="login">
    <div class="box">
      <div class="avata">
        <img src="../assets/img/ch.jpg" alt="" />
      </div>
      <el-form
        ref="loginRef"
        label-width="0"
        class="form"
        :model="form"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getLoginInfo } from "../network/login";
export default {
  name: "Login",
  created() {},
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 网络请求方法

    loginClick() {
      getLoginInfo(this.form.username, this.form.password).then((res) => {
        // console.log(res);
        if (res.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");
        // 将token保存到sessionStorage
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
    resetClick() {
      this.$refs.loginRef.resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  background-color: #2d4d6d;
  height: 100%;
}

.box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avata {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -65px;
  height: 130px;
  width: 130px;
  border: 2px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 6px #ddd;
}

.avata img {
  width: 100%;
  border-radius: 50%;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

.form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>