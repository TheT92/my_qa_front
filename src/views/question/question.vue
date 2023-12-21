<template>
  <div class="question">
    <el-row>
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <h1>No: {{ question.id }}</h1>
        <p><span class="inline-block text-right w-120">标题：</span>{{ question.questionTitle }}</p>
        <p>详情：</p>
        <p class="pre-wrap">{{ question.questionContent }}</p>
        <p>我的答案：<el-input></el-input></p>
        <template v-if="showAnswer">
          <p>标准答案：</p>
          <p class="pre-wrap">{{ question.rightAnswer }}</p>
          <p>
            自评分数：<el-rate v-model="rating" allow-half show-score></el-rate>
          </p>
          <el-button type="primary">提交</el-button>
        </template>
        <el-button v-else type="primary" @click="toggleShowAnswer">查看答案</el-button>
      </el-col>
    </el-row>
  </div>
</template>
    
<script>
import { getQuestion } from "@/apis/question";
import { LAYOUTS } from "@/constants";
export default {
  name: "question-detail",
  components: {},
  data() {
    return {
      loading: false,
      showAnswer: false,
      layout: LAYOUTS.LAYOUT_LIST,
      rating: 0,
      question: {
        questionTitle: "",
      },
    };
  },
  methods: {
    toggleShowAnswer() {
      this.showAnswer = !this.showAnswer;
    },
    fetchData() {
      const _this = this;
      getQuestion(this.id)
        .then((res) => {
          console.log(res, "111111111111");
          const { data } = { ...res };
          _this.question = { ...data };
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
    