<template>
  <div>
    <el-card shadow="always">
      <!-- Control Bar -->
      <div class="control-btns">
        <el-card class="control">
          <el-button type="primary" @click="handleCreate">Add User</el-button>
        </el-card>
      </div>
      <!-- Search Bar -->
      <!-- Table Bar -->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        size="medium"
      >
        <el-table-column prop="userId" label="User ID" align="center" />
        <el-table-column prop="userName" label="User Name" align="center" />
        <el-table-column prop="userEmail" label="User Email" align="center" />
        <el-table-column
          prop="userPhoneNumber"
          label="User Phone Number"
          align="center"
        />
        <el-table-column prop="userRole" label="User Role" align="center" />
        <el-table-column prop="userPassword" label="User Password" align="center" />
        <el-table-column label="Action" align="center" width="200">
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
      <!-- Check Paper Pop-up -->
      <el-dialog
        :title="isEdit ? 'Edit User' : 'Add User'"
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
          <el-form-item label="User Nickname:" prop="userName">
            <el-input v-model="newUserForm.userName" />
          </el-form-item>
          <el-form-item label="User Password:" prop="password">
            <el-input v-model="newUserForm.password" />
          </el-form-item>
          <el-form-item label="User Email:" prop="email">
            <el-input v-model="newUserForm.email" />
          </el-form-item>
          <el-form-item label="User Role:" prop="role">
            <el-select v-model="newUserForm.role" placeholder="Please select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="User Phone Number:" prop="phoneNumber">
            <el-input v-model="newUserForm.phoneNumber" />
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
  name: "userList",
  data() {
    return {
      options: [{
        value: 'student',
        label: '学生'
      },{
        value: 'administrator',
        label: '管理员'
      }],
      tableData: [],
      listLoading: false,
      total: "",
      title: "",
      // 新增/编辑提交表单对象
      newUserForm: {
        userName: "",
        password: "",
        email: "",
        role: "",
        phoneNumber: "",
      },
      userId: '',
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
        this.userId=row.userId;
      },
    cancleUserForm() {
      this.$refs.newUserForm.resetFields();
      this.userVisible = false;
    },
    handleEdit(index,row) {
      this.userVisible = true;
      this.isEdit = true;
      const {userEmail,userId,userName,userPassword,userPhoneNumber,userRole} = row;
      this.newUserForm = {
        userName: userName,
        password: userPassword,
        email: userEmail,
        role: userRole,
        phoneNumber: userPhoneNumber
      }
      this.userId = userId;
    },
    handleDelete() {
      get("/api/user/deleteUserByID",{userID:this.userId}).then(res=>{
        this.$message({
            message: "删除用户成功",
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
      get("/api/user/getUsers")
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
        post("/api/user/register?"+qs.stringify(data)).then((res) => {
          console.log(res);
          this.$message({
            message: "新增用户成功",
            type: "success",
          });
          this.$refs.newUserForm.resetFields();
          this.isSubmit = false;
          this.userVisible = false;
        }).catch(()=>{this.isSubmit = false;});
      } else {
        const { userName, password, email, role, phoneNumber } = this.newUserForm;
        let data = {
          userId: this.userId,
          userName: userName,
          userPassword: password,
          userEmail:email,
          userRole: role,
          userPhoneNumber: phoneNumber,
        };
        this.isSubmit = true;
        post("/api/user/updateUser",data).then((res) => {
          console.log(res);
          this.$message({
            message: "编辑用户成功",
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