<template>
  <div class="">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @select="select"
      :collapse="!isCollapse"
      :style="menuHeight"
      active-text-color="#ffffff"
    >
      <div class="icon_box">
        <el-image class="img" :src="require('../menu/menuLogo.png')"></el-image>
      </div>
      <el-menu-item
        v-for="(item, k) in menulist.menu"
        :key="k"
        :index="item.index"
      >
        <el-image
          :src="current === item.index ? item.icon : item.iconActive"
        ></el-image>
        <span :class="item.index === 'message' ? 'badge' : ''">{{
          item.title
        }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import menu from "../utils/menu";
export default {
  name: "home-menu",
  data() {
    return {
      isCollapse: true,
      menuHeight: {},
      logo: "../menu/menuLogo.png",
      menulist: [],
      current: "/",
      activeIndex: "map",
    };
  },
  mounted() {
    this.menulist = menu;
   
  },
  methods: {
    select(index) {
      if (this.current === index) return;
      this.current = index;
      this.$router.push({ path: `${index}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  // height: 100%;
}

.el-menu-vertical-demo {
  // margin-top: 8px; // 29px;
  position: fixed;
  left: 8px;
  // top: 29px;
  border-radius: 3px;
}

.icon_box {
  height: 48px;
  width: 140px;
  background-color: #fff;
  font-size: 24px;
  text-align: center;

  .img {
    width: 100%;
    height: 100%;
  }
}

.el-menu-item {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;

  .el-image {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
}

.el-menu-item:hover {
  background: #f8f8f9;
}

.el-menu-item.is-active {
  background: linear-gradient(264deg, #0ac7c7 -30.95%, #1786b5 89.17%);
}

.badge::after {
  content: "";
  position: absolute;
  top: 23px;
  right: 30px;
  width: 8px;
  height: 8px;
  background: #e62145;
  border-radius: 50%;
}
</style>
