<template>
  <div class="login-wrapper">
    <div class="modal">
      <!--   添加图标 和 校验-->
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">火星</div>
        <el-form-item prop="userName">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.userName"
          />
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.userPwd"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import storage from "./../utils/storage";
import utils from "./../utils/utils";
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "admin",
        userPwd: "admin",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      //  validate	对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
      // (callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          //  调用login接口
          this.$api.login(this.user).then(async (res) => {
            this.$store.commit("saveUserInfo", res);
            // 登录成功后 调用 loadAsyncRoutes获取
            await this.loadAsyncRoutes();
            this.$router.push("./welcome");
          });
        } else {
          return false;
        }
      });
    },
    // 动态生成路由
    async loadAsyncRoutes() {
      let userInfo = storage.getItem("userInfo") || {};
      if (userInfo.token) {
        try {
          const { menuList } = await this.$api.getPermissionList();
          let routes = utils.generateRoute(menuList);
          routes.map((route) => {
            let url = `./../views/${route.component}.vue`;
            route.component = () => import(url);
            //同样无法实现
            // route.component = () => import(`./../views/${route.component}.vue`)
            this.$router.addRoute("home", route);
          });
        } catch (error) {}
      }
    },
    goHome() {
      this.$router.push("/welcome");
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  // 1vw = 宽度的 百分之一
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 35px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>