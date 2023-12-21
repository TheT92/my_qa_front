<template>
  <div class="plan-detail">
    <el-row>
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>计划详情</span>
          </div>
          <p v-text="plan.title"></p>
          <p v-text="plan.description"></p>
          <h3>学习进度：40% 复习进度：20%</h3>
          <div class="game-cube flex">
            <div class="progress-cube flex">
              <div class="study-progress border-box"></div>
              <div class="review-progress border-box"></div>
            </div>
            <div class="flex" style="flex-direction: column">
              <div style="flex: 1">
                <h4 style="color:orangered;">学习进度：40%</h4>
                <h4 style="color:#06b0f9;">复习进度：20%</h4>
                <h4 style="color:#20e109;">刷题数量：3721 题</h4>
              </div>
              <div class="experience-wrap">
                <img class="experience-bar" :src="bar" />
                <!-- <div class="experience-bar"></div> -->
                <div class="value"></div>
              </div>
            </div>
          </div>

          <div>
            计划项
            <p v-for="(item, index) in listItems" :key="index">
              {{ item.title }}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.plan-detail {
  .game-cube {
    width: 100%;
    overflow: hidden;
    background: #efefef;
    .progress-cube {
      width: 240px;
      .study-progress {
        width: 80px;
        height: 160px;
        background: orangered;
        border: 1px solid #fff;
        border-top-left-radius: 80px;
        border-bottom-left-radius: 80px;
      }
      .review-progress {
        width: 80px;
        height: 160px;
        background: #06b0f9;
        border: 1px solid #fff;
        border-top-right-radius: 80px;
        border-bottom-right-radius: 80px;
      }
    }
    .experience-wrap {
      position: relative;
      width: 100%;
      .experience-bar {
        position: relative;
        display: block;
        width: 100%;
        height: auto;
        z-index: 10;
      }
      .value {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 70%;
        background: #20e109;
        z-index: 9;
      }
    }
  }
}
</style>
    
<script>
import { getPlan } from "@/apis/plan";
import { LAYOUTS } from "@/constants";
import bar from "@/assets/bar.svg";
export default {
  name: "plan-detail",
  components: {},
  data() {
    return {
      bar,
      loading: false,
      showAnswer: false,
      layout: LAYOUTS.LAYOUT_LIST,
      rating: 0,
      plan: {
        planTitle: "",
      },
      listItems: [
        { title: "Java数组" },
        { title: "Java中的ArrayList" },
        { title: "Java序列化和反序列化" },
      ],
    };
  },
  methods: {
    toggleShowAnswer() {
      this.showAnswer = !this.showAnswer;
    },
    fetchData() {
      const _this = this;
      getPlan(this.id)
        .then((res) => {
          console.log(res, "111111111111");
          const { data } = { ...res };
          _this.plan = { ...data };
        })
        .catch((err) => {
          console.log(err, "2222222222222");
        })
        .finally(() => {
          console.log("3333333333333333333");
        });
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id;
    !!id && this.fetchData();
  },
};
</script>
    