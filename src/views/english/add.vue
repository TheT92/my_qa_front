<template>
  <div class="add-word">
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
            <span>添加单词</span>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="100px"
            class="add-form"
          >
            <el-form-item label="单词" prop="word">
              <el-input v-model="formData.word"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option
                  v-for="item in wordTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提示" prop="tips">
              <el-input v-model="formData.tips"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imgUrl">
              <el-upload
                :limit="1"
                :show-file-list="false"
                class="avatar-uploader"
                action="/api/image/upload"
                :on-remove="onRemove"
                :on-preview="handlePreview"
                :on-success="onSuccess"
                accept=".jpg,.png,.jpeg"
              >
                <img v-if="formData.imgUrl" :src="imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
::v-deep.el-form-item {
  .el-select {
    width: 100%;
  }
}
::v-deep.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
<script>
import { LAYOUTS, WORD_TYPES } from "@/constants";
import { addword } from "@/apis/word";
export default {
  name: "add-word",
  data() {
    return {
      layout: LAYOUTS.LAYOUT_FORM,
      wordTypes: WORD_TYPES,
      formData: {
        word: "",
        type: "",
        imgUrl: "",
        tips: "",
      },
      rules: {
        word: [
          { required: true, message: "请输入单词", trigger: "blur" },
          { min: 3, max: 60, message: "长度在3到60个字符", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  computed: {
    imgUrl() {
      return "/static" + this.formData.imgUrl;
    },
  },
  methods: {
    onRemove() {
      this.formData = { ...this.formData, imgUrl: "" };
    },
    onSuccess(response, file) {
      console.log("000000000000000000");
      let url = file.response.url;
      console.log(url, "-------------------");
      this.formData = { ...this.formData, imgUrl: url };
    },
    handlePreview(file) {
      let url = file.response.url;
      url = "/static" + url;
      console.log(url);

      window.open(url);
      console.log(url);
    },
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true;
          addword({ ..._this.formData })
            .then((res) => {
              const { data = "" } = { ...res };
              if (data == "success") {
                _this.msgSuccess("创建成功！");
                _this.$router.replace("/learnEnglish");
              }
            })
            .catch((err) => {
              _this.msgError("创建失败！");
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
  },
};
</script>