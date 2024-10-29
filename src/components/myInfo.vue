<template>
    <div class="MyInfo" v-if="isready">
        <el-image v-if="MyInfo.name" :src="MyInfo && MyInfo.img ? MyInfo.img : require('../menu/menuLogo.png')"></el-image>
        <el-dropdown v-if="MyInfo.name" style="display: flex;align-items: center;">
            <span class="el-dropdown-link">
                <span style="color: white;">{{ MyInfo.name ? MyInfo.name : '未登录'}}</span>
                <el-icon class="el-icon--right" style="color: white;">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="gotoMyInfo">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="gotoLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span v-if="!MyInfo.name" class="gotoLogin" @click="gotoLogin">
            登录 | 注册
        </span>
    </div>
</template>

<script>
export default {
    name: 'MyInfo',
    data() {
        return {
            MyInfo:{},
            isready: false
        }
    },
    methods:{
        gotoLogin() {
            this.$store.commit('setUserInfo',{})
            this.$router.push({name:'login'})
        },
        gotoMyInfo(){
            this.$router.push({ name: `myInfo` })
        }
    },
    created() {
        this.MyInfo = this.$store.state.MyInfo
        this.isready = true
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.MyInfo {
    position: absolute;
    top: 12px;
    right: 41px;
    color: white;
    display: flex;
    align-content: center;
    .gotoLogin{
        cursor: pointer;
        display: flex;
        align-items: center;
        color: white;
        line-height: 30px;
    }
    .el-image {
        margin-right: 10px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
}
</style>