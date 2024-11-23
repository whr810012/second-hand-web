<template>
    <div class="">
        <el-table :data="buyList">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column label="商品名" prop="goods.name"></el-table-column>
            <el-table-column property="price" label="商品原价" align="center">
                <template #default="scope">
                    ￥{{ scope.row.goods.price }}
                </template>
            </el-table-column>
            <el-table-column label="折扣" prop="discount" align="center">
                <template #default="scope">
                    {{ scope.row.goods.discount === 1 ? '无折扣' : scope.row.goods.discount * 10 + '折' }}
                </template>
            </el-table-column>
            <el-table-column label="售价" align="center">
                <template #default="scope">
                    ￥ {{ (scope.row.goods.price * (scope.row.goods.discount * 100)) / 100 }}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template #default="scope">
                    {{ this.statusList.find(status => status.value === scope.row.goods.status).label }}
                </template>
            </el-table-column>
            <el-table-column prop="category" label="商品分类" align="center">
                <template #default="scope">
                    {{ this.options.find(option => option.value === scope.row.goods.category).label }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="交易状态" align="center">
                <template #default="scope">
                    {{ this.orderStatusList.find(status => status.value == scope.row.status).label }}
                </template>
            </el-table-column>
            <el-table-column prop="orderTime" label="交易时间" align="center">
            </el-table-column>
            <el-table-column label="是否更换交易地点">
                <template #default="scope">
                    {{ scope.row.orderAddress ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="交易地址" align="center">
                <template #default="scope">
                    <div v-if="scope.row.orderAddress">
                        <el-popover placement="top-start" title="交易地址" trigger="hover">
                            <span>
                                {{ JSON.parse(scope.row.orderAddress).address }}
                            </span>
                            <template #reference>
                                <div class="description">{{ JSON.parse(scope.row.orderAddress).address }}</div>
                            </template>
                        </el-popover>
                    </div>
                    <div v-else>
                        <el-popover placement="top-start" title="交易地址" trigger="hover">
                            <span>
                                {{ scope.row.goods.address }}
                            </span>
                            <template #reference>
                                <div class="description">{{ scope.row.goods.address }}</div>
                            </template>
                        </el-popover>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="商品描述" align="center">
                <template #default="scope">
                    <el-popover placement="top-start" title="商品描述" trigger="hover">
                        <span>
                            {{ scope.row.goods.description }}
                        </span>
                        <template #reference>
                            <div class="description">{{ scope.row.goods.description }}</div>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { getMyBuyGoods } from '../../api/request'
export default {
    data() {
        return {
            buyList: [],
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
            orderStatusList: [
                { value: 0, label: '待商议' },
                { value: 1, label: '确认交易' },
                { value: 2, label: '已拒绝' },
                { value: 3, label: '订单已完成' }
            ]
        }
    },
    methods: {
        init() {
            getMyBuyGoods({ uid: this.$store.state.MyInfo.uid }).then(res => {
                this.buyList = res.data.data
                this.buyList.forEach(item => {
                    item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    item.orderTime = dayjs(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
                })
            })
        }
    },
    created() {
        this.init()
    }
}
</script>

<style></style>