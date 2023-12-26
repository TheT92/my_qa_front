<template>
  <el-dialog title="添加计划项" :visible.sync="dialogVisible" @close="onClose">
    <div class="add-plan-item">
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
            :autosize="{ minRows: 4, maxRows: 10 }"
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
    </div>
  </el-dialog>
</template>
<style scoped lang="scss">
.add-plan {
  font-family: simHei;
}
::v-deep.el-input {
  * {
    font-size: 18px;
  }
}
::v-deep.el-textarea {
  * {
    font-size: 18px;
    font-family: simHei;
  }
}
</style>
  
  <script>
import { addPlanItem } from "@/apis/plan";
export default {
  name: "add-plan-item",
  components: {},
  props: {
    visible: {
      type: Boolean,
    },
    planId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        title: "",
        description: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 60, message: "长度在3到60个字符", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请填写描述信息", trigger: "blur" },
          { min: 3, max: 200, message: "长度在3到200个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set() {
        this.$parent.onLayerChange(0);
      },
    },
  },
  methods: {
    onClose() {
      
    },
    submitForm(formName) {
      const _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true;
          addPlanItem({ ..._this.formData, delFlag: 0, planId: this.planId })
            .then((res) => {
              const { data = "" } = { ...res };
              if (data == "success") {
                _this.msgSuccess("创建成功！");
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
  