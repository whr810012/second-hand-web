<template>
    <div class="myInfo">
        <el-image :src="require('../menu/menuLogo.png')"></el-image>
        <el-dropdown v-if="true" style="display: flex;align-items: center;">
            <span class="el-dropdown-link">
                <span style="color: white;">用户名</span>
                <el-icon class="el-icon--right" style="color: white;">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span v-else class="gotologin">
            登录 | 注册
        </span>
    </div>
</template>

<script>
export default {
    name: 'myInfo'
}
</script>

<style lang="scss" scoped>
/deep/ .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.myInfo {
    position: absolute;
    top: 12px;
    right: 41px;
    color: white;
    display: flex;
    align-content: center;
    .gotologin{
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