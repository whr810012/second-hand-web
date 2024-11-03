<template>
  <div>
    <el-menu
    class="el-menu-popper-demo"
    mode="horizontal"
    :ellipsis="false"
    style="max-width: 600px;max-height: 48px;border:none"
    @select="handleSelect"
    :default-active="defaultActive"
  >
    <el-menu-item index="shop">二手市场</el-menu-item>
    <el-menu-item index="schoolMap">校园地图</el-menu-item>
    <el-menu-item index="uploadGoods">上传商品</el-menu-item>
    <el-menu-item index="myGoods">我的信息</el-menu-item>
  </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return {
      defaultActive: 'shop'
    }
  },
  methods:{
    handleSelect(val){
      this.$router.push({
        path:val
      })
    }
  },
  created(){
    console.log(this.$route.name)
    this.defaultActive = this.$route.name
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-menu-item{
    color:#fff !important;
}
/deep/.el-menu-item:hover{
    color:#fff !important;
    background-color: rgba($color: #fff, $alpha: 0.4) !important;
}
/deep/.el-menu-item.is-active{
    color:#fff !important;
    background-color: transparent !important;
}
</style>