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
        <p>No: {{ question.id }}</p>
        <p class="flex">
          <span class="inline-block text-right w-120">标题：</span>
          <span class="flex1">{{ question.questionTitle }}</span>
        </p>
        <p class="flex">
          <span class="inline-block text-right w-120">标签：</span>
          <span class="flex1">{{ question.category }}</span>
        </p>
        <p class="flex">
          <span class="inline-block text-right w-120">详情：</span>
          <span class="flex1 pre-wrap">{{ question.questionContent }}</span>
        </p>
        <p class="flex">
          <span class="inline-block text-right w-120">我的答案：</span>
          <el-input
            class="flex1 pre-wrap"
            type="textarea"
            :rows="4"
            :autosize="{ minRows: 4, maxRows: 10 }"
          ></el-input>
        </p>
        <template v-if="showAnswer">
          <p class="flex">
            <span class="inline-block text-right w-120">标准答案：</span>
            <span class="flex1 pre-wrap">{{ question.rightAnswer }}</span>
          </p>
          <p class="flex">
            <span class="inline-block text-right w-120">自评分数：</span>
            <span class="flex1 pre-wrap"
              ><el-rate v-model="rating" allow-half show-score></el-rate
            ></span>
          </p>
          <el-button
            style="margin-left: 120px"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >提交</el-button
          >
        </template>
        <el-button
          v-else
          style="margin-left: 120px"
          type="primary"
          @click="toggleShowAnswer"
          >查看答案</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
    
<script>
import { getQuestion, submitAnswer } from "@/apis/question";
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
    onSubmit() {
      // 提交答案和评分
      const _this = this;
      if (_this.rating <= 0) {
        return _this.msgError("请选择自评分数！");
      }
      _this.loading = true;
      submitAnswer({ rating: this.rating, questionId: _this.question.id })
        .then((res) => {
          console.log(res, "111111111111");
        })
        .catch((err) => {
          console.log(err, "2222222222222");
        })
        .finally(() => {
          _this.loading = false;
          console.log("3333333333333333333");
        });
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
    