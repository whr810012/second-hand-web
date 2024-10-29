<!-- 文件名：@/components/Login.vue -->
<template>
    <div class="login10">
        <div class="login10-bg"></div>
        <div class="login10-container">
            <div class="login10-container-head">注册</div>
            <div class="login10-container-wrap">
                <i class="iconfont icon-yonghu"></i>
                <input v-model="form.username" type="text" name="username" placeholder="邮箱地址：">
            </div>
            <div class="login10-container-wrap">
                <i class="iconfont icon-mima"></i>
                <input v-model="form.password" type="password" name="password" placeholder="密码：">
            </div>

            <input class="login10-container-action btn" type="button" value="注册" @click="onSubmit">
            <div class="login10-container-signup">
                <span>注册好了？返回 <a href="/login">登录</a></span>
            </div>
        </div>
    </div>
</template>

<script>
import { Register } from '@/api/request'
export default {
    name: 'registerIndex',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit() {
            if (!this.form.username) {
                this.$message.warning('请输入邮箱地址')
                return
            } else if (!this.form.password) {
                this.$message.warning('请输入密码')
                return
            }
            Register(this.form).then(() => {
                this.$message.success('注册成功')
            }).catch(err => {
                console.log(err);
                this.$message.error(err.data.message)
            })
        }
    }
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