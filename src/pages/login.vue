<!-- 文件名：@/components/Login.vue -->
<template>
  <div class="login10">
    <div class="login10-bg"></div>
    <div class="login10-container">
      <div class="login10-container-head">登录</div>
      <div class="login10-container-wrap">
        <i class="iconfont icon-yonghu"></i>
        <input v-model="form.username" type="text" name="username" placeholder="邮箱地址：">
      </div>
      <div class="login10-container-wrap">
        <i class="iconfont icon-mima"></i>
        <input v-model="form.password" type="password" name="password" placeholder="密码：">
      </div>
      <div class="login10-container-access">
        <input type="checkbox" v-model="form.remember">
        <span>我已阅读并同意《用户协议》,《隐私政策》</span>
      </div>

      <input class="login10-container-action btn" type="button" value="登录" @click="onSubmit">
      <div class="login10-container-signup">
        <span>没有账号? <a href="/register">注册</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from '@/api/request.js'
export default {
  name: 'loginIndex',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.remember) {
        this.$message.warning('请勾选用户协议')
        return
      } else {
        if (!this.form.username) {
          this.$message.warning('请输入邮箱地址')
          return
        } else if (!this.form.password) {
          this.$message.warning('请输入密码')
          return
        }
        Login({username:this.form.username, password:this.form.password}).then(res => {
          this.$message.success('登录成功')
          console.log('登录成功',res.data.data);
          const data = res.data.data
          if (data.img) {
            // 将json转换成对象
            data.img = JSON.parse(data.img)
          }
          this.$store.commit('setUserInfo', data)
          localStorage.setItem('userInfo', JSON.stringify(data))
          if (res.data.data.isadmin) {
            this.$router.push({path:'/admin'})
          } else {
            this.$router.push({path:'/goods'})
          }
        }).catch(() => {
          this.$message.error('邮箱/密码错误')
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.btn {
  border: none;
  outline: none;
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 40px;
  background: linear-gradient(45deg, #40739e, #273c75);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(39, 60, 117, 0.3);
  }
}

.login10 {
  overflow: hidden;
  height: 100vh;
  position: relative;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;

  &-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #40739e, #273c75);
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
    z-index: -100;
  }

  &-container {
    background: rgba(255, 255, 255, .9);
    margin: 80px auto 0;
    width: 420px;
    border-radius: 20px;
    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, .2);
    box-shadow: 0 15px 35px rgba(0, 0, 0, .2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &-head {
      font-size: 32px;
      font-weight: 600;
      margin: 30px 0;
      background: linear-gradient(45deg, #40739e, #273c75);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &-wrap {
      width: 100%;
      height: 46px;
      background: rgba(245, 246, 250, .8);
      border-radius: 40px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 15% 86%;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(245, 246, 250, 1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, .1);
      }

      input {
        outline: none;
        border: none;
        background: none;
        font-size: 16px;
        color: #2c3e50;

        &::placeholder {
          font-size: 15px;
          color: #95a5a6;
        }
      }

      i {
        line-height: 46px;
        text-align: center;
        color: #7f8c8d;
      }
    }

    &-access {
      margin-bottom: 25px;
      width: 100%;
      padding: 0 .4rem;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #666;

      input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }

      span {
        margin-left: 8px;
      }
    }

    &-signup {
      margin: 20px 0;
      font-size: 14px;
      
      a {
        color: #40739e;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>