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
  <div class="question-list page-container">
    <el-input
      class="mt-4 mb-4"
      placeholder="请输入内容"
      v-model="query"
      @keydown.enter.native="fetchData"
    >
      <el-button slot="prepend" type="primary" @click="toAdd"
        >Add Question</el-button
      >
      <el-button
        type="primary"
        slot="append"
        icon="el-icon-search"
        @click="fetchData"
      ></el-button>
    </el-input>
    <div class="mb-2 d-flex">
      <span class="fs-2 fw-7">Tags:</span>
      <p class="flex-1 m-0 ml-4 break-all">
        <span
          @click="onChooseTag(item)"
          :class="['tag', 'fs-1', item == tag ? 'active' : '']"
          v-for="(item, index) in QUESTION_TAGS"
          :key="index"
          v-show="index < 8 || expandTags"
          >{{ item }}</span
        >
      </p>
      <p class="m-0">
        <span @click="onExpand" class="tag tag-expand">{{
          expandTags ? "Fold" : "Expand"
        }}</span>
      </p>
    </div>

    <el-card class="box-card">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        size="small"
      >
        <el-table-column
          prop="id"
          label="ID"
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
        <el-table-column
          prop="totalCounts"
          label="答题次数"
          width="100"
        ></el-table-column>
        <el-table-column prop="correctRate" label="正确率" width="100">
          <template slot-scope="scope">
            {{ scope.row.correctRate || '--' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button slot="reference" type="text" @click="onEdit(scope.row)"
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
        v-if="paginationShow"
        background
        layout="total, prev, pager, next"
        :total="total"
        @current-change="onPage"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/list.scss";
</style>
  <script>
import * as questionApi from "@/apis/question";
import { LAYOUTS, PAGE_SIZE, QUESTION_TAGS } from "@/constants";

export default {
  name: "question-list",
  components: {},
  data() {
    return {
      loading: false,
      layout: LAYOUTS.LAYOUT_LIST,
      QUESTION_TAGS,
      query: "",
      total: 0,
      tableData: [],
      currentPage: 1,
      paginationShow: true,
      tag: "",
      expandTags: false,
    };
  },
  methods: {
    onChooseTag(item) {
      this.tag = item == this.tag ? "" : item;
      this.$router.push({
        path: "/list", // 目标路由的路径
        query: {
          ...(!this.tag ? {} : { tag: this.tag }),
        },
      });
      this.currentPage = 1;
      this.fetchData();
    },
    onExpand() {
      this.expandTags = !this.expandTags;
    },
    toAdd() {
      this.$router.push("/add");
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
    async onDel(data) {
      if ({ ...data }.id) {
        const _this = this;
        _this.loading = true;
        const [err, res] = await questionApi.deleteQuestion(data.id);
        if (!err) {
          if (res == "success") {
            _this.msgSuccess();
            _this.fetchData();
          }
        } else {
          _this.loading = false;
          _this.msgError();
        }
      }
    },
    onPage(page) {
      this.paginationShow = false;
      if (page != this.currentPage) {
        this.$router.push(`/list?page=${page}`);
        this.$router.push({
          path: "/list", // 目标路由的路径
          query: {
            page,
            ...(!this.tag ? {} : { tag: this.tag }),
          },
        });
      }
      this.currentPage = parseInt(page);
      this.$nextTick(() => {
        this.paginationShow = true;
      });

      this.fetchData();
    },
    async fetchData() {
      this.loading = true;
      const _this = this;
      const [err, res] = await questionApi.getQuestionsPage({
        tag: _this.tag,
        query: _this.query,
        pageNum: this.currentPage,
        pageSize: PAGE_SIZE.DEFAULT,
      });
      _this.loading = false;
      if (!err) {
        const { list, total } = { ...res };
        _this.tableData = [...(list || [])];
        _this.total = total || 0;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      const { page, tag } = this.$route.query;
      this.tag = tag || "";
      this.onPage(page || 1);
    }, 0);
  },
};
</script>
  