<template>
  <div class="study-plan">
    <el-row>
      <el-col
        :xs="layout.xs"
        :sm="layout.sm"
        :md="layout.md"
        :lg="layout.lg"
        :xl="layout.xl"
      >
        <el-input
          placeholder="请输入内容"
          v-model="query"
          @keydown.enter.native="fetchData"
        >
          <el-button
            type="primary"
            slot="append"
            icon="el-icon-search"
            @click="fetchData"
          ></el-button>
        </el-input>
        <br /><br />
        <div class="plan-list">
          <div class="plan-cube text-link" @click="onAdd">
            <br />
            <i class="el-icon-plus"></i>
            <p>Add Plan</p>
          </div>
          <template v-for="item in tableData">
            <div
              class="plan-cube text-link"
              :key="item.id"
              @click="toDetail(item)"
            >
              {{ item.title }}
              <div class="action-bar">
                <i class="el-icon-setting mr10" @click.stop="toEdit(item)"></i>
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </template>
          <div style="width: 100%; float: left;">
            <br/>
            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="total"
              @current-change="onPage"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.plan-list {
  padding: 20px;
  background: #ffffff;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .plan-cube {
    position: relative;
    float: left;
    display: inline-flex;
    flex-direction: column;
    margin: 0 20px 20px 0;
    padding: 5px;
    width: 160px;
    height: 160px;
    border-radius: 8px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 3px 1px #888;
    overflow: hidden;
    i {
      font-size: 30px;
    }
    .action-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 10px;
      height: 40px;
      text-align: right;
      box-sizing: border-box;
      background: #000000b3;
      i {
        font-size: 20px;
        color: #ffffff;
      }
    }
  }
}
</style>
  
  <script>
import * as planApi from "@/apis/plan";
import { LAYOUTS, PAGE_SIZE } from "@/constants";

export default {
  name: "question-list",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_LIST,
      query: "",
      total: 0,
      tableData: [],
      currentPage: 1,
    };
  },
  methods: {
    toDetail(item = {}) {
      this.$router.push(`/planDetail/${item.id}`);
    },
    toEdit(item = {}) {
      this.$router.push(`/editPlan/${item.id}`);
    },
    onAdd() {
      this.$router.push("/addPlan");
    },
    onPage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      const _this = this;
      planApi
        .getPlansPage({
          query: _this.query,
          pageNum: this.currentPage,
          pageSize: PAGE_SIZE.DEFAULT,
        })
        .then((res) => {
          const {
            data: { list, total },
          } = { data: {}, ...res };
          _this.tableData = [...(list || [])];
          _this.total = total || 0;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          _this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  