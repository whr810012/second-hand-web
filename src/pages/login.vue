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
// import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, isReactive} from 'vue'
// import { useLayoutStore } from '@/store/modules/layout';
// import router from '../router'
// interface DataProps {}
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
        Login(this.form.username, this.form.password)
      }
    }
  }
  // setup() {
  //   // const layoutStore = useLayoutStore()
  //   const form = reactive({
  //     username:'',
  //     password:''
  //   })
  //   const onSubmit = async()=>{
  //     const { username, password }  = form
  //     layoutStore.doLogin({username,password}).then(()=>{
  //          console.log('登录成功',layoutStore.getStatus.ACCESS_TOKEN)
  //          router.push({ path: '/' })
  //     }).catch(e=>{
  //         console.log(e)
  //     })
  //   }
  //   return {
  //       form,onSubmit
  //   }
  // }
};
</script>

<style lang='scss' scoped>
.btn {
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 40px;

}

.login10 {
  overflow: hidden;
  height: 100vh;
  position: relative;
  font-family: sans-serif;

  &-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, rgba(64, 115, 158, 1.0), rgba(39, 60, 117, 1.0));
    background-size: cover;
    z-index: -100;
  }

  &-container {
    background: rgba(255, 255, 255, .6);
    margin: 60px auto 0;
    width: 400px;
    border-radius: 16px;
    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;

    border-top: 2px solid rgba(255, 255, 255, .3);
    border-left: 2px solid rgba(255, 255, 255, .3);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, .2);

    &-head {
      font-size: 30px;
      margin: 40px 0;
    }

    &-wrap {
      width: 100%;
      height: 40px;
      background: rgba(245, 246, 250, 1.0);
      border-radius: 40px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 15% 86%;

      input {
        outline: none;
        border: none;
        background: none;
        font-size: 16px;

        &::placeholder {
          font-size: 16px;
        }
      }

      i {
        line-height: 40px;
        text-align: center;
      }
    }

    &-access {
      margin-bottom: 20px;
      width: 100%;
      padding: 0 .4rem;
      display: flex;
      justify-content: flex-end;

      span {
        margin-left: 8px;
      }
    }

    &-action {
      margin-bottom: 20px;
    }

    &-or {
      margin-bottom: 20px;
      display: flex;
      width: 100%;

      &:before,
      &:after {
        content: '';
        border-bottom: 1px solid black;
        flex: 1 1;
        margin: auto;
      }
    }

    &-signup {
      margin: 20px 0;
    }
  }
}
</style>