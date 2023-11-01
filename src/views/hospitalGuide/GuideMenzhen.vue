<template>
    <div>
      <wei-photo
        class="weiPhoto"
        v-wei-photo:photo720="options"
        :panorama.sync="panorama"
        @viewChange="viewChange"
      >
              <wei-markers :config="marker1" >
              <el-button type="primary" icon="el-icon-top " @click="marker1Click('guideAll')">front desk</el-button>
              </wei-markers>
              <wei-markers :config="marker2" >
              <el-button type="primary" icon="el-icon-top " @click="marker2Click('guideZoulang')">Outpatient corridor</el-button>
              </wei-markers>

      </wei-photo>
    </div>
  </template>
  
  <script>
  export default {
    name: "GuideMenzhen",
    data() {
      return {
        panorama: "static/menzhen.png",
        options: {},
        marker1: { latitude: -0.47872247367998, longitude: 0.9027966356723138 },
        marker2: { latitude: -0.3663297354901931, longitude: 5.418655895720558 },
      };
    },
    methods: {
      viewChange(e) {
        console.log(e);
      },
      marker1Click(path) {
        this.$router.push({name:path})
      },
      marker2Click(path) {
        this.$router.push({name:path})
      },
    },
    created() {},
    mounted() {
      console.log(this.photo720);
      //this.photo720 为组件自定义指令的变量,针对全景组件的操作通过这个变量进行，可以随意命名，
      //当需要在一个.vue文件里展示两个全景组件的时候，两个组件的变量名称不可以重复
      //它将会将实例化后对象赋值到你当前的组件作用域里
    },
  };
  </script>
  
  <style>
  .weiPhoto {
    width: 80vw;
    height: 80vh;
  }
  </style>