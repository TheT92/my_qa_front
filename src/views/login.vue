<template>
  <div class="login page-container">
    <el-row :gutter="10">
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <el-card class="box-card mt-4">
          <div slot="header" class="clearfix">
            <span>登录</span>
          </div>
          <el-form
            :model="formData"
            :rules="rules"
            ref="formData"
            label-width="100px"
            class="demo-formData"
            @keydown.enter.native="submitForm('formData')"
          >
            <el-form-item label="用户名" prop="loginAccount">
              <el-input v-model="formData.loginAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                style="width: 100%"
                @click="submitForm('formData')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
      
<script>
import { mapActions } from 'vuex';
import { login } from '@/apis/account';
export default {
  name: "login-page",
  components: {},
  data() {
    return {
      loading: false,
      layout: {
        xs: { span: 12, offset: 6 },
        sm: { span: 12, offset: 6 },
        md: { span: 10, offset: 7 },
        lg: { span: 8, offset: 8 },
        xl: { span: 4, offset: 10 },
      },
      formData: {
        loginAccount: "",
        password: "",
      },
      rules: {
        loginAccount: [
          { required: true, message: "请输入账户", trigger: "blur" },
          { min: 3, max: 30, message: "长度在3到30个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions("account", ["getUserInfo"]),
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate(async (valid) => {
        if (valid) {
          _this.loading = true;
          const [err, res] = await login(_this.formData);
          _this.loading = false;
          if(!err) {
            localStorage.setItem('token', res);
            _this.getUserInfo();
            _this.$router.replace("/");
          } else {
            this.msgError("登录失败~");
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {},
};
</script>
      