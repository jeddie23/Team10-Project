<template>
  <div>
    <el-table
      v-loading="listLoading"
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column property="examId" label="考试编号" width="100">
      </el-table-column>
      <el-table-column property="paperId" label="考试试卷编号" width="100">
      </el-table-column>
      <el-table-column property="startTime" label="考试开始日期" width="150"> </el-table-column>
      <el-table-column property="endTime" label="考试截止日期" width="150"> </el-table-column>
      <el-table-column label="考试得分" width="150">
        <template slot-scope="scope">
          <div style="margin-left: 30px;">{{ scope.row.score==null?'未作答':scope.row.score }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.score!==null"
            @click="startTest(scope.row)">开始答题</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.score!==null">查看得分</el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { post, get } from "@/api/login";
export default {
  data() {
    return {
      tableData: [],
      total: '',
      currentRow: null,
      listLoading: false
    };
  },
  created(){
    this.fetchData(); 
  },
  activated(){
    this.fetchData(); 
  },
  methods: {
    // 获取数据列表
    fetchData() {
      this.listLoading = true;
      let params = {}
      let obj = JSON.parse(sessionStorage.getItem('userinfo'))
      params.userId = obj.userId;
      // 获取数据列表接口
      get("/api/getUserExams",params)
        .then((res) => {
          console.log(res,'1');
          let data = [];
          data = res;
          this.total = data.length;
          this.tableData = data;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    startTest(val){
      let paperId = val.paperId;
      let examId = val.examId;
      this.$router.push({path:'/studenttest/begintest',query: {paperId,examId}})
    }
  },
};
</script>