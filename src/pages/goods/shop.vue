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
      <el-card v-for="item in filterList" :key="item.goodsId" class="goods-card" style="width: 300px;height:180px">
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
  </div>
</template>

<script>
import { getGoods } from '@/api/request'
export default {
  name: 'shopHome',
  data() {
    return {
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
    filterList() {
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
          list = list.sort((a, b) => {
            return a.price - b.price
          })
        } else if (this.sort === 'priceDesc') {
          list = list.sort((a, b) => {
            return b.price - a.price
          })
        } else if (this.sort === 'timeAsc') {
          list = list.sort((a, b) => {
            return new Date(a.createTime) - new Date(b.createTime)
          })
        } else if (this.sort === 'timeDesc') {
          list = list.sort((a, b) => {
            return new Date(b.createTime) - new Date(a.createTime)
          })
        }
      }
      console.log(list);
      return list;
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

  .search {
    margin: 10px;
    margin-right: 0px;
    width: 60%;
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
}

.goods-box {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .goods-card {
    margin: 10px;
    display: flex;

    .goods-info {
      margin-left: 10px;

      .goods-name {
        color: rgba($color: #499eff, $alpha: 0.6);
        font-size: 16px;
        font-weight: 600;
      }

      .goods-price {
        // 删除线
        text-decoration: line-through;
        color: #565656;
        font-size: 12px;
      }

      .class-box {
        font-size: 12px;
        border: 1px solid #ccc;
        padding: 2px 15px;
        border-radius: 10px;
        background-color: #63b1d6;
      }

      .goods-condition {
        margin-top:5px;
        // 最多显示两行
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #565656;
        font-size: 12px;
      }
    }
  }
}

/deep/.el-card__body {
  display: flex;
}
</style>