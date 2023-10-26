<template>
  <div>
    <el-card shadow="always">
      <!-- 操作栏 -->
      <div class="control-btns">
        <el-card class="control">
          <el-button type="primary" @click="handleCreate"
            >新增检查项目</el-button
          >
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
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-alert
                    title="点击按钮查看宠物指标"
                    type="info">
                </el-alert>
                <el-form-item>
                    <el-button @click="animalInfo('猫',props.row.itemId)" type="primary">猫</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="animalInfo('狗',props.row.itemId)" type="primary">狗</el-button>
                </el-form-item>
                <el-descriptions title="宠物指标">
                    <el-descriptions-item label="正常指标下限">{{ standardData.lowerLimit ||'暂无数据请添加' }}</el-descriptions-item>
                    <el-descriptions-item label="正常指标上限">{{ standardData.upperLimit ||'暂无数据请添加'}}</el-descriptions-item>
                </el-descriptions>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
          prop="itemId"
          label="检查项目id"
          align="center"
          width="100"
        />
        <el-table-column
          prop="itemDepartment"
          label="检查项目部门"
          align="center"
          width="200"
        />
        <el-table-column
          prop="itemDescription"
          label="检查项目描述"
          align="center"
        />
        <el-table-column
          prop="money"
          label="检查项目价格"
          align="center"
          width="160"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="standardVisible = true"
              >新增生理指标</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDelete()"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 增加检查项目弹出 -->
      <el-dialog
        :title="isEdit ? '编辑检查项目' : '新增检查项目'"
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
          <el-form-item label="检查项目部门：" prop="itemDepartment">
            <el-input v-model="newUserForm.itemDepartment" />
          </el-form-item>
          <el-form-item label="检查项目描述：" prop="itemDescription">
            <el-input v-model="newUserForm.itemDescription" />
          </el-form-item>
          <el-form-item label="检查项目价格：" prop="money">
            <el-input v-model="newUserForm.money" />
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
      <!-- 增加检查标准弹出 -->
      <el-dialog
        :title="'增加指标'"
        :visible.sync="standardVisible"
        width="30%"
        class="dialog-form"
        :before-close="cancleStandardForm"
      >
        <el-form
          ref="standardUserForm"
          :model="newStandardForm"
          :rules="formRules"
          label-width="120px"
        >
          <el-form-item label="宠物类型：" prop="animalType">
            <el-select v-model="newStandardForm.animalType" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="正常指标下限：" prop="lowerLimit">
            <el-input v-model="newStandardForm.lowerLimit" />
          </el-form-item>
          <el-form-item label="正常指标上限：" prop="upperLimit">
            <el-input v-model="newStandardForm.upperLimit"/>
          </el-form-item>
          <div class="footer-item">
            <el-button @click="cancleStandardForm">取 消</el-button>
            <el-button
              type="primary"
              :disabled="isSubmit"
              @click="submitStandardForm"
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
      options: [
        {
          value: "猫",
          label: "猫",
        },
        {
          value: "狗",
          label: "狗",
        },
      ],
      tableData: [],
      standardData: {},
      standardVisible: false,
      listLoading: false,
      total: "",
      title: "",
      // 新增/编辑提交表单对象
      newUserForm: {
        itemDescription: "",
        itemDepartment: "",
        money: "",
        needCompare: 1,
      },
      newStandardForm: {
        animalType: "",
        lowerLimit: "",
        upperLimit: "",
      },
      itemId: "",
      userVisible: false,
      formRules: {},
      isEdit: false,
      isSubmit: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    animalInfo(type,itemId){
        get("/api/standard/getSpecificStandard",{animalType:type,itemId}).then(res=>{
            console.log(res);
            this.standardData = res
        })
    },
    handleCurrentChange(row) {
      this.itemId = row.itemId;
    },
    cancleUserForm() {
      this.$refs.newUserForm.resetFields();
      this.userVisible = false;
    },
    cancleStandardForm() {
      this.$refs.standardUserForm.resetFields();
      this.standardVisible = false;
    },
    handleEdit(index, row) {
      this.userVisible = true;
      this.isEdit = true;
      const { itemId, itemDescription, itemDepartment, money } = row;
      this.newUserForm = {
        itemDescription,
        itemDepartment,
        money,
      };
      this.itemId = itemId;
    },
    handleDelete() {
      get("/api/item/deleteItemByID", { ItemID: this.itemId }).then((res) => {
        this.$message({
          message: "删除检查项目成功",
          type: "warning",
        });
        this.fetchData();
      });
    },
    handleCreate() {
      this.userVisible = true;
      this.isEdit = false;
    },
    fetchData() {
      this.listLoading = true;
      // 获取数据列表接口
      get("/api/item/getItems")
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
        this.isSubmit = true;
        console.log(this.newUserForm);
        post("/api/item/addItem", this.newUserForm)
          .then((res) => {
            this.$message({
              message: "新增检查项目成功",
              type: "success",
            });
            this.$refs.newUserForm.resetFields();
            this.isSubmit = false;
            this.userVisible = false;
            this.fetchData();
          })
          .catch(() => {
            this.isSubmit = false;
          });
      } else {
        this.isSubmit = true;
        post("/api/item/updateItem", {
          ...this.newUserForm,
          itemId: this.itemId,
        })
          .then((res) => {
            this.$message({
              message: "编辑检查项目成功",
              type: "success",
            });
            this.$refs.newUserForm.resetFields();
            this.isSubmit = false;
            this.userVisible = false;
            this.fetchData();
          })
          .catch(() => {
            this.isSubmit = false;
          });
      }
    },
    submitStandardForm() {
        this.isSubmit = true;
        post("/api/standard/addStandard",{...this.newStandardForm,itemId:this.itemId}).then(res=>{
            this.isSubmit = false;
            this.$message({
              message: "新增指标",
              type: "success",
            });
            this.standardVisible = false
            this.$refs.standardUserForm.resetFields();
        })
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