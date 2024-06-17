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
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>添加计划</span>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="100px"
            class="add-form"
          >
            <el-form-item label="标题" prop="title">
              <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input
                type="textarea"
                :rows="4"
                :autosize="{minRows: 4, maxRows: 10}"
                v-model="formData.description"
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
    
    <script>
import { editPlan, getPlan } from "@/apis/plan";
import { LAYOUTS } from "@/constants";
export default {
  name: "edit-question",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_FORM,
      formData: {
        title: "",
        description: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 60, message: "长度在3到60个字符", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请填写描述信息", trigger: "blur" },
          { min: 3, max: 200, message: "长度在3到200个字符", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true;
          editPlan({ id: this.id, ..._this.formData })
            .then((res) => {
              const { data = "" } = { ...res };
              if (data == "success") {
                _this.msgSuccess("修改成功！");
                _this.$router.replace("/studyPlan");
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
      getPlan(this.id)
        .then((res) => {
          console.log(res, "111111111111");
          const { data } = { ...res };
          _this.formData = { ...data };
          _this.resetForm("formData");
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
    