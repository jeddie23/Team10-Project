<template>
    <div class="table-classic-wrapper">
      <Hints>
        <template slot="hintName">题库管理列表</template>
        <template slot="hintInfo">
          <p style="font-size: 16px;color: rgba(19, 206, 102, 0.8);">
            勾选试题进行组卷，点击开始组卷生成试卷
          </p>
        </template>
      </Hints>
      <el-card shadow="always">
        <!-- 操作栏 -->
        <div class="control-btns">
          <el-button type="primary" @click="handleCreate">新建数据</el-button>
          <el-button type="primary" @click="handleImport">导入数据</el-button>
          <el-button type="primary" @click="exportVisible = true">导出数据</el-button>
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-button type="success" @click="testVisible=true">开始组卷</el-button>
        </div>
        <!-- 查询栏 -->
        <el-form
          ref="searchForm"
          :inline="true"
          :model="listQuery"
          label-width="90px"
          class="search-form"
        >
          <el-form-item label="编号">
            <el-input v-model="listQuery.questionId" placeholder="编号" />
          </el-form-item>
          <el-form-item label="题目描述">
            <el-input v-model="listQuery.questionDescription" placeholder="输入题目描述" />
          </el-form-item>
          <el-form-item label="所属病种">
            <el-select v-model="listQuery.diseaseType" placeholder="所属病种" clearable>
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item class="score"> 
            <el-statistic title="组卷总分">
              <template slot="formatter"> {{totalScore}} </template>
            </el-statistic>
          </el-form-item>
        </el-form>
        <!-- 表格栏 -->
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          size="medium"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
        >
          <el-table-column type="selection" width="60" />
          <el-table-column prop="questionId" label="编号" align="center" width="120" sortable />
          <el-table-column prop="questionDescription" label="题目描述" align="center"/>
          <el-table-column prop="choiceA" label="选项A" align="center" />
          <el-table-column prop="choiceB" label="选项B" align="center" />
          <el-table-column prop="choiceC" label="选项C" align="center" />
          <el-table-column prop="choiceD" label="选项D" align="center" />
          <el-table-column prop="diseaseType" label="所属病种" align="center"/>
          <el-table-column prop="answer" label="正确选项" align="center"/>
          <el-table-column prop="score" label="题目分数" align="center" width="80">
            <template slot-scope="scope">
              <el-input 
                v-model="scope.row.score" 
                placeholder="分数" 
                v-if="scope.row.scoreFlag"
                >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button size="mini" :disabled="scope.row.forbid" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <!-- <Pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="fetchData" /> -->
        <!-- 新增/编辑 弹出栏 -->
        <el-dialog
          title="编辑"
          :visible.sync="formVisible"
          width="35%"
          class="dialog-form"
          :before-close="handleClose"
        >
          <el-form
            ref="newQuestionForm"
            :model="newQuestionForm"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="问题描述：" prop="questionDescription">
              <el-input v-model="newQuestionForm.questionDescription" />
            </el-form-item>
            <el-form-item label="选项A：" prop="choiceA">
              <el-input v-model="newQuestionForm.choiceA" />
            </el-form-item>
            <el-form-item label="选项B：" prop="choiceB">
              <el-input v-model="newQuestionForm.choiceB" />
            </el-form-item>
            <el-form-item label="选项C：" prop="choiceC">
              <el-input v-model="newQuestionForm.choiceC" />
            </el-form-item>
            <el-form-item label="选项D：" prop="choiceD">
              <el-input v-model="newQuestionForm.choiceD" />
            </el-form-item>
            <el-form-item label="所属病种" prop="diseaseType">
              <el-select v-model="newQuestionForm.diseaseType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="正确答案" prop="answer">
              <el-input v-model="newQuestionForm.answer" />
            </el-form-item>
            <div class="footer-item">
              <el-button @click="cancleForm">取 消</el-button>
              <el-button type="primary" :disabled="isSubmit" @click="submitForm('newQuestionForm')">确 定</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!-- 导入数据 弹出栏 -->
        <el-dialog
          title="导入数据"
          :visible.sync="importVisible"
          width="20%"
        >
          <div class="upload-box">
            <span>选择文件：</span>
            <Upload :files-format="filesFormat">
              <i class="vue-dsn-icon-upload" />上传文件
            </Upload>
          </div>
          <div class="hints">TIP：请选择要导出数据的格式。</div>
          <span slot="footer">
            <el-button @click="cancleImport">取 消</el-button>
            <el-button type="primary" @click="confirmImport">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 导出数据 弹出栏 -->
        <el-dialog
          title="导出数据"
          :visible.sync="exportVisible"
          width="30%"
        >
          <div class="export-data">
            <el-button type="primary" @click="exportTable('xlsx')">EXCEL格式</el-button>
            <el-button type="primary" @click="exportTable('csv')">CSV格式</el-button>
            <el-button type="primary" @click="exportTable('txt')">TXT格式</el-button>
          </div>
          <div class="hints">TIP：请选择要导出数据的格式。</div>
        </el-dialog>
        <!-- 组卷弹出栏 -->
        <el-dialog
          title="组卷"
          :visible.sync="testVisible"
          width="35%"
          class="dialog-form"
          :before-close="handleTestClose"
        >
          <el-form
            ref="testForm"
            :model="testForm"
            :rules="testFormRules"
            label-width="100px"
          >
            <el-form-item label="试卷总分" >
              <el-input v-model="totalScore" disabled/>
            </el-form-item>
            <el-form-item label="试卷名称：" prop="title">
              <el-input v-model="testForm.title" />
            </el-form-item>
            <div class="footer-item">
              <el-button @click="cancleTestForm">取 消</el-button>
              <el-button type="primary" :disabled="isSubmit" @click="submitTest">确 定</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </div>
  </template>
  
  <script>
  import { getTableList } from '@/api'
  import { post,get } from '@/api/login'
  import excel from '@/utils/excel'
  import Pagination from '@/components/Pagination'
  import Upload from '@/components/Upload'
  import Hints from '@/components/Hints'
  
  export default {
    name: 'testManage',
    components: { Pagination, Upload ,Hints},
    data() {
      return {
        // 数据列表加载动画
        listLoading: true,
        // 查询列表参数对象
        listQuery: {
          questionId: '',
          questionDescription: '',
          diseaseType: '',
          // currentPage: 1,
          // pageSize: 10
        },
        // 新增/编辑提交表单对象
        newQuestionForm: {
          questionDescription: undefined,
          choiceA: undefined,
          choiceB: undefined,
          choiceC: undefined,
          choiceD: undefined,
          answer: undefined,
          diseaseType: ""
        },
        dialogForm: {

        },
        testForm: {
          title: ''
        },
        editFlag: false,
        options: [{
          value: '眼病',
          label: '眼病'
        }, {
          value: '呼吸道疾病',
          label: '呼吸道疾病'
        }, {
          value: '皮肤病',
          label: '皮肤病'
        }, {
          value: '牙齿疾病',
          label: '牙齿疾病'
        }, {
          value: '便秘',
          label: '便秘'
        }],
        // 数据总条数
        total: 0,
        // 表格数据数组
        tableData: [],
        beforeSearchData: [],
        // 多选数据暂存数组
        multipleSelection: [],
        // 新增/编辑 弹出框显示/隐藏
        formVisible: false,
        // 表单校验 trigger: ['blur', 'change'] 为多个事件触发
        formRules: {
          // name: [
          //   { required: true, message: '请输入姓名', trigger: 'blur' }
          // ],
          // phone: [
          //   { required: true, message: '请输入手机号', trigger: 'blur' },
          //   { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
          // ]
        },
        testFormRules: {
          title: [{required: true,message:'试卷标题不能为空',trigger: 'blur'}]
        },
        testVisible: false,
        // 防止多次连续提交表单
        isSubmit: false,
        // 导入数据 弹出框显示/隐藏
        importVisible: false,
        // 导出文件格式
        filesFormat: '.txt, .csv, .xls, .xlsx',
        // 导出数据 弹出框显示/隐藏
        exportVisible: false
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      //试卷总分
      totalScore(){
        let allScore = 0;
        for(let item of this.multipleSelection){
          allScore += parseInt(item.score)
        }
        return isNaN(allScore)?0:allScore;
      }
    },
    methods: {
      handleSelect(list, item){
        item.scoreFlag = !item.scoreFlag;
        if(!item.scoreFlag){
          this.totalScore -= item.score;
        }
        },
      // 多选操作
      handleSelectionChange(val) {
        // console.log(val);
        this.multipleSelection = val
      },  
      // 新建数据
      handleCreate() {
        this.formVisible = true
      },
      // 编辑数据
      handleEdit(index, row) {
        this.formVisible = true;
        this.editFlag = true;
        Object.keys(row).forEach((key)=> {
          this.newQuestionForm[key] = row[key];
        })
      },
      // 删除数据
      handleDelete(index, row) {  
        console.log(row);
        this.$confirm('此操作将删除选中数据, 是否继续?', '提  示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 此处删除接口
          get("/api/ques/deleteQues",{questionID:row.questionId}).then((res)=>{
            // 删除成功调用fetchData方法更新列表
            this.fetchData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 批量删除
      batchDelete() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '请先选择要删除的数据！',
            type: 'warning'
          })
        } else {
          this.handleDelete()
        }
      },
      // 新增/编辑弹出框 关闭时操作
      handleClose() {
        this.formVisible = false
        this.$refs.dialogForm.resetFields()
      },
      handleTestClose() {
        this.testVisible = false;
        this.$refs.testForm.resetFields();
      },
      cancleTestForm() {
        this.$refs.testForm.resetFields()
        this.testVisible = false
      },
      // 获取数据列表
      fetchData() {
        this.listLoading = true
        // 获取数据列表接口
        get("/api/ques/getAllQues").then(res => {
          this.total = res.length;
          res.forEach(item =>{
            item.score = 0
            item.scoreFlag = false
          });
          this.tableData = res;
          this.beforeSearchData = res;
          console.log(this.tableData);
          this.listLoading = false;
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 查询数据
      onSubmit() {
        // this.listQuery.currentPage = 1;
        let flag = true;
        let data = this.beforeSearchData;
        for(let key in this.listQuery){
          if(this.listQuery[key] !== ''){
            flag = false; 
          }
        }
        if(flag){
          this.tableData = data;
        }
        let newArr = [];
        let id = this.listQuery.questionId.toString() == '' ? undefined:this.listQuery.questionId.toString();
        let qD = this.listQuery.questionDescription == '' ?undefined:this.listQuery.questionDescription;
        let dT = this.listQuery.diseaseType;
        newArr = data.filter((item)=>{
            return item.questionId.toString().indexOf(id) > -1 || item.questionDescription.indexOf(qD) > -1 || item.diseaseType == dT
        })
        this.tableData = newArr;
      },
      // 导入数据
      handleImport() {
        this.importVisible = true
      },
      // 新增/编辑表单确认提交
      submitForm(formName) {
        if(!this.editFlag){
          this.$refs[formName].validate(valid => {
          if (valid) {
            // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
            // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
            post("/api/ques/addQues",this.newQuestionForm).then((res)=>{
              this.formVisible = false
              Object.keys(this.newQuestionForm).forEach(key => {
                this.newQuestionForm[key] = ''
              })
              this.fetchData();
            })
          } else {
            this.isSubmit = false
            return false
          }
        })
        }else{  
          this.$refs[formName].validate(valid => {
          if (valid) {
            // 此处添加 新增/编辑数据的接口 新增成功后调用fetchData方法更新列表
            // 先 this.isSubmit = true 接口返回成功后 再 this.isSubmit = false
            post("/api/ques/updateQues",this.newQuestionForm).then((res)=>{
              this.formVisible = false
              Object.keys(this.newQuestionForm).forEach(key => {
                this.newQuestionForm[key] = ''
              })
              this.fetchData();
              this.editFlag = false;
            })
          } else {
            this.isSubmit = false
            return false
          }
        })
        }
      },
      submitTest() {
        this.isSubmit = true;
        if(this.totalScore==0){
          this.$message({
            message: '请设置考试分数！',
            type: 'warning'
          })
          this.isSubmit = false;
        }else{
          let arr = [];
          this.multipleSelection.forEach(item => {
            let obj = {};
            obj.questionId = parseInt(item.questionId);
            obj.questionScore = item.score;
            arr.push(obj);
          })
          let data = {
            paper: {
              title: this.testForm.title,
              totalScore: this.totalScore
            },
            paperQuestions: arr
          }
          post("/api/addPaper",data).then(res => {
            this.isSubmit = false;
            this.testVisible = false;
          })
        }
      },
      // 新增/编辑表单取消提交
      cancleForm() {
        this.$refs.dialogForm.resetFields()
        this.formVisible = false
      },
      // 导入数据弹出栏 确认操作
      confirmImport() {
        // 此处添加 后台接收的接口，将导入的数据传给后台处理
        this.importVisible = false
      },
      // 导入数据弹出栏 取消操作
      cancleImport() {
        // 将导入的数据清空
        this.importVisible = false
      },
      // 导出数据--excle格式
      exportTable(type) {
        if (this.tableData.length) {
          const params = {
            header: ['编号', '选项A', '选项B', '选项C', '选项D', '问题描述', '正确选项', '所属病种'],
            key: ['questionId', 'choiceA', 'choiceB', 'choiceC', 'choiceD', 'questionDescription','answer', 'diseaseType'],
            data: this.tableData,
            autoWidth: true,
            fileName: '考试表格',
            bookType: type
          }
          excel.exportDataToExcel(params)
          this.exportVisible = false
        }
      },
      stateChange(row) {
        // 此处添加后台接口，成功后调用fetchData方法更新列表
      }
    }
  }
  </script>
  
  <style lang="less">
  .table-classic-wrapper {
    .el-card {
      min-height: 656px;
    }
    .control-btns {
      margin-bottom: 20px;
    }
    .search-form {
      padding-top: 18px;
      margin-bottom: 15px;
      background-color: #f7f8fb;
    }
    .el-table thead {
      font-weight: 600;
      th {
        background-color: #f2f3f7;
      }
    }
    .dialog-form {
      .el-input {
        width: 380px;
      }
      .footer-item {
        margin-top: 50px;
        text-align: right;
      }
    }
    .upload-box,
    .export-data {
      width: 300px;
      margin: 0 auto 30px;
    }
    .upload-box {
      width: 156px;
      .files-upload {
        color: #20a0ff;
      }
    }
    .hints {
      font-size: 12px;
      color: #aaa;
      text-align: center;
    }
    .score{
      margin-top: -12px;
      float: right;
    }
  }
  </style>
  