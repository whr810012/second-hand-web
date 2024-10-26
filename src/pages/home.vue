<template>
  <div class="main">
    <el-container>
      <el-aside width="150px">
        <home-menu></home-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-image class="header" :src="require('../menu/header.png')"></el-image>
          <bread-crumb></bread-crumb>
          <user-info></user-info>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import homeNav from './home-nav.vue'
import HomeMenu from "../components/menu.vue";
import breadCrumb from "../components/breadCrumb.vue";
import userInfo from "../components/myInfo.vue";
export default {
  name:'HomeMain',
  components: {
    // homeNav
    breadCrumb,
    HomeMenu,
    userInfo
  },
  data() {
    return {
      headerImg: "../menu/header.png",
    };
  },
  mounted() {

  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu() {
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style lang="scss" scoped>
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
}

.el-main {
  padding: 0;
  width: 100%;
  height: calc(100vh - 70px);
  // background-color: #f6f6f6;
}
</style>

