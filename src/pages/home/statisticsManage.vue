<template>
  <div style="padding: 20px">
    <div class="title">
      各类型订单比例示意
    </div>
    <div class="proportionOption" id="proportionOption" style="width: 600px;height:400px"></div>
    <div class="title">
      各分类订单
    </div>
    <div class="classProportionOption" id="classProportionOption" style="width: 100%;height:400px"></div>
    <div class="title">
      订单时间分布
    </div>
    <div id="timeOption" style="width: 100%;height:400px"></div>
  </div>
</template>

<script>
import { getAllOrder } from '../../api/request'
import * as echarts from 'echarts';
import dayjs from 'dayjs'
export default {
  data() {
    return {
      orderList: [],
      notOrderList: [],
      awaitOrderList: [],
      okOrderList: [],
      proportionOption: {},
      classOption: [
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
      classProportionOption: {
        xAxis: {
          type: 'category',
          data: ['书籍', '电子产品', '食品', '家具', '化妆品', '运动器材', '乐器', '其他']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [0, 0, 0, 0, 0, 0, 0, 0],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      timeOption: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }
    }
  },
  methods: {
    async init() {
      await getAllOrder().then(res => {
        this.orderList = res.data.data
        console.log(this.orderList)
        this.okOrderList = this.orderList.filter(item => item.status === '1' || item.status === '3')
        this.notOrderList = this.orderList.filter(item => item.status === '2')
        this.awaitOrderList = this.orderList.filter(item => item.status === '0')
        // 订单类型比例图
        this.classOption.map((item, index) => {
          this.okOrderList.map(item1 => {
            if (item1.goods.category == item.value) {
              this.classProportionOption.series[0].data[index]++
            }
          })
        })
        this.proportionOption = {
          title: {
            text: '订单状态比例图',
            // subtext: 'Fake Data',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '数量',
              type: 'pie',
              data: [
                {
                  value: this.okOrderList.length,
                  name: '已确认、已完成订单'
                },
                {
                  value: this.notOrderList.length,
                  name: '已拒绝订单'
                },
                {
                  value: this.awaitOrderList.length,
                  name: '待确认订单'
                }
              ]
            }
          ]
        }
        let time = []
        this.orderList.forEach(item => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD')
        })
        this.orderList.forEach(item => {
          time.push(item.createTime)
        })
        let result = []
        // 遍历原始数组
        time.forEach(date => {
          // 查找该日期是否已经在结果数组中
          let existing = result.find(item => item.time === date);
          // 如果存在，num+1，否则创建一个新对象
          if (existing) {
            existing.num++;
          } else {
            result.push({ time: date, num: 1 });
          }
        })
        this.timeOption.xAxis.data = result.map(item => item.time)
        this.timeOption.series[0].data = result.map(item => item.num)
        console.log('time', result);
        this.initChart()
      })
    },
    initChart() {
      this.myChart = echarts.init(document.getElementById('proportionOption'))
      this.$nextTick(() => {
        this.myChart.setOption(this.proportionOption)
      })
      this.myChart2 = echarts.init(document.getElementById('classProportionOption'))
      this.$nextTick(() => {
        this.myChart2.setOption(this.classProportionOption)
      })
      this.myChart3 = echarts.init(document.getElementById('timeOption'))
      this.$nextTick(() => {
        this.myChart3.setOption(this.timeOption)
      })
    }
  },
  async created() {
    await this.init()
  },
  // 离开页面清空
  beforeUnmount() {
    if (this.myChart) {
      this.myChart.dispose()
    }
    if (this.myChart2) {
      this.myChart2.dispose()
    }
    if (this.myChart3) {
      this.myChart3.dispose()
    }
  }
}
</script>

<style>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>