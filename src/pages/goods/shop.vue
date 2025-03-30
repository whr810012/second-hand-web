<template>
  <div class="shop">
    <div class="search-box">
      <el-image :src="require('../../menu/menuLogo.png')" style="width: 40px; height: 40px"></el-image>
      <el-input v-model="searchName" class="search" placeholder="请输入搜索内容"></el-input>
      <el-button class="search_button" type="primary" @click="search">搜索</el-button>
    </div>
    <div class="filter-box">
      <span style="font-size: 12px;">成色选择：</span>
      <el-select size="small" clearable v-model="condition" placeholder="请选择商品成色" style="width: 140px">
        <el-option v-for="item in options2" :key="item" :label="item" :value="item" />
      </el-select>
      <span style="font-size: 12px;margin-left: 15px;">分类选择：</span>
      <el-select clearable size="small" v-model="category" placeholder="请选择商品分类" style="width: 140px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span style="font-size: 12px;margin-left: 15px;">排序选择：</span>
      <el-select size="small" clearable v-model="sort" placeholder="请选择排序方式" style="width: 140px">
        <el-option label="按价格升序" value="priceAsc" />
        <el-option label="按价格降序" value="priceDesc" />
        <el-option label="按时间升序" value="timeAsc" />
        <el-option label="按时间降序" value="timeDesc" />
      </el-select>
    </div>
    <div class="goods-box">
      <!-- {{ filterList }} -->
      <el-card v-for="item in filterList" :key="item.goodsId" class="goods-card" style="width: 300px;height:180px" @click="gotoBuy(item)">
        <el-image style="min-width: 50px;max-width:50px;height:100px" :src="item.image[0].url"></el-image>
        <div class="goods-info">
          <div class="goods-name">
            {{ item.name }}
          </div>
          <div class="goods-price" v-if="item.discount !== 1">
            原价：{{ item.price }}
          </div>
          <div class="goods-discount" v-if="item.discount !== 1">
            <span style="font-size:12px">折扣:</span><span style="color:red;margin-left:10px;">{{ item.discount * 100 / 10
              }}折</span>
          </div>
          <div>
            <span style="font-size: 12px;">售价：</span>
            <span style="color:#499eff">￥{{ (item.price * (item.discount * 100)) / 100 }}</span>
          </div>
          <div>
            <span style="font-size: 12px;">种类：</span>
            <span class="class-box">{{ this.options.find(option => option.value === item.category).label }}</span>
          </div>
          <div class="goods-condition">
            <span style="font-size: 12px;">简述：</span>
            <span style="font-size: 12px;">{{ item.description }}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div style="text-align: center; margin-top: 20px;display: flex;justify-content: center;" v-if="totalCount > 10">
      <el-pagination 
        :current-page.sync="currentPage" 
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper" 
        :total="totalCount"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/api/request'
export default {
  name: 'shopHome',
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      allGoodsList: [],
      searchName: '',
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
      options2: ['全新', '九成新', '八成新', '七成新', '六成新', '五成新', '四成新', '三成新', '二成新', '一成新'],
      condition: "",
      category: "",
      sort: ""
    }
  },
  computed: {
    filteredList() {
      let list = this.allGoodsList.filter(item => {
        return item.status === 1
      });
      
      if (this.searchName) {
        list = list.filter(item => {
          return item.name.includes(this.searchName)
        })
      }
      
      if (this.condition) {
        list = list.filter(item => {
          return item.condition === this.condition
        })
      }
      
      if (this.category) {
        list = list.filter(item => {
          return item.category === this.category
        })
      }
      
      if (this.sort) {
        if (this.sort === 'priceAsc') {
          list = list.sort((a, b) => a.price - b.price)
        } else if (this.sort === 'priceDesc') {
          list = list.sort((a, b) => b.price - a.price)
        } else if (this.sort === 'timeAsc') {
          list = list.sort((a, b) => new Date(a.createTime) - new Date(b.createTime))
        } else if (this.sort === 'timeDesc') {
          list = list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
        }
      }
      
      return list
    },
    
    totalCount() {
      return this.filteredList.length
    },
    
    filterList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredList.slice(start, end)
    }
  },
  methods: {
    gotoBuy (item) {
      this.$router.push('/goods/buyGoods?goodsId=' + item.goodsId)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    resetPagination() {
      this.currentPage = 1
    }
  },
  watch: {
    searchName() {
      this.resetPagination()
    },
    condition() {
      this.resetPagination()
    },
    category() {
      this.resetPagination()
    },
    sort() {
      this.resetPagination()
    }
  },
  created() {
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
}
</script>

<style lang="scss" scoped>
.search-box {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  .search {
    margin: 10px;
    margin-right: 0px;
    width: 60%;
    max-width: 600px;
  }

  /deep/.el-button {
    border-radius: 0 20px 20px 0;
  }

  /deep/.el-input__wrapper {
    border-radius: 20px 0 0 20px;
  }
}

.filter-box {
  text-align: center;
  border-radius: 8px;
}

.goods-box {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  .goods-card {
    width: 300px;
    height: 180px;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(73, 158, 255, 0.15);
    }

    /deep/ .el-card__body {
      padding: 12px;
      display: flex;
      align-items: center;
      height: 100%;
      background: linear-gradient(to right, rgba(73, 158, 255, 0.05), transparent);
    }

    .el-image {
      min-width: 120px !important;
      height: 140px !important;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      object-fit: cover;

      &:hover {
        transform: scale(1.05);
      }
    }

    .goods-info {
      margin-left: 15px;
      flex: 1;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        color: #333;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.4;

        &:hover {
          color: #499eff;
        }
      }

      .price-section {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 5px 0;

        .goods-price {
          text-decoration: line-through;
          color: #999;
          font-size: 13px;
        }

        .current-price {
          color: #ff4d4f;
          font-size: 16px;
          font-weight: 600;
        }
      }

      .goods-discount {
        display: inline-block;
        padding: 2px 8px;
        background-color: #fff1f0;
        border-radius: 4px;
        color: #ff4d4f;
        font-size: 12px;
        margin: 5px 0;
      }

      .class-box {
        font-size: 12px;
        padding: 3px 12px;
        border-radius: 15px;
        background-color: #499eff;
        color: white;
        display: inline-block;
        transition: all 0.3s;
        
        &:hover {
          background-color: darken(#499eff, 10%);
        }
      }

      .goods-condition {
        margin-top: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
        font-size: 12px;
        line-height: 1.5;
        background-color: rgba(73, 158, 255, 0.05);
        padding: 4px 8px;
        border-radius: 4px;
      }
    }
  }
}

/deep/ .el-pagination {
  margin-top: 30px;
  padding: 15px 0;
  
  .el-pager li {
    border-radius: 4px;
    transition: all 0.3s;
    
    &.active {
      background-color: #499eff;
      font-weight: bold;
    }
    
    &:hover:not(.active) {
      color: #499eff;
    }
  }
  
  .btn-prev, .btn-next {
    border-radius: 4px;
    
    &:hover {
      color: #499eff;
    }
  }
}
</style>