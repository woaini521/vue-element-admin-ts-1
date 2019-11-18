<template>
  <div class="chart-container" :class="className" :style="{height: height, width: width}"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import echarts, { EChartOption } from "echarts"

export interface IlineChartData {
  expectedData: number[];
  actualData: number[];
}

@Component({
  name: "LineChart"
})
export default class extends Vue {
  @Prop({ required: true }) private chartData!: IlineChartData;
  @Prop({ default: "chart" }) private className!: string;
  @Prop({ default: "100%" }) private width!: string;
  @Prop({ default: "350px" }) private height!: string;

  private chart: any;

  @Watch('chartData', { deep: true })
  private onChartDataChange(value: IlineChartData) {
    this.setOptions(value)
  }

  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy() {
    if(!this.chart) {
      return
    }
    // 销毁实例，实例销毁后无法再被使用。
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement)
    this.setOptions(this.chartData)
  }

  private setOptions(chartData: IlineChartData) {
    if (this.chart) {
      this.chart.setOption({
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: 8
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["expected", "actual"]
        },
        series: [
          {
            name: "expected",
            itemStyle: {
              color: "#FF005A",
              lineStyle: {
                color: "#FF005A",
                width: 2
              }
            },
            smooth: true,
            type: "line",
            data: chartData.expectedData,
            animationDuration: 1000,
            animationEasing: "cubicInOut"
          },
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              color: "#3888fa",
              lineStyle: {
                color: "#3888fa",
                width: 2
              },
              areaStyle: {
                color: "#f3f8ff"
              }
            },
            data: chartData.actualData,
            animationDuration: 1000,
            animationEasing: "quadraticOut"
          }
        ]
      } as EChartOption<EChartOption.SeriesLine>)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>