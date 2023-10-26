<template>
    <div>
      <el-card shadow="always">
        <!-- 操作栏 -->
        <div class="control-btns">
          <el-card class="control">
            <el-button type="primary" @click="handleCreate">新增药品</el-button>
          </el-card>
        </div>
        <!-- 查询栏 -->
        <!-- 表格栏 -->
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
          size="medium"
        >
          <el-table-column prop="medicineId" label="药品id" align="center" />
          <el-table-column prop="medicineName" label="药品名称" align="center" />
          <el-table-column prop="medicineDescription" label="药品描述" align="center" />
          <el-table-column prop="money" label="药品单价" align="center" />
          <el-table-column prop="storage" label="药品储量" align="center" />
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete()"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 增加药品弹出 -->
        <el-dialog
          :title="isEdit ? '编辑药品' : '新增药品'"
          :visible.sync="userVisible"
          width="30%"
          class="dialog-form"
          :before-close="cancleUserForm"
        >
          <el-form
            ref="newUserForm"
            :model="newUserForm"
            :rules="formRules"
            label-width="120px"
          >
            <el-form-item label="药品描述：" prop="medicineDescription">
              <el-input v-model="newUserForm.medicineDescription" />
            </el-form-item>
            <el-form-item label="药物名称：" prop="medicineName">
              <el-input v-model="newUserForm.medicineName" />
            </el-form-item>
            <el-form-item label="药物单价：" prop="money">
              <el-input v-model="newUserForm.money" />
            </el-form-item>
            <el-form-item label="药物储量：" prop="storage">
              <el-input v-model="newUserForm.storage" />
            </el-form-item>
            <div class="footer-item">
              <el-button @click="cancleUserForm">取 消</el-button>
              <el-button
                type="primary"
                :disabled="isSubmit"
                @click="submitForm('newUserForm')"
                >确 定</el-button
              >
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </div>
  </template>
  
  <script>
  import { post, get } from "@/api/login";
  import qs from "qs";
  export default {
    data() {
      return {
        tableData: [],
        listLoading: false,
        total: "",
        title: "",
        // 新增/编辑提交表单对象
        newUserForm: {
          medicineDescription: "",
          medicineName: "",
          money: "",
          storage: "",
        },
        medicineId: '',
        userVisible: false,
        formRules: {},
        isEdit: false,
        isSubmit: false
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      handleCurrentChange(row) {
          this.medicineId=row.medicineId;
        },
      cancleUserForm() {
        this.$refs.newUserForm.resetFields();
        this.userVisible = false;
      },
      handleEdit(index,row) {
        this.userVisible = true;
        this.isEdit = true;
        const {medicineId,medicineDescription,medicineName,money,storage} = row;
        this.newUserForm = {
            medicineDescription,
            medicineName,
            money,
            storage
        }
        this.medicineId = medicineId;
      },
      handleDelete() {
        get("/api/deleteMedicine",{medicineID:this.medicineId}).then(res=>{
          this.$message({
              message: "删除药品成功",
              type: "warning",
            });
            this.fetchData();
        })
      },
      handleCreate() {
        this.userVisible = true;
        this.isEdit = false;
      },
      fetchData() {
        this.listLoading = true;
        // 获取数据列表接口
        get("/api/allMedicine")
          .then((res) => {
            this.total = res.length;
            this.tableData = res;
            this.listLoading = false;
          })
          .catch(() => {
            this.listLoading = false;
          });
      },
      submitForm(formName) {
        if (!this.isEdit) {
          const { userName, password, email, role, phoneNumber } =
            this.newUserForm;
          let data = {
            userName,
            password,
            email,
            role,
            phoneNumber,
          };
          this.isSubmit = true;
          post("/api/addMedicine",this.newUserForm).then((res) => {
            this.$message({
              message: "新增药品成功",
              type: "success",
            });
            this.$refs.newUserForm.resetFields();
            this.isSubmit = false;
            this.userVisible = false;
            this.fetchData();
          }).catch(()=>{this.isSubmit = false;});
        } else {
          const { userName, password, email, role, phoneNumber } = this.newUserForm;
          let data = {
            medicineId: this.medicineId,
            userName: userName,
            userPassword: password,
            userEmail:email,
            userRole: role,
            userPhoneNumber: phoneNumber,
          };
          this.isSubmit = true;
          post("/api/updateMedicine",{...this.newUserForm,medicineId:this.medicineId}).then((res) => {
            this.$message({
              message: "编辑药品成功",
              type: "success",
            });
            this.$refs.newUserForm.resetFields();
            this.isSubmit = false;
            this.userVisible = false;
            this.fetchData();
          }).catch(()=>{this.isSubmit = false;});
        }
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .control {
    margin-bottom: 15px;
  }
  .footer-item {
    margin-top: 50px;
    text-align: right;
  }
  </style>