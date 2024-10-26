<template>
  <div id="container"></div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "map-view",
  mounted() {
    this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  created() {
    this.$store.commit("setBreadList", [{ title: '地图管理' }, { title: '预览' }]);
    console.log('asd', this.$store.state.location);
  },
  methods: {
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
          const marker = new AMap.Marker({
            position: new AMap.LngLat(118.28752699999995, 35.12255099999999), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "临沂大学",
          });
          this.map.add(marker);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 600px;
  max-height: 100%;
}
</style>
