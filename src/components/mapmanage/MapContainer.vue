<template>
  <div id="container"></div>
  <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="位置详情" width="700"
    @close="dialogFormVisible = false; markerDetail = null">
    <div style="height: 300px;width: 600px;overflow-y: auto;">
      <el-form>
        <el-form-item label="位置名称：">
          {{ markerDetail?.name }}
        </el-form-item>
        <el-form-item label="类型：">
          {{ markerDetail?.icon }}
        </el-form-item>
        <el-form-item label="详情：">
          {{ markerDetail?.detail }}
        </el-form-item>
        <el-form-item label="距离：">
          {{ getLength(markerDetail) }}千米
        </el-form-item>
        <el-form-item label="图片">
          <div class="demo-image__preview">
            <el-image
              v-for="(item, index) in markerDetail?.filesJson"
              :key="item.url"
              style="width: 100px; height: 100px"
              :src="item.url"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :initial-index="index"
              fit="cover"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { space } from '@/utils/utils'
import { getOptions, getMarkers } from "../../api/request.js";
export default {
  name: "map-view",
  data() {
    return {
      optionsList: [],
      markerList: [],
      dialogFormVisible: false, 
      classList: [
        { value: '教学楼',icon: require('../../assets/教学楼.png')},
        { value: '餐厅',icon: require('../../assets/食堂.png') },
        { value: '宿舍',icon: require('../../assets/宿舍.png') },
        { value: '操场',icon: require('../../assets/操场.png') },
        { value: '图书馆',icon: require('../../assets/图书馆.png') },
        { value: '电影院',icon: require('../../assets/电影院.png') },
        { value: '校医院',icon: require('../../assets/校医院.png') },
        { value: '博物馆',icon: require('../../assets/博物馆.png') },
        { value: '学校',icon: require('../../assets/school.png') },
      ],
    }
  },
  unmounted() {
    this.map?.destroy();
  },
  computed :{
    myLocation() { return localStorage.getItem('myLocation') },
  },
  methods: {
    getLength (item) {
      let myLocation = this.myLocation
            myLocation = JSON.parse(myLocation)
      return space(item.lat, item.lng, myLocation[1], myLocation[0])
    },
    openDia(item) {
      if (item.icon == '学校') {
        return
      }
      this.dialogFormVisible = true;
      this.markerDetail = item;
    },
    initAMap() {
      const that = this;
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
              that.$store.commit('updateLocation', data.position)
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
          this.markersList.forEach(item => {
            let image = this.classList.find(iem => iem.value === item.icon).icon
            console.log();
            const icon = new AMap.Icon({
              size: new AMap.Size(32, 32),
              image: image,
              imageSize: new AMap.Size(32, 32),
            });
            const marker = new AMap.Marker({
              position: new AMap.LngLat(item.lat, item.lng),
              title: item.name,
              icon: icon,
            })
            marker.on('click', () => {
              this.openDia(item)
            });
            this.map.add(marker)
          })
          let path = []
          this.optionsList.forEach(iem => {
            path.push(new AMap.LngLat(iem.lat, iem.lng))
          })
          const polygon = new AMap.Polygon({
            path: path,
            fillColor: '#fff', // 多边形填充颜色
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: 'red', // 线条颜色
          });

          this.map.add(polygon);
          console.log(this.map);
        })
        .catch(() => {
        });
    },
  },
  async created() {
    if (this.$route.name !== 'schoolMap') {
      this.$store.commit("setBreadList", [{ title: '地图管理' }, { title: '预览' }]);
    }
    console.log('asd', this.$store.state.location);
    await getMarkers().then((res) => {
      this.markersList = res.data.data
      this.markersList.forEach((item) => {
          item.filesJson = JSON.parse(item.filesJson);
          item.filesJson.forEach((img) => {
            const mimeType = img.contentType; // 根据实际情况选择 MIME 类型
            img.url = `data:${mimeType};base64,${img.base64}`;
          });
        })
        console.log(this.markersList);
      this.markersList.push({
        name: '临沂大学',
        lat: 118.28752699999995,
        lng: 35.12255099999999,
        icon: '学校'
      })
    })
    await getOptions().then((res) => {
      this.optionsList = res.data.data
    })
    this.initAMap()
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: calc(100vh - 200px)
}
</style>
