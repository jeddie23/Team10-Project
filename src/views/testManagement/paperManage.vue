<template>
    <div class="table-classic-wrapper">
      <el-card shadow="always">
        <!-- 操作栏 -->
        <div class="control-btns">
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-button type="primary" @click="handleCreate">新增考试</el-button>
        </div>
        <!-- 查询栏 -->
        <el-form
          ref="searchForm"
          :inline="true"
          :model="listQuery"
          label-width="90px"
          class="search-form"
        >
          <el-form-item label="试卷编号">
            <el-input v-model="listQuery.questionId" placeholder="编号" />
          </el-form-item>
          <!-- <el-form-item label="题目描述">
            <el-input v-model="listQuery.questionDescription" placeholder="输入题目描述" />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
          <el-table-column prop="paperId" label="编号" align="center" width="120" sortable />
          <el-table-column prop="title" label="试卷名称" align="center"/>
          <el-table-column prop="totalScore" label="试卷总分" align="center" />
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="checkDetail(scope.$index, scope.row)">查看试卷</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <!-- <Pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="fetchData" /> -->
        <!-- 新增考试 弹出栏 -->
        <el-dialog
          title="新增考试"
          :visible.sync="formVisible"
          width="35%"
          class="dialog-form"
          :before-close="handleClose"
        >
          <el-form
            ref="newTestForm"
            :model="newTestForm"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="所选试卷id" prop="paperId">
              <el-input  disabled v-model="newTestForm.paperId" />
            </el-form-item>
            <el-form-item label="所选试卷名称:">
              {{newPaperTitle}}
            </el-form-item>
            <el-form-item label="考试开始时间:" prop="startTime">
              <el-date-picker
                v-model="newTestForm.startTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="考试结束时间:" prop="startTime">
              <el-date-picker
                v-model="newTestForm.endTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <p>已选学生:</p>
              <el-tag
                v-for="item in selectedTags"
                :key="item.id"
                :type="item.type"
                closable
                @close="deleteUser(item)">
                {{item.name}}
              </el-tag>
            </el-form-item>
            <el-form-item>
              <p>所有学生:</p>
              <el-tag
                v-for="item in allUserTags"
                :key="item.name"
                :type="item.type"
                @click="select(item)">
                {{item.name}}
              </el-tag>
            </el-form-item>
            <div class="footer-item">
              <el-button @click="cancleForm">取 消</el-button>
              <el-button type="primary" :disabled="isSubmit" @click="submitForm('newTestForm')">确 定</el-button>
            </div>
          </el-form>
        </el-dialog>
        <!-- 查看试卷弹出 -->
        <el-dialog
          title="新增考试"
          :visible.sync="paperVisible"
          width="40%"
          class="dialog-form"
          :before-close="cancleTestForm"
        >
          <el-form
            ref="paperDetail"
            :model="paperDetail"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="问题描述：" prop="title">
              <el-input disabled v-model="paperDetail.title" />
            </el-form-item>
            <el-form-item label="题目数量：" prop="choiceA">
              {{ paperDetail.num }}
            </el-form-item>
            <el-form-item>
              <el-tag
                v-for="item in paperDetail.question"
                :key="item.questionId"
                type=""
                effect="plain"
                @click="clickItem(item)">
                {{ '题目id'+item.questionId }}
              </el-tag>
            </el-form-item>
            <el-form-item>
                <div>
                  <span class="detail">题目描述: </span>
                  <span style="font-size: 16px;">{{ (questionDetail.questionDescription || ' 点击题目id查看') }}</span>
                </div>
                <div>
                  <span class="detail">题目分值: </span>
                  <span style="font-size: 16px;">{{ (questionDetail.questionScore || ' 点击题目id查看') }}</span>
                </div>
                <div>
                  <span class="detail">所属病种: </span>
                  <span style="font-size: 16px;">{{ (questionDetail.diseaseType || ' 点击题目id查看') }}</span>
                </div>
                <div>
                  <span class="detail">正确答案: </span>
                  <span style="font-size: 16px;">{{ (questionDetail.answer || ' 点击题目id查看') }}</span>
                </div>
            </el-form-item>
            <div class="footer-item">
              <el-button @click="cancleTestForm">取 消</el-button>
              <el-button type="primary" :disabled="isSubmit" @click="submitForm('newTestForm')">确 定</el-button>
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
    components: { Pagination, Upload },
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
        newTestForm: {
          paperId: '',
          startTime: '',
          endTime: '',
        },
        newPaperTitle: '',
        paperDetail: {},
        questionDetail:{},
        // 数据总条数
        total: 0,
        // 表格数据数组
        tableData: [],
        beforeSearchData: [],
        selectedTags: [],
        allUserTags: [],
        // 多选数据暂存数组
        multipleSelection: [],
        // 新增/编辑 弹出框显示/隐藏
        formVisible: false,
        paperVisible: false,
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
        // 防止多次连续提交表单
        isSubmit: false,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSelect(list,item){
        const {title,paperId} = item
        this.newPaperTitle = title;
        this.newTestForm.paperId = paperId;
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      select(item){
        if(!this.selectedTags.includes(item)){
          this.selectedTags.push(item);
        }
      },
      deleteUser(item){
        console.log(item);
        let arr = this.selectedTags
        this.selectedTags = arr.filter((tag)=>{
          return tag.id != item.id;
        })
      },
      // 新建数据
      handleCreate() {
        this.formVisible = true
        get("/api/user/getStudents").then((res) => {
          for(let item of res){
            let obj = {};
            obj.type = 'info';
            obj.name = item.userName;
            obj.id = item.userId;
            this.allUserTags.push(obj);
          }
        })
      },
      // 编辑数据
      checkDetail(index, row) {
        this.paperVisible = true;
        this.paperDetail = {
          title: row.title,
          question: row.answer,
          num: row.answer.length
        }

      },
      clickItem(item){
        console.log(item);
        this.questionDetail = item;
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
        this.$refs.newTestForm.resetFields()
      },
      // 获取数据列表
      fetchData() {
        this.listLoading = true
        // 获取数据列表接口
        get("/api/getPaperList").then(res => {
          this.total = res.length;
          let data = [];
          for(let item of res){
            let obj = {...item.paper,answer:item.paperQuestionDTOS}
            data.push(obj);
          }
          this.tableData = data;
          this.beforeSearchData = data;
          this.listLoading = false;
        }).catch(() => {
          this.listLoading = false
        })
      },
      // 查询数据
      onSubmit() {
        // this.listQuery.currentPage = 1;
        // let flag = true;
        // let data = this.beforeSearchData;
        // for(let key in this.listQuery){
        //   if(this.listQuery[key] !== ''){
        //     flag = false; 
        //   }
        // }
        // if(flag){
        //   this.tableData = data;
        // }
        // let newArr = [];
        // let id = this.listQuery.questionId.toString() == '' ? undefined:this.listQuery.questionId.toString();
        // let qD = this.listQuery.questionDescription == '' ?undefined:this.listQuery.questionDescription;
        // let dT = this.listQuery.diseaseType;
        // newArr = data.filter((item)=>{
        //     return item.questionId.toString().indexOf(id) > -1 || item.questionDescription.indexOf(qD) > -1 || item.diseaseType == dT
        // })
        // this.tableData = newArr;
      },
      // 新增/编辑表单确认提交
      submitForm(formName) {
        this.isSubmit = true;
        let data = {};
        data.exam = this.newTestForm;
        let arr = [];
        for(let item of this.selectedTags){
          arr.push(item.id);
        }
        data.userIdList = arr;
        post("/api/addExam",data).then((res)=>{
          this.isSubmit = false;
          this.formVisible = false;
          this.$refs.newTestForm.resetFields();
          this.selectedTags = [];
        })
      },
      // 新增/编辑表单取消提交
      cancleForm() {
        this.$refs.newTestForm.resetFields()
        this.formVisible = false
      },
      cancleTestForm() {
        this.$refs.paperDetail.resetFields();
        this.paperVisible = false;
      },
      // 列表中婚姻状况栏，状态值改变时，调用
      selectChange(row) {
        // 此处添加后台接口，成功后调用fetchData方法更新列表
      },
      // 列表中禁止编辑栏，状态值改变时，调用
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
    .detail{
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  </style>
  