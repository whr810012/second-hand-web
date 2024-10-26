<template>
    <div class="login-container">
      <div class="login-header">
        <h1>注册登录</h1>
      </div>
      <div class="login-form" id="login-form">
        <form>
          <div class="input-group">
            <label for="username">账号：</label>
            <input
              type="text"
              id="username"
              placeholder="请输入账号"
              v-model="username"
            />
          </div>
          <br />
          <div class="input-group">
            <div class="input-row">
              <label for="password">密码：</label>
              <input
                type="password"
                id="password"
                placeholder="请输入密码"
                v-model="password"
              />
              <br />
              <br />
              <button type="submit" id="login-button" @click="handleSubmit">
                登陆
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "UerLogin",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    // methods: {
    //   handleSubmit() {
    //     // 登录
    //     fetch("https://aomen.tutu-ai.cn/api/auth/accountLogin", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         account: this.username,
    //         password: this.password,
    //       }),
    //     })
    //       .then((response) => {
    //         // 请求成功，处理响应数据
    //         console.log(response.data);
    //         const res = response.json();
    //         if (res.code === 0) {
    //           console.log(res.token);
    //           // 本地存储
    //           localStorage.setItem("token", res.token);
    //           this.$store.commit("user/setUserInfo", res.token);
    //           // 切换页面主页
    //           this.$router.replace("/");
    //         } else {
    //           console.log(res.message);
    //           alert("登录失败");
    //           // this.$router.replace("/login");
    //         }
    //       })
    //       .catch((error) => {
    //         // 请求失败，处理错误
    //         console.error("请求失败:", error);
    //         alert("登录错误");
    //       });
    //   },
    // },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #19aaed;
    border-radius: 5px;
    border: none;
    color: white;
    padding: 3px 5px;
    cursor: pointer;
    margin-bottom: 2px;
  }
  
  button:hover {
    /* text-decoration: underline;  */
    background-color: #82c7e7;
  }
  
  input {
    border-radius: 10px;
    border: 1px solid #ddd;
    padding: 3px 5px;
    margin-right: 5px;
  }
  </style>
  