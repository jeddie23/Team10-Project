<template>
  <div>
    <!-- 表格栏 -->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      size="medium"
    >
      <el-table-column
        prop="examId"
        label="考试编号"
        align="center"
        width="80"
      />
      <el-table-column
        prop="paperId"
        label="试卷编号"
        align="center"
        width="80"
      />
      <el-table-column prop="startTime" label="考试开始时间" align="center" />
      <el-table-column prop="endTime" label="考试结束时间" align="center" />
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.examId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { post, get } from "@/api/login";
import axios from "axios";

export default {
  data() {
    return {
      listLoading: true,
      tableData: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      get("/api/getAllExam").then((res) => {
        this.tableData = res;
        this.listLoading = false;
      });
    },
    handleDelete(examId) {
      axios({
        method: "delete",
        url: "/api/deleteExam",
        params: {examId}, // 请求参数拼接在url上
        data: {}, // 请求参数放在请求体
      }).then((res) => {
        console.log(res);
        this.$message.success("删除成功");
        this.fetchData();
      });
    },
  },
};
</script>

<style>
</style>