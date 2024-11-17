<template>
    <div class="uploadGoods">
        <div style="padding-top: 10px;">编辑商品</div>
        <div class="form_box">
            <el-form :model="form" style="padding-left: 20px;padding-top: 10px;" label-width="100px">
                <el-form-item label="名称：">
                    <el-input style="width: 400px;" placeholder="请填写商品名称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="原价：">
                    <el-input-number v-model="form.price" style="width: 400px;" min="0" :precision="2"
                        :step="0.1"></el-input-number>
                </el-form-item>
                <el-form-item label="折扣：">
                    <el-input-number v-model="form.discount" style="width: 400px;" :precision="2" :step="0.01" max="1"
                        min="0"></el-input-number>
                    <span v-if="form.discount !== 1" style="margin-left: 10px;">
                        {{ form.discount * 100 / 10 }}折
                    </span>
                </el-form-item>
                <el-form-item label="售价：">
                    <el-input disabled style="width: 400px;"
                        :value="(form.price * (form.discount * 100)) / 100"></el-input>
                </el-form-item>
                <el-form-item label="分类：">
                    <el-select v-model="form.category" placeholder="请选择商品分类" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="成色:">
                    <el-select v-model="form.condition" placeholder="请选择商品成色" style="width: 240px">
                        <el-option v-for="item in options2" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品描述：">
                    <div style="display: flex;">
                        <el-input type="textarea" v-loading="loading" v-model="form.description" style="width: 400px;"
                            :rows="6" placeholder="请填写商品描述">
                        </el-input>
                        <el-button type="primary" style="margin-left: 20px;" @click="sendAi">
                            一键生成商品描述
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="交易地点:">
                    <el-autocomplete style="width: 400px;" class="inline-input" v-model="searchWords"
                        :fetch-suggestions="fetchSuggestions" placeholder="请输入内容" :trigger-on-focus="false"
                        @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="详细地址:">
                    <el-input v-model="form.address" style="width: 400px" :disabled="form.address === ''"></el-input>
                    {{ form.address }}
                </el-form-item>
                <el-form-item label="图片:">
                    <el-upload action="#" v-model:file-list="form.image" :auto-upload="false" limit="4"
                        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-exceed="handleExceed"
                        accept="image/jpg,image/jpeg,image/png">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <el-dialog v-model="imageshow">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button type="primary" @click="submitForm" style="margin-left: 20px;margin-bottom: 40px;">
                    确定修改
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { sendAi, editorGoods, getGoods } from '@/api/request'
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
    name: 'editorGoods',
    data() {
        return {
            searchWords: '',
            loading: false,
            imageshow: false,
            showMap: false,
            form: {
                name: '',
                price: '',
                discount: 1,
                category: '',
                condition: '',
                description: '',
                image: [],
                address: "",
                lat: '',
                lng: ''
            },
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
            options2: ['全新', '九成新', '八成新', '七成新', '六成新', '五成新', '四成新', '三成新', '二成新', '一成新']
        }
    },
    methods: {
        fetchSuggestions(query, callback) {
            // 清空列表
            this.list = [];

            window._AMapSecurityConfig = {
                securityJsCode: "638210509d7b98e8c4ca472ab5110203",
            };

            AMapLoader.load({
                key: 'a05ab04a5dbe61ad2fad7b664790a18f',
                version: '2.0',
                plugins: ['AMap.AutoComplete'],
            }).then((AMap) => {
                AMap.plugin('AMap.AutoComplete', () => {
                    const autoOptions = {
                        city: '全国', // 限定城市，默认全国
                    };

                    // 实例化 AutoComplete
                    const autoComplete = new AMap.AutoComplete(autoOptions);
                    // 根据关键字进行搜索
                    autoComplete.search(query, (status, result) => {
                        if (status === 'complete' && result && result.tips) {
                            console.log(result.tips);
                            // 将结果传给 callback
                            callback(result.tips.map(item => {
                                return {
                                    value: item.name,
                                    address: item.district + item.address + item.name,
                                    location: item.location,
                                };
                            }));
                        } else {
                            // 如果没有找到建议，传递一个空数组
                            callback([]);
                        }
                    });
                });
            }).catch(error => {
                console.error('加载 AMap 失败:', error);
                // 发生错误时也传递空数组
                callback([]);
            });
        },
        handleSelect(item) {
            console.log('选择的项:', item);
            this.form.address = item.address
            this.form.lat = item.location.lat
            this.form.lng = item.location.lng
        },
        sendAi() {
            this.loading = true
            sendAi(this.form)
                .then(res => {
                    console.log('asd', res);
                    this.form.description = res.data.data.message.content
                    this.loading = false
                }).catch(err => {
                    console.log('1111', err);
                    this.loading = false
                    this.$notify.error(err.data.error)
                })
        },
        handlePictureCardPreview(file) {
            this.imageshow = true
            this.dialogImageUrl = file.url
        },
        handleExceed() {
            this.$message.warning('最多上传4张图片')
        },
        submitForm() {
            if (!this.form.name) {
                return this.$message.warning('请填写商品名称')
            }
            else if (!this.form.price) {
                return this.$message.warning('请填写商品价格')
            }
            else if (!this.form.category) {
                return this.$message.warning('请选择商品类别')
            }
            else if (!this.form.condition) {
                return this.$message.warning('请选择商品成色')
            }
            else if (!this.form.description) {
                return this.$message.warning('请填写商品描述')
            }
            else if (this.form.image.length === 0) {
                return this.$message.warning('请上传商品图片')
            }
            console.log(this.form);
            const newImg = this.form.image.filter(item => item.raw)
            const oldImg = this.form.image.filter(item => !item.raw)
            this.form.image = []
            this.form.filesJson = ''
            this.form.newImg = newImg
            this.form.oldImg =  JSON.stringify(oldImg)
            console.log(this.form)
            let formData = new FormData();
            let obj = { ...this.form };
            Object.keys(obj).forEach(key => {
                formData.append(key, obj[key]);
            })
            // 确保 this.form.image 是一个数组并且存在
            if (Array.isArray(this.form.newImg)) {
                for (let i = 0; i < this.form.newImg.length; i++) {
                    const file = this.form.newImg[i].raw; // 假设 raw 是一个有效的 File 对象
                    if (file) {
                        formData.append(`files`, file); // 使用数组形式或不同的字段名
                    }
                }
            }
            editorGoods(formData).then(res =>{
                this.$message.success('修改成功')
                this.$router.push({name:'myGoods'})
            })
        }
    },
    created(){
        this.goodsId = this.$route.query.goodsId
        getGoods().then(res => {
            console.log(res.data.data)
            const allGoodsList = res.data.data
            allGoodsList.forEach(item => {
                item.image = JSON.parse(item.filesJson)
                item.image.forEach(img => {
                    const mimeType = img.contentType
                    img.url = `data:${mimeType};base64,${img.base64}`;
                })
            })
            this.form = allGoodsList.find(item => item.goodsId == this.goodsId)
        })
    }
}
</script>

<style>
.uploadGoods {
    max-width: 100vw;
    padding: 0 0 0 20px;
    background: url('https://img.keaitupian.cn/newupload/08/1629449018344288.jpg') no-repeat;
    background-size: cover;
    max-height: calc(100% - 100px);
}
</style>