<!--
 * @name: 
 * @param: 
 * @return: 
-->
<!--
 * @name: 
 * @param: 
 * @return: 
-->
<template>
  <div class="question-list">
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
        <el-card class="box-card" shadow="never">
          <el-table
            v-loading="loading"
            key="index"
            :data="tableData"
            style="width: 100%"
            size="small"
          >
            <el-table-column
              type="index"
              label="序号"
              :index="indexMethod"
              width="100"
            ></el-table-column>
            <el-table-column
              label="标题"
              show-overflow-tooltip
              tooltip-effect="light"
            >
              <template slot-scope="scope">
                <span class="text-link f14" @click="toDetail(scope.row)">{{
                  scope.row.questionTitle
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="category"
              label="类别"
              width="180"
            ></el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  slot="reference"
                  type="text"
                  @click="onEdit(scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确定删除该问题吗？"
                  @confirm="onDel(scope.row)"
                >
                  <el-button slot="reference" type="text">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="total"
            @current-change="onPage"
          >
          </el-pagination> </el-card
      ></el-col>
    </el-row>
  </div>
</template>
  
  <script>
import * as questionApi from "@/apis/question";
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
    onPage(page) {
      this.currentPage = page;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      const _this = this;
      questionApi
        .getQuestionsPage({ query: _this.query, pageNum: this.currentPage, pageSize: PAGE_SIZE.DEFAULT})
        .then((res) => {
          const { data: { list, total } } = { data: {}, ...res };
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
  