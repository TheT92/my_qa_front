<template>
  <div class="home">
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
            <el-input v-model="formData.questionTitle"></el-input>
          </el-form-item>
          <el-form-item label="类别" prop="category">
            <el-input v-model="formData.category"></el-input>
          </el-form-item>
          <el-form-item label="问题详情" prop="questionContent">
            <el-input
              type="textarea"
              v-model="formData.questionContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="标准答案" prop="rightAnswer">
            <el-input type="textarea" v-model="formData.rightAnswer"></el-input>
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
        id: '',
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
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true;
          editQuestion({ id: this.id, ..._this.formData, delFlag: 0 })
            .then((res) => {
              const { data = "" } = { ...res };
              if (data == "success") {
                _this.msgSuccess("修改成功！");
                _this.$router.replace("/list");
              }
            })
            .catch((err) => {
              _this.msgError("修改失败！");
              console.log(err, "xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            })
            .finally(() => {
              _this.loading = false;
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    fetchData() {
      const _this = this;
      getQuestion(this.id).then(res => {
        console.log(res, '111111111111')
        const { data } = { ...res };
        _this.formData = { ...data };
        _this.resetForm('formData');
      }).catch(err => {
        console.log(err, '2222222222222')
      }).finally(() => {
        console.log('3333333333333333333')
      })
    }
  },
  mounted() {
    const {id} = this.$route.params;
    this.id = id;
    !!id && this.fetchData();
  }
};
</script>
    