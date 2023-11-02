<template>
  <div class="table-inline-edit">
    <el-card shadow="always">
      <!-- Control Bar -->
      <div class="control-btns">
        <el-button type="primary" @click="formVisible = true">New</el-button>
        <!-- <el-button type="primary" @click="handleImport">Import Data</el-button>
                <el-button type="primary" @click="exportVisible = true">Export Data</el-button> -->
        <el-button type="danger" v-auth="'administrator'" @click="batchDelete">Batch Delete</el-button>
      </div>
      <!-- Search Bar -->
      <el-form ref="searchForm" :inline="true" :model="listQuery" label-width="90px" class="search-form">
        <el-form-item label="Disease Type">
          <el-input v-model="listQuery.type" placeholder="Please Enter" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Search</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="tableList" tooltip-effect="dark" style="width: 100%" size="medium"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="diseaseId" label="ID" align="center" width="55" />
        <el-table-column prop="diseaseName" label="Disease Name" align="center" />
        <el-table-column label="diseaeType" align="center">
          <template slot-scope="scope">{{ scope.row.diseaseType }}</template>
        </el-table-column>
        <el-table-column label="Symptom" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="download(scope.row,'symptom')">Download</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Treatment" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="download(scope.row,'treat')">Download</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Action" width="250">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click="handleDetail(scope.row.diseaseId)">Details</el-button> -->
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <checkDialog :formVisible="formVisible" @isShow="formVisible = !formVisible; fetchData()"></checkDialog>
  </div>
</template>

  
<script>

// import { get } from 'js-cookie'
import { post, get, deleteData } from "@/api/login";
import checkDialog from "./checkDialog.vue"
export default {
  name: "TableInlineEdit",
  components: { checkDialog },
  data() {
    return {
      listQuery: {
        type: ''
      },
      listLoading: true,
      isLoading: false,
      tableList: [],
      allData: [],
      total: 0,
      multipleSelection: [],
      listQuery: {
        diseaseName: undefined,
        currentPage: 1,
        pageSize: 10,
      },
      formVisible: false,
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
    download(row,type){
      get("http://20.2.217.111:9001/apis/disease/getDiseaseFile",{id:row.diseaseId,type}).then(res=>{
        window.open(res, '_blank');
      })
    },
    // 获取数据列表
    fetchData() {
      this.listLoading = true;
      // 获取数据列表接口
      get("http://20.2.217.111:9001/apis/disease/getDisease")
        .then((res) => {
          let data = [];
          data = res;
          this.total = data.length;
          this.tableList = data;
          this.listLoading = false;
          this.allData = data;
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
      console.log(id);
      this.$router.push({ path: '/case/casedetail', query: { id } })
    },
    handleDelete(inds, row) {
      this.$confirm("Whether to delete this case?", "prompt", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      }).then(() => {
        deleteData("http://20.2.217.111:9001/apis/disease/deleteDiseaseById", { id: row.diseaseId }).then(() => {
          this.$message.success("successfully deleted");
          this.fetchData();
        });
      });
    },
    //查询
    onSubmit() {
      if (this.listQuery.type == '' || this.listQuery.type == undefined) {
        return
      }
      let arr = []
      arr = this.allData.filter(item => {
        let flag = JSON.stringify(item).indexOf(this.listQuery.type)
        return flag >= 0;
      })
      this.tableList = arr;
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
  