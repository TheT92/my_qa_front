<template>
  <div class="edit-word page-container">
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
            <span>编辑单词</span>
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
import { Loading } from "element-ui";
import { LAYOUTS, WORD_TYPES } from "@/constants";
import { getword, editword } from "@/apis/word";
export default {
  name: "edit-word",
  data() {
    return {
      id: '',
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
      _this.$refs[formName].validate(async (valid) => {
        if (valid) {
          _this.loading = true;
          const [err, res] = await editword({ ..._this.formData });
          _this.loading = false;
          if(!err) {
            if (res == "success") {
              _this.msgSuccess("修改成功！");
              _this.$router.replace("/learnEnglish");
            } else {
              _this.msgError("修改失败！");
            }
          } else{
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
      const [err, res] = await getword(_this.id);
      _this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
      });
      if (!err) {
        _this.formData = { ...res };
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