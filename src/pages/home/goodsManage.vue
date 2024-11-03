<template>
  <div class="goodsManage">
    <div style="margin-bottom: 20px">
      <el-button type="danger" @click="deleteGoods">删除</el-button>
      <el-button type="primary" @click="putAwayGoods">上架</el-button>
      <el-button type="primary" @click="downGoods">下架</el-button>
    </div>
    <el-table :data="allGoodsList" style="width: 100%" border @selection-change="handleSelectionChange">
      <el-table-column label="序号" width="120" align="center" type="index"></el-table-column>
      <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
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
      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="putAway(scope.row)" :disabled="scope.row.status !== 0 && scope.row.status !== 2">上架</el-button>
          <el-button type="text" size="small" @click="downAway(scope.row)" :disabled="scope.row.status !== 1">下架</el-button>
          <el-button type="text" size="small" @click="deleteGood(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoods, deleteGoods ,putGoods , downGoods} from '@/api/request'
export default {
  data() {
    return {
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
      statusList :[
        {value: 0 , label:'待审核'},
        {value: 1 , label:'上架中'},
        {value: 2 , label:'已下架'},
        {value: 3 , label:'订单交易中'},
        {value: 4 , label:'已售出'}
      ],
      allGoodsList: [],
      checkGoods: []
    }
  },
  computed: {
    filterList() {
      return this.allGoodsList
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.checkGoods = val
    },
    deleteGoods () {
      if (this.checkGoods.length === 0) {
        return this.$message.error('请选择要删除的商品')
      }
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods({ids: this.checkGoods.map(item => item.goodsId)}).then(() => {
          this.$message.success('删除成功')
          this.init()
        })
      })
    },
    deleteGood(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods({ids: [row].map(item => item.goodsId)}).then(() => {
          this.$message.success('删除成功')
          this.init()
        })
      })
    },
    putAwayGoods () {
      if (this.checkGoods.length === 0) {
        return this.$message.error('请选择要上架的商品')
      }
      if (this.checkGoods.some(item => item.status !== 0 && item.status !== 2)) {
        return this.$message.error('请选择待审核的商品/已下架的商品')
      }
      this.$confirm('此操作将上架选中的商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putGoods({ids: this.checkGoods.map(item => item.goodsId)}).then(()=>{
          this.$message.success('上架成功')
          this.init()
        })
      })
    },
    putAway (row) {
      this.$confirm('此操作将上架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putGoods({ids: [row.goodsId]}).then(()=>{
          this.$message.success('上架成功')
          this.init()
        })
      })
    },
    downGoods () {
      if (this.checkGoods.length === 0) {
        return this.$message.error('请选择要下架的商品')
      }
      if (this.checkGoods.some(item => item.status !== 1)) {
        return this.$message.error('请选择上架中的商品')
      }
      this.$confirm('此操作将下架选中的商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        downGoods({ids: this.checkGoods.map(item => item.goodsId)}).then(()=>{
          this.$message.success('下架成功')
          this.init()
        })
      })
    },
    downAway (row){
      this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        downGoods({ids: [row.goodsId]}).then(()=>{
          this.$message.success('下架成功')
          this.init()
        })
      })
    },
    lookDetail (row) {
      this.goodsDetail = row
      // 传一个goodsid
      this.$router.push(`goodsAdminDetail?goodsId=${row.goodsId}`)
    },
    init(){
      getGoods().then(res => {
      console.log(res.data.data)
      this.allGoodsList = res.data.data
      this.allGoodsList.forEach(item => {
        item.image = JSON.parse(item.filesJson)
        item.image.forEach(img => {
          const mimeType = img.contentType
          img.url = `data:${mimeType};base64,${img.base64}`;
        })
      })
    })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.goodsManage {
  margin: 10px;
}

.description {
  // 只显示两行
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>