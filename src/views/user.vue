<template>
  <div class="user-center page-container">
    <h4 class="mt-4">用户中心</h4>
    <el-card class="box-card" shadow="never">
      <p>用户名：</p>
      <p>数据：</p>
    </el-card>
  </div>
</template>
  
  <script>
import * as questionApi from "@/apis/question";
import { LAYOUTS } from "@/constants";

export default {
  name: "user-center",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_LIST,
      query: "",
      tableData: [],
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    toDetail(data) {
      console.log(data);
      if ({ ...data }.id) {
        this.$router.push(`/question/${data.id}`);
      }
    },
    onEdit(data) {
      if ({ ...data }.id) {
        this.$router.push(`/edit/${data.id}`);
      }
    },
    onDel(data) {
      if ({ ...data }.id) {
        const _this = this;
        _this.loading = true;
        questionApi
          .deleteQuestion(data.id)
          .then((res) => {
            const { data = "" } = { ...res };
            if (data == "success") {
              _this.msgSuccess();
              _this.fetchData();
            }
          })
          .catch((err) => {
            console.log(err, "22222222222222222");
            _this.loading = false;
            _this.msgError();
          })
          .finally(() => {
            console.log("333333333333333");
          });
      }
    },
    fetchData() {
      this.loading = true;
      // const _this = this;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  