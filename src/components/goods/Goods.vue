<template>
  <div class="myGoods">
    <el-table :data="myGoodsList" style="width: 100%" border>
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column property="name" label="商品名称" align="center">
        <template #default="scope">
          <span style="color: #409eff;cursor: pointer;" @click="lookDetail(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column property="price" label="商品原价" align="center">
        <template #default="scope">
          ￥{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="折扣" prop="discount" align="center">
        <template #default="scope">
          {{ scope.row.discount === 1 ? '无折扣' : scope.row.discount * 10 + '折' }}
        </template>
      </el-table-column>
      <el-table-column label="售价" align="center">
        <template #default="scope">
          ￥ {{ (scope.row.price * (scope.row.discount * 100)) / 100 }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          {{ this.statusList.find(status => status.value === scope.row.status).label }}
        </template>
      </el-table-column>
      <el-table-column prop="category" label="商品分类" align="center">
        <template #default="scope">
          {{ this.options.find(option => option.value === scope.row.category).label }}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="商品描述" align="center">
        <template #default="scope">
          <el-popover placement="top-start" title="商品描述" trigger="hover">
            <span>
              {{ scope.row.description }}
            </span>
            <template #reference>
              <div class="description">{{ scope.row.description }}</div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteGood(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoods, deleteGoods } from '@/api/request'
export default {
  name: 'GoodsIndex',
  data() {
    return {
      allGoodsList: [],
      myGoodsList: [],
      options: [
        { label: '书籍', value: 'book' },
        { label: '电子产品', value: 'electronics' },
        { label: '食品', value: 'food' },
        { label: '衣物', value: 'clothes' },
        { label: '家具', value: 'furniture' },
        { label: '化妆品', value: 'cosmetics' },
        { label: '运动器材', value: 'sports' },
        { label: '乐器', value: 'instrument' },
        { label: '其他', value: 'other' }
      ],
      statusList: [
        { value: 0, label: '待审核' },
        { value: 1, label: '上架中' },
        { value: 2, label: '已下架' },
        { value: 3, label: '订单交易中' },
        { value: 4, label: '已售出' }
      ],
      goods:{},
      show:false,
    }
  },
  methods: {
    lookDetail(row) {
      this.goodsDetail = row
      // 传一个goodsid
      this.$router.push(`goodsDetail?goodsId=${row.goodsId}`)
    },
    deleteGood(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods({ ids: [row].map(item => item.goodsId) }).then(() => {
          this.$message.success('删除成功')
          this.init()
        })
      })
    },
    edit(row){
      this.goods = row
      this.show = true
    },
    async init() {
      const res = await getGoods()
      this.allGoodsList = res.data.data
      this.myGoodsList = this.allGoodsList.filter(item => {
        return item.uid == this.$store.state.MyInfo.uid
      })
    }
  },
  async created() {
    const res = await getGoods()
    this.allGoodsList = res.data.data
    this.myGoodsList = this.allGoodsList.filter(item => {
      return item.uid == this.$store.state.MyInfo.uid
    })
  }
}
</script>

<style>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>