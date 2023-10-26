<template>
    <div>
      <div class="pic">
        <div style="height:30%;background-color:white;">
          <div class="fl" style="width:25%;height: 70%;">
            <el-image src="static/前台.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">前台区</el-button>
          </div>
          <div class="fl" style="width:20%;height: 60%; margin-left: 20px;">
            <el-image src="static/dangan.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">档案室</el-button>
          </div>
          <div class="fl" style="width:22%;height: 80%; margin-left: 30px;">
            <el-image src="static/menzhen.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">门诊室</el-button>
          </div>
          <div class="fr" style="width:22%;height: 80%; margin-left: 30px; margin-top: 10px;">
            <el-image src="static/mianyi.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">免疫室</el-button>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div style="height:30%;margin-top: 50px;background-color:white;">
          <div class="fl" style="width:16%;height: 80%;">
            <el-image src="static/huayan.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">化验室</el-button>
          </div>
          <div class="fl" style="width:16%;height: 80%; margin-left: 30px; margin-top: 10px;">
            <el-image src="static/zhiliao.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">治疗室</el-button>
          </div>
          <div class="fl" style="width:20%;height: 80%; margin-left: 10px;">
            <el-image src="static/yingxiang.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">影像学检查室</el-button>
          </div>
          <div class="fl" style="width:20%;height: 80%; margin-left: 10px;">
            <el-image src="static/yaofang.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">药房</el-button>
          </div>
          <div class="fr" style="width:20%;height: 80%; margin-left: 10px;">
            <el-image src="static/shuye.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;" @click="jumpPic('GuideShuye')">输液室</el-button>
          </div>
          <div style="clear: both;"></div>
        </div>
        <div style="height:30%;margin-top: 40px; background-color:white;">
          <div class="fl" style="width:20%;height: 80%;">
            <el-image src="static/shoushuzhunbei.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">手术准备室</el-button>
          </div>
          <div class="fl" style="width:20%;height: 80%; margin-left: 10px;">
            <el-image src="static/shoushu.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;" @click="jump3D('surgery')">手术室</el-button>
          </div>
          <div class="fl" style="width:30%;height: 70%; margin-left: 30px;">
            <el-image src="static/zhuyuan.jpg" @click="jump3D('work')"></el-image>
            <el-button type="text" style="margin: auto;display: block;">住院部</el-button>
          </div>
          <div class="fr" style="width:20%;height: 80%; margin-left: 10px;">
            <el-image src="static/pouxi.jpg"></el-image>
            <el-button type="text" style="margin: auto;display: block;">病理剖检室</el-button>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import GuideDetail from './GuideDetail.vue'

  export default {
    name:'generalGuide',
    components: {GuideDetail},
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      // 初始化
      jump3D(id) {
        this.$router.push({ name: 'GuideDetail', params: { name:id }})
      },
      jumpPic(path) {
        this.$router.push({ name: path,})
      }
    }
  }
  </script>
  <style>
  .pic{
    background-color: yellow;
    width: 90%;
    height: 800px;
    overflow: hidden;
    margin: auto;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  </style>
  