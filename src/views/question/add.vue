<template>
  <div class="add-question page-container">
    <el-row :gutter="10">
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加问题</span>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="100px"
            class="add-form"
          >
            <el-form-item label="标题" prop="questionTitle">
              <el-input class="fs-1" v-model="formData.questionTitle"></el-input>
            </el-form-item>
            <el-form-item label="类别" prop="category">
              <el-input class="fs-1" v-model="formData.category"></el-input>
            </el-form-item>
            <el-form-item label="问题详情" prop="questionContent">
              <el-input
                type="textarea"
                :rows="4"
                class="fs-1"
                :autosize="{minRows: 4, maxRows: 10}"
                v-model="formData.questionContent"
              ></el-input>
            </el-form-item>
            <el-form-item label="标准答案" prop="rightAnswer">
              <el-input
                type="textarea"
                :rows="4"
                class="fs-1"
                :autosize="{minRows: 4, maxRows: 10}"
                v-model="formData.rightAnswer"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                @click="submitForm('formData')"
                >提交</el-button
              >
              <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
</style>
  
  <script>
import { addQuestion } from "@/apis/question";
import { LAYOUTS } from "@/constants";
export default {
  name: "add-question",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_FORM,
      formData: {
        questionTitle: "",
        category: "",
        questionContent: "",
        rightAnswer: "",
      },
      rules: {
        questionTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 200, message: "长度在3到200个字符", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请输入类别", trigger: "blur" },
          { max: 20, message: "长度不得超过20个字符", trigger: "blur" },
        ],
        questionContent: [
          { required: true, message: "请填写问题详情", trigger: "blur" },
        ],
        rightAnswer: [
          { required: true, message: "请填写标准答案", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate(async (valid) => {
        if (valid) {
          _this.loading = true;
          const [err, res] = await addQuestion({ ..._this.formData });
          _this.loading = false;
          if(!err) {
              if (res == "success") {
                _this.msgSuccess("创建成功！");
                _this.$router.replace("/list");
              }
          } else {
            _this.msgError("创建失败！");
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
  