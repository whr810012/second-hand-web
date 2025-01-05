<template>
    <div class="buyGoods">
        <el-carousel indicator-position="outside" type="card">
            <el-carousel-item v-for="item in this.goodsDetail.filesJson" :key="item">
                <!-- 原来尺寸大小展示 -->
                <el-image style="width: 100%; height: 100%" fit="contain" :src="item.url"></el-image>
            </el-carousel-item>
        </el-carousel>
        <div class="goodsInfo">
            <div class="title">{{ goodsDetail.name }}</div>
            <div class="goods-detail-item"><span class="item-title">原价：</span>{{ goodsDetail.price }}</div>
            <div class="goods-detail-item" v-vif="goodsDetail.discount != 1"><span class="item-title">折扣：</span>{{
                (goodsDetail.discount * 10).toFixed(1) }}折</div>
            <div class="goods-detail-item" v-if="goodsDetail.discount != 1"><span class="item-title">现价：</span>{{
                (goodsDetail.price * (goodsDetail.discount * 100)) / 100 }}</div>
            <div class="goods-detail-item"><span class="item-title">成色：</span>{{ goodsDetail.condition }}</div>
            <div class="goods-detail-item"><span class="item-title">描述：</span>{{ goodsDetail.description }}</div>
            <div class="goods-detail-item"><span class="item-title">交易地点：</span>{{ goodsDetail.address }}</div>
            <div class="goods-detail-item"><span class="item-title">距离：</span>{{ distance }}千米</div>
        </div>
        <div style="text-align: center;margin-top: 20px; margin-bottom: 50px;">
            <el-button @click="open" type="primary">确定交易</el-button>
        </div>
        <el-dialog v-if="show" title="确认交易时间" v-model="show" width="400px">
            <div style="display: flex; align-items: center;">
                交易时间：
                <el-date-picker style="margin-left: 15px;" v-model="time" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div style="margin-top: 10px;margin-bottom: 10px;font-size: 12px;color: #c4c4c4;">
                以下为卖家设置的交易地点，可进行修改商议
            </div>
            <div>
               开启修改： <el-switch v-model="change"></el-switch>
            </div> 
            <el-form-item label="交易地点:">
                <el-autocomplete :disabled="!change" style="width: 400px;" class="inline-input" v-model="searchWords"
                    :fetch-suggestions="fetchSuggestions" placeholder="请输入内容" :trigger-on-focus="false"
                    @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item label="详细地址:">
                <el-input v-model="form.address" :disabled="!change" style="width: 400px"></el-input>
                {{ form.address }}
            </el-form-item>
            <el-button @click="confirm" type="primary" style="margin-top: 20px; margin-left: 50px;">确认</el-button>
        </el-dialog>
        <div id="container" style="width: 0px;height:0px"></div>
    </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { getGoodsDetail, buyGoods } from '@/api/request'
import { space } from '@/utils/utils'
export default {
    data() {
        return {
            goodsDetail: {},
            time: '',
            show: false,
            map: null,
            searchWords: '',
            list: [],
            form: {
                address: '',
                lat: '',
                lng: ''
            },
            change: false
        }
    },
    components: {

    },
    computed: {
        goodsId() {
            return this.$route.query.goodsId
        },
        myLocation() { return localStorage.getItem('myLocation') },
        distance() {
            let myLocation = this.myLocation
            myLocation = JSON.parse(myLocation)
            if (!myLocation) {
                if (document.getElementById('container')) {
                    this.getMyMAP()
                    myLocation = localStorage.getItem('myLocation')
                    myLocation = JSON.parse(myLocation)
                } else {
                    return '...'
                }
            }
            console.log(this.goodsDetail.lat, this.goodsDetail.lng, myLocation[1], myLocation[0]);
            return space( this.goodsDetail.lng,this.goodsDetail.lat, myLocation[0], myLocation[1])
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
        open() {
            this.show = true
        },
        confirm() {
            if (!this.time) {
                this.$message.error('请选择交易时间')
                return
            }
            this.$confirm('是否确认交易', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let change = false
                if (this.form.address === this.goodsDetail.address) {
                   change = false
                } else {
                    change = true
                }
                const data = {
                    goodsId: this.goodsId,
                    time: this.time,
                    uid: this.$store.state.MyInfo.uid,
                    form: this.form,
                    change: change,
                    shopId: this.goodsDetail.uid
                }
                buyGoods(data).then(() => {

                })
                this.$message({
                    type: 'success',
                    message: '交易成功!'
                })
                this.$router.push('/goods/myGoods')
                this.show = false
            })
        },
        getMyMAP() {
            AMapLoader.load({
                key: "a05ab04a5dbe61ad2fad7b664790a18f", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        // 设置地图容器id
                        viewMode: "2D", // 是否为3D地图模式
                        zoom: 14, // 初始化地图级别
                        center: [118.28752699999995, 35.12255099999999], // 初始化地图中心点位置
                    });
                    this.map.plugin('AMap.Geolocation', function () {
                        var geolocation = new AMap.Geolocation({
                            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
                            timeout: 10000, // 设置定位超时时间，默认：无穷大
                            offset: [10, 20],  // 定位按钮的停靠位置的偏移量
                            zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                            position: 'RB' //  定位按钮的排放位置,  RB表示右下
                        })
                        geolocation.getCurrentPosition(function (status, result) {
                            if (status == 'complete') {
                                onComplete(result)
                            } else {
                                onError(result)
                            }
                        });

                        function onComplete(data) {
                            // data是具体的定位信息
                            console.log('经纬度', data.position);
                            localStorage.setItem('myLocation', JSON.stringify(data.position))
                        }

                        function onError(data) {
                            // 定位出错
                            if (data.message.includes("permission denied")) {
                                console.log('定位权限被拒绝，请检查浏览器设置。', data);
                            } else {
                                console.log('定位失败', data);
                            }
                        }
                    })
                })
                .catch((e) => {
                    console.log(e)
                });
        }
    },
    created() {
        console.log(this.goodsId);
        getGoodsDetail({ goodsId: this.goodsId }).then(res => {
            this.goodsDetail = res.data.data
            console.log(res.data.data);
            this.goodsDetail.filesJson = JSON.parse(res.data.data.filesJson)
            console.log(this.goodsDetail.filesJson);
            this.goodsDetail.filesJson.forEach(img => {
                const mimeType = img.contentType
                img.url = `data:${mimeType};base64,${img.base64}`;
            })
            this.form = {
                address: this.goodsDetail.address,
                lat: this.goodsDetail.lat,
                lng: this.goodsDetail.lng,
            }
            console.log(this.goodsDetail.filesJson)
        })
        this.$nextTick(() => {
            this.getMyMAP()
        })
    }
}
</script>

<style lang="scss" scoped>
.goodsInfo {
    padding: 20px;
    background-color: #f5f5f5;

    .title {
        color: #11192d;
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 30px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }

    .goods-detail-item {
        padding-top: 10px;

        .item-title {
            color: #464646;
        }
    }
}
</style>