<template>
  <div class="navigation-container">
    <el-button 
      class="back-button" 
      type="primary" 
      @click="goBack"
    >
      返回主页
    </el-button>
    <div id="navigation-map"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "NavigationView",
  data() {
    return {
      map: null,
      walking: null,
    };
  },
  async created() {
    this.$store.commit("setBreadList", [{ title: '导航' }]);
    await this.initMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  methods: {
    async initMap() {
      try {
        console.log(this.$route.query);
//         35.11495205123234
// 118.29113911595687
        const { from, to } = this.$route.query;
        let fromLocation = JSON.parse(from);
        let toLocation = JSON.parse(to);
        console.log(fromLocation, toLocation);
        await AMapLoader.load({
          key: "a05ab04a5dbe61ad2fad7b664790a18f",
          version: "2.0",
          plugins: ['AMap.Walking', 'AMap.GeometryUtil'],
        }).then((AMap) => {
          this.map = new AMap.Map("navigation-map", {
            viewMode: "2D",
            zoom: 14,
            center: [118.28752699999995, 35.12255099999999],
          });

          // 创建起点和终点标记
          const startMarker = new AMap.Marker({
            position: new AMap.LngLat(fromLocation[0], fromLocation[1]),
            title: '起点',
          });

          const endMarker = new AMap.Marker({
            position: new AMap.LngLat(toLocation.lat, toLocation.lng),
            title: toLocation.name,
          });

          this.map.add([startMarker, endMarker]);

          // 计算两点之间的距离
          const distance = AMap.GeometryUtil.distance(
            [fromLocation[0], fromLocation[1]],
            [toLocation.lat, toLocation.lng]
          );

          // 如果距离超过10公里，显示提示
          if (distance > 10000) {
            this.$message.warning('起点和终点距离超过10公里，已超出步行规划范围！');
            return;
          }

          // 步行路线规划
          this.walking = new AMap.Walking({
            map: this.map,
            panel: "panel"
          });

          // 规划步行路线
          this.walking.search(
            new AMap.LngLat(fromLocation[0], fromLocation[1]),
            new AMap.LngLat(toLocation.lat, toLocation.lng),
            (status, result) => {
              if (status === 'complete') {
                console.log('绘制步行路线完成');
              } else {
                this.$message.error('获取步行路线失败：' + result);
                console.error('获取步行路线数据失败：' + result);
              }
            }
          );
        });
      } catch (error) {
        this.$message.error('导航初始化失败：' + error.message);
        console.error('导航初始化失败：', error);
      }
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.navigation-container {
  height: 100%;
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
}

#navigation-map {
  width: 70%;
  height: calc(100vh - 140px);
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#panel {
  width: 30%;
  height: calc(100vh - 140px);
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
}

/* 自定义路线导航面板样式 */
:deep(.amap-lib-walking) {
  border-radius: 8px;
}

:deep(.amap-lib-walking .planTitle) {
  background-color: #409eff;
  color: white;
  padding: 10px 15px;
  border-radius: 8px 8px 0 0;
}

:deep(.amap-lib-walking .planTitle:hover) {
  background-color: #66b1ff;
}

:deep(.amap-lib-walking .plan) {
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.amap-lib-walking .plan:hover) {
  background-color: #f5f7fa;
}

:deep(.amap-lib-walking .waypoint) {
  color: #409eff;
  font-weight: bold;
}

/* 滚动条样式 */
#panel::-webkit-scrollbar {
  width: 6px;
}

#panel::-webkit-scrollbar-thumb {
  background-color: #909399;
  border-radius: 3px;
}

#panel::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}
/deep/.amap-call {
  display: none;
}

.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 100;
  /* padding: 12px 20px; */
  font-size: 14px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
  background-color: #fff;
  color: #409eff;
  border: 1px solid #409eff;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #409eff;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
}

.back-button i {
  font-size: 16px;
  margin-right: 4px;
}

/* 添加响应式样式 */
@media screen and (max-width: 768px) {
  .back-button {
    top: 20px;
    left: 20px;
    padding: 8px 16px;
    font-size: 12px;
  }
}
</style> 