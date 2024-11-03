<template>
  <div>
    <el-header>
        <el-image class="header" :src="require('../menu/header.png')"></el-image>
        <bread-crumb></bread-crumb>
        <user-info></user-info>
        <headerMenu class="menu"></headerMenu>
      </el-header>
      <router-view></router-view>
  </div>
</template>

<script>
import breadCrumb from "../components/breadCrumb.vue";
import userInfo from "../components/myInfo.vue";
import headerMenu from "../components/headerMenu.vue";
export default {
  name:'goodsIndex',
  components: {
    breadCrumb,
    userInfo,
    headerMenu
  }
  }
</script>

<style lang="scss" scoped>
.menu{
  position: absolute;
  left: 0;
  top: 0;
  background-color: transparent;
  color: #f6f6f6;
}
/deep/ .el-menu{
  color: #f6f6f6 !important;
  border-bottom:none;
  background-color: transparent;
}
.main {
  height: 100%;
  width: 100%;
}

.el-aside {
  color: #333;
  background-color: #f6f6f6;
  &::-webkit-scrollbar {
    display: none;
  }
}

.el-header {
  padding: 0 0;
  height: 48px !important;
  position: relative;
}

.header {
  background-color: aqua;
  height: 48px;
  width: 100vw;
}

.el-main {
  padding: 0;
  width: 100%;
  height: calc(100vh - 70px);
  // background-color: #f6f6f6;
}
</style>

