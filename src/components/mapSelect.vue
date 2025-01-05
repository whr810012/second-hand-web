<template>
  <el-autocomplete
    class="inline-input"
    v-model="searchWords"
    :fetch-suggestions="fetchSuggestions"
    placeholder="请输入内容"
    :trigger-on-focus="false"
    @select="handleSelect"
  ></el-autocomplete>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  data() {
    return {
      searchWords: '',
      list: [],
    };
  },
  methods: {
    fetchSuggestions(query, callback) {
      // 清空列表
      this.list = [];
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
              // 将结果传给 callback
              callback(result.tips.map(item =>{
                return {
                  value: item.name,
                  address: item.address + '//' + item.district,
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
    },
  },
};
</script>

<style>
/* 添加样式如果需要 */
</style>