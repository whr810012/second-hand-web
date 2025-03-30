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