<template>
  <div>
    <Hints>
      <template slot="hintName">宠物项目检查内容与指标</template>
      <template slot="hintInfo">
        <p>学生进入不同科室学习不同检查项目</p>
      </template>
    </Hints>
    <el-button-group class="buttonStyle">
      <el-button type="primary" icon="el-icon-info" class="button" @click="getInfo('放射室')">放射室</el-button>
      <el-button type="primary" icon="el-icon-info" class="button" @click="getInfo('超声科')">超声科</el-button>
      <el-button type="primary" icon="el-icon-info" class="button" @click="getInfo('眼科')">眼科</el-button>
      <el-button type="primary" icon="el-icon-info" class="button" @click="getInfo('口腔科')">口腔科</el-button>
      <el-button type="primary" icon="el-icon-info" class="button" @click="getInfo('皮肤科')">皮肤科</el-button>
    </el-button-group>
    <el-descriptions class="margin-top" :title="dept + '检查项目'" :column="3" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          科室名称
        </template>
        {{ dept }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          检查项目描述
        </template>
        {{ data[0]?.itemDescription }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-money"></i>
          检查价格
        </template>
        {{ data[0]?.money }}
      </el-descriptions-item>
      <template v-for="(item, index) in data">
        <el-descriptions-item :key="index">
          <template slot="label">
            <i class="el-icon-tickets"></i>
            宠物种类
          </template>
          <el-tag size="small">{{ item.animalType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item :key="index" :span="2">
          <template slot="label">
            <i class="el-icon-office-building"></i>
            宠物正常指标范围:
          </template>
          {{ item.lowerLimit + '~~' + item.upperLimit }}
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script>
import { post, get } from "@/api/login"
import Hints from '@/components/Hints/index.vue'
export default {
  data() {
    return {
      dept: '放射室',
      data: []
    }
  },
  components: { Hints },
  created() {
    this.getInfo('放射室');
  },
  methods: {
    getInfo(department) {
      this.dept = department;
      get("/api/standard/getStandardsByDept", { deptName: department }).then(res => {
        console.log(res);
        this.data = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
.buttonStyle .button {
  margin-left: 20px;
}
</style>