<template>
  <div>
    <el-card shadow="always">
      <!-- Operation Bar -->
      <div class="control-btns">
        <el-card class="control">
          <el-button type="primary" @click="handleCreate">Add Drug</el-button>
        </el-card>
      </div>
      <!-- Search Bar -->
      <!-- Table Column -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        size="medium"
      >
        <el-table-column prop="medicine_id" label="Drug ID" align="center" />
        <el-table-column prop="medicine_name" label="Drug Name" align="center" />
        <el-table-column prop="medicine_description" label="Drug Description" align="center" />
        <el-table-column prop="money" label="Drug Unit Price" align="center" />
        <el-table-column prop="storage" label="Drug Stock" align="center" />
        <el-table-column label="Operation" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete()"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- Add Drug Popup -->
      <el-dialog
        :title="isEdit ? 'Edit Drug' : 'Add Drug'"
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
          <el-form-item label="Drug Description:" prop="medicine_description">
            <el-input v-model="newUserForm.medicine_description" />
          </el-form-item>
          <el-form-item label="Drug Name:" prop="medicine_name">
            <el-input v-model="newUserForm.medicine_name" />
          </el-form-item>
          <el-form-item label="Drug Unit Price:" prop="money">
            <el-input v-model="newUserForm.money" />
          </el-form-item>
          <el-form-item label="Drug Stock:" prop="storage">
            <el-input v-model="newUserForm.storage" />
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleUserForm">Cancel</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitForm('newUserForm')"
              >Confirm</el-button
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
          medicine_description: "",
          medicine_name: "",
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
          console.log(row);
          this.medicineId=row.medicine_id;
        },
      cancleUserForm() {
        this.$refs.newUserForm.resetFields();
        this.userVisible = false;
      },
      handleEdit(index,row) {
        this.userVisible = true;
        this.isEdit = true;
        const {medicineId,medicine_description,medicine_name,money,storage} = row;
        this.newUserForm = {
            medicine_description,
            medicine_name,
            money,
            storage
        }
        this.medicineId = row.medicine_id;
      },
      handleDelete() {
        get("http://20.2.233.129:9001/apis/medical_resource/deleteMedicine",{medicine_id:this.medicineId}).then(res=>{
          this.$message({
              message: "Delete medicine successfully",
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
        get("http://20.2.233.129:9001/apis/medical_resource/allMedicine")
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
          post("http://20.2.233.129:9001/apis/medical_resource/addMedicine",this.newUserForm).then((res) => {
            this.$message({
              message: "Added drug successfully",
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
          console.log(this.medicineId);
          post("http://20.2.233.129:9001/apis/medical_resource/updateMedicine",{...this.newUserForm,medicine_id:this.medicineId}).then((res) => {
            this.$message({
              message: "Edit drug successfully",
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