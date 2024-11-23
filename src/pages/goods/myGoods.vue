<template>
  <div class="shop">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的商品" name="first"></el-tab-pane>
      <el-tab-pane label="我的订单" name="second">
        <my-order></my-order>
      </el-tab-pane>
      <el-tab-pane label="我买到的" name="third">我买到的</el-tab-pane>
    </el-tabs>
    <Goods v-if="activeName == 'first'"></Goods>
  </div>
</template>

<script>
import Goods from '@/components/goods/Goods'
import MyOrder from '@/components/goods/MyOrder'
export default {
  name: 'myGoods',
  components:{
    Goods,
    MyOrder
  },
  data() {
    return {
      allGoodsList: [],
      activeName:'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  padding-left: 20px;
  padding-right: 20px;
}
</style>