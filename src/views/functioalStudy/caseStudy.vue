<template>
  <div class="table-inline-edit">
    <el-card shadow="always">
      <!-- 操作栏 -->
      <div class="control-btns">
        <!-- <el-button type="primary" @click="handleImport">导入数据</el-button>
                  <el-button type="primary" @click="exportVisible = true">导出数据</el-button> -->
        <el-button type="danger" v-auth="'administrator'" @click="batchDelete">批量删除</el-button>
      </div>
      <!-- 查询栏 -->
      <el-form ref="searchForm" :inline="true" :model="listQuery" label-width="90px" class="search-form">
        <el-form-item label="疾病类型">
          <el-input v-model="listQuery.diseaseName" placeholder="请输入内容" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="tableList" tooltip-effect="dark" style="width: 100%" size="medium"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="diseaseId" label="编号" align="center" width="55" />
        <el-table-column prop="diseaseName" label="疾病名称" align="center" />
        <el-table-column label="接诊情况" align="center">
          <template slot-scope="scope">{{ scope.row.diseaseSymptom }}</template>
        </el-table-column>
        <el-table-column label="病例检查" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.diseaseExam }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="diseaseResult" label="诊断结果" align="center" />
        <el-table-column prop="diseaseTreat" label="治疗方案" align="center" />
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.row.diseaseId)">详情</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)"
              v-auth="'administrator'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
    
<script>
import Hints from "@/components/Hints/index.vue";
import Pagination from "@/components/Pagination/index.vue";
// import { get } from 'js-cookie'
import { post, get } from "@/api/login";

export default {
  name: "caseStudy",
  components: { Hints, Pagination },
  data() {
    return {
      listLoading: true,
      isLoading: false,
      tableList: [],
      allData: [],
      total: 0,
      multipleSelection: [],
      listQuery: {
        diseaseName: undefined,
      },
      formVisible: false,
      tableData: [],
      fileList: [],
      // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
      //   formRules: {
      //     name: [{ required: true, message: "请输入疾病名称", trigger: "blur" }],
      //     info: [{ required: true, message: "请输入接诊情况", trigger: "blur" }],
      //     exam: [{ required: true, message: "请输入病例检查", trigger: "blur" }],
      //     result: [
      //       { required: true, message: "请输入诊断结果", trigger: "blur" },
      //     ],
      //     scheme: [
      //       { required: true, message: "请输入治疗方案", trigger: "blur" },
      //     ],
      //   },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取数据列表
    fetchData() {
      this.listLoading = true;
      // 获取数据列表接口
      get("/api/disease/getDiseases")
        .then((res) => {
          let data = [];
          data = res;
          this.total = data.length;
          this.tableList = data;
          this.listLoading = false;
          this.allData = data
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val.map((item) => item.diseaseId);
    },
    batchDelete() {
      console.log(this.multipleSelection);
      this.$confirm("是否批量删除病例?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        get("/api/disease/deleteDiseaseByIds", { idsWithComma: this.multipleSelection.toString() }).then(() => {
          this.$message.success("删除成功");
          this.fetchData();
        });
      });
    },
    handleDetail(id) {
      this.$router.push({ path: '/case/casedetail', query: { id } })
    },
    //查询
    onSubmit() {
      if (this.listQuery.diseaseName == '' || this.listQuery.diseaseName == undefined) {
        return
      }
      let arr = []
      arr = this.allData.filter(item => {
        let flag = JSON.stringify(item).indexOf(this.listQuery.diseaseName)
        return flag >= 0;
      })
      this.tableList = arr;
    },
    handleDelete(inds, row) {
      this.$confirm("是否删除该病例?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        get("/api/disease/deleteDiseaseById", { id: row.diseaseId }).then(() => {
          this.$message.success("删除成功");
          this.fetchData();
        });
      });
    },
  },
};
</script>
    
<style lang="less">
.control-btns {
  margin-bottom: 20px;
}

.search-form {
  padding-top: 18px;
  margin-bottom: 15px;
  background-color: #f7f8fb;
}

.table-inline-edit {
  .el-table thead {
    font-weight: 600;

    th {
      padding: 16px 0 15px !important;
      background-color: #f2f3f7;
    }
  }

  .footer-item {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #fff;
    left: 0;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
    