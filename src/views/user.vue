<template>
  <div class="user-center page-container">
    <el-card class="mt-4 mb-4">
      <div class="d-flex">
        <img class="avatar mr-4" :src="getImg('logo.png')" />
        <p class="fs-2 fw-7 mt-0 mr-4 flex-1">{{ userInfo.nickName }}</p>
        <el-popconfirm
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure to log out?"
        >
          <el-button slot="reference" type="danger">Log Out</el-button>
        </el-popconfirm>
      </div>
    </el-card>

    <div class="w-100 d-flex mb-4">
      <el-card class="flex-1 mr-4">
        <div class="" id="chart" style="height: 230px"></div>
      </el-card>

      <el-card class="flex-1">
        平均正确率：
        <p class="text-center fs-6">{{ correctRate }}%</p>
      </el-card>
    </div>
    <el-card class="mb-4">
      <p class="mt-0 mb-4 fs-1">Annually Submission</p>
      <div id="calendar" style="height: 120px"></div>
    </el-card>
    <el-card class="mb-4">
      <el-progress
        type="circle"
        stroke-width="12"
        width="200"
        :percentage="12.33"
      ></el-progress>
      <p class="mt-0 mb-4 fs-1">Submission History</p>
      <p>123456</p>
      <p>123456</p>
      <p>123456</p>
      <p>123456</p>
      <p>123456</p>
    </el-card>
  </div>
</template>
  <style lang="scss">
@import "@/style/user.scss";
</style>
  <script>
import { mapState } from "vuex";
import * as echarts from "echarts";
import { LAYOUTS } from "@/constants";

export default {
  name: "user-center",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_LIST,
      query: "",
      tableData: [],
      correctRate: 63.25,
    };
  },
  computed: {
    ...mapState("account", ["userInfo"]),
    getImg() {
      return function (url) {
        return require(`@/assets/${url}`);
      };
    },
  },
  methods: {
    renderChart() {
      var chartDom = document.getElementById("chart");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        legend: {
          top: 0,
          left: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            top: 25,
            clockwise: false,
            center: ["50%", "50%"],
            radius: ["60%", "80%"],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 4,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                formatter: (v) =>
                  [
                    "{a|" + v.value + "}",
                    "{b|" + v.name + "}",
                    "{c|" + v.percent + "%}",
                  ].join("\n"),
                rich: {
                  a: {
                    fontSize: 24,
                    fontWeight: "bold",
                  },
                  b: {
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                  c: {
                    fontSize: 18,
                    fontWeight: "bold",
                  },
                },
              },
            },
            data: [
              { value: 1048, name: "Tried" },
              { value: 735, name: "Remaining" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    renderCalendar() {
      var chartDom = document.getElementById("calendar");
      var myChart = echarts.init(chartDom);
      var option;

      const months = [
        "2023-01",
        "2023-02",
        "2023-03",
        "2023-04",
        "2023-05",
        "2023-06",
        "2023-07",
        "2023-08",
        "2023-09",
        "2023-10",
        "2023-11",
        "2023-12",
      ];
      const calendars = [];
      const series = [];

      months.forEach((month, index) => {
        calendars.push({
          top: 10,
          left: index * 65, // Adjust the spacing here
          cellSize: 12,
          range: month,
          itemStyle: {
            borderWidth: 2,
            borderColor: "#fff",
            borderCap: "round",
          },
          splitLine: {
            show: false,
          },
          dayLabel: {
            show: false,
          },
          monthLabel: {
            show: false,
          },
          yearLabel: {
            show: false,
          },
        });

        series.push({
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: index,
          data: generateData(month),
        });
      });

      function generateData(month) {
        const data = [];
        const startDate = new Date(month + "-01");
        const endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0
        );
        for (let day = 1; day <= endDate.getDate(); day++) {
          const dateStr = month + "-" + (day < 10 ? "0" + day : day);
          data.push([dateStr, Math.floor(Math.random() * 30)]);
        }
        return data;
      }

      option = {
        tooltip: {
          position: "top",
          formatter: function (p) {
            const format = echarts.time.format(
              p.data[0],
              "{yyyy}-{MM}-{dd}",
              false
            );
            return `${format}<br/>${p.data[1]} submission(s)}`;
          },
        },
        visualMap: {
          show: false,
          pieces: [
            { gte: 20, color: "#238223" },
            { gte: 10, lte: 20, color: "#0b9f0b" },
            { gte: 0, lte: 10, color: "#8ddc8d" },
            { lte: 0, color: "#ddd" },
          ],
        },
        calendar: calendars,
        series: series,
      };

      option && myChart.setOption(option);
    },
    fetchData() {
      this.loading = true;
      // const _this = this;
    },
  },
  mounted() {
    this.renderChart();
    this.renderCalendar();
    this.fetchData();
  },
};
</script>
  