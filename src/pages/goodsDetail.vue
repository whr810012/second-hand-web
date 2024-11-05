<template>
    <div class="goodsDetail" v-if="goodsDetail" v-loading="!goodsDetail">
        <el-form disabled :model="goodsDetail" style="padding-left: 20px;padding-top: 10px;" label-width="100px">
            <el-form-item label="名称：">
                <el-input style="width: 400px;" placeholder="请填写商品名称" v-model="goodsDetail.name"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
                <span style="font-size: 16px;font-weight: 600;color:red">
                {{ this.statusList.find(status => status.value === goodsDetail.status).label }}
                </span>
            </el-form-item>
            <el-form-item label="原价：">
                <el-input-number v-model="goodsDetail.price" style="width: 400px;" min="0" :precision="2"
                    :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label="折扣：">
                <el-input-number v-model="goodsDetail.discount" style="width: 400px;" :precision="2" :step="0.01"
                    max="1" min="0"></el-input-number>
                <span v-if="goodsDetail.discount !== 1" style="margin-left: 10px;">
                    {{ goodsDetail.discount * 100 / 10 }}折
                </span>
            </el-form-item>
            <el-form-item label="售价：">
                <el-input disabled style="width: 400px;"
                    :value="(goodsDetail.price * (goodsDetail.discount * 100)) / 100"></el-input>
            </el-form-item>
            <el-form-item label="分类：">
                <el-select v-model="goodsDetail.category" placeholder="请选择商品分类" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="成色">
                <el-select v-model="goodsDetail.condition" placeholder="请选择商品成色" style="width: 240px">
                    <el-option v-for="item in options2" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="交易详细地址:">
                    <el-input v-model="goodsDetail.address" style="width: 400px" :disabled="goodsDetail.address === ''"></el-input>
                    {{ goodsDetail.address }}
                </el-form-item>
            <el-form-item label="商品描述：">
                <div style="display: flex;">
                    <el-input type="textarea" v-loading="loading" v-model="goodsDetail.description"
                        style="width: 400px;" :rows="6" placeholder="请填写商品描述">
                    </el-input>
                </div>
            </el-form-item>
            
            <el-form-item label="图片:">
                <el-upload action="#" v-model:file-list="goodsDetail.image" :auto-upload="false" limit="4"
                    list-type="picture-card" :on-preview="handlePictureCardPreview" :on-exceed="handleExceed"
                    accept="image/jpg,image/jpeg,image/png">
                </el-upload>
                <el-dialog v-model="imageshow">
                    <img style="width: 100%;" w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getGoods } from '../api/request'
export default {
    name: 'goodsDetail',
    data() {
        return {
            statusList: [
                { value: 0, label: '待审核' },
                { value: 1, label: '上架中' },
                { value: 2, label: '已下架' },
                { value: 3, label: '订单交易中' },
                { value: 4, label: '已售出' }
            ],
            goodsDetail: null,
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
            imageshow: false,
            dialogImageUrl: '',
            allGoodsList: [],
            loading: false
        }
    },
    methods: {
        handlePictureCardPreview(file) {
            this.imageshow = true
            this.dialogImageUrl = file.url
        },
        init() {
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
                this.goodsDetail = this.allGoodsList.find(item => item.goodsId == this.$route.query.goodsId)
                console.log(this.goodsDetail);
            })
        }
    },
    created() {
        console.log(this.$route.name)
        if (this.$route.name !== 'goodsDetail') {
            this.$store.commit('setBreadList', [{ title: '商品详情' }])
        }
        console.log(this.$route.query.goodsId);
        this.init()
    }
}
</script>

<style>
.goodsDetail {
    margin: 20px;
}
</style>