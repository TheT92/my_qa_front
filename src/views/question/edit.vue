<template>
  <div class="home page-container">
    <el-row :gutter="10">
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <div>编辑问题</div>
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="100px"
          class="demo-formData"
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
              class="fs-1"
              :rows="4"
              :autosize="{ minRows: 4, maxRows: 10 }"
              v-model="formData.questionContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="标准答案" prop="rightAnswer">
            <el-input
              type="textarea"
              :rows="4"
              class="fs-1"
              :autosize="{ minRows: 4, maxRows: 10 }"
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
      </el-col>
    </el-row>
  </div>
</template>
    
    <script>
import { Loading } from "element-ui";
import { editQuestion, getQuestion } from "@/apis/question";
import { LAYOUTS } from "@/constants";
export default {
  name: "edit-question",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_FORM,
      formData: {
        id: "",
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
          const [err, res] = await editQuestion({
            id: this.id,
            ..._this.formData,
          });
          _this.loading = false;
          if (!err) {
            if (res == "success") {
              _this.msgSuccess("修改成功！");
              _this.$router.replace("/list");
            }
          } else {
            _this.msgError("修改失败！");
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async fetchData() {
      const _this = this;
      let loadingInstance = Loading.service({ fullscreen: true });
      const [err, res] = await getQuestion(_this.id);
      _this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
      if (!err) {
        const { question } = { ...res };
        _this.formData = { ...question };
      }
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id;
    !!id && this.fetchData();
  },
};
</script>
    