<template>
  <div class="cumb">
    <el-breadcrumb separator="|">
      <el-breadcrumb-item v-for="(item, index) in list" :key="index">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumb",
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.crumbList;
    },
  },
};
</script>

<style lang="scss" scoped>
.cumb {
  position: absolute;
  top: 17px;
  left: 32px;
}
.el-breadcrumb__item {
  color: #ffffff !important;
  cursor: pointer;
  ::v-deep .el-breadcrumb__inner {
    color: #ffffff !important;
  }
}
</style>