<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-result title="前台" subTitle="选择前台进行学习">
          <template slot="icon">
            <el-image
              src="https://img.tukuppt.com/png_preview/02/90/43/WVyozLG4o2.jpg%21/fw/780"
              class="pic"
            ></el-image>
          </template>
          <template slot="extra">
            <el-button type="primary" size="medium" @click="jump('frontStage')">确认</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :span="8">
        <el-result title="医助" subTitle="选择医助进行学习">
          <template slot="icon">
            <el-image
              src="https://p2.itc.cn/q_70/images03/20220712/299b5578beef4e2b9042ba0865b67e77.png"
              class="pic"
            ></el-image>
          </template>
          <template slot="extra">
            <el-button type="primary" size="medium" @click="jump('docAssistant')">确认</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :span="8">
        <el-result title="兽医" subTitle="选择兽医进行学习">
          <template slot="icon">
            <el-image
              src="https://t7.baidu.com/it/u=221653475,1890939012&fm=193"
              class="pic"
            ></el-image>
          </template>
          <template slot="extra">
            <el-button type="primary" size="medium" @click="jump('animalDoc')">确认</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'cosplayStudy',
    data() {
        return {

        }
    },
    methods: {
        jump(path){
            this.$router.push({name: path})
        }
    }
};
</script>

<style lang="less" scoped>
.pic{
    width:300px;
    height: 300px;
}
</style>
