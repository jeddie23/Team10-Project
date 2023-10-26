<template>
    <div>
      <wei-photo
        class="weiPhoto"
        v-wei-photo:photo720="options"
        :panorama.sync="panorama"
        @viewChange="viewChange"
      >
              <wei-markers :config="marker1" >
              <el-button type="primary" icon="el-icon-top " @click="jump3D('surgery')">进入病房</el-button>
              </wei-markers>
              <wei-markers :config="marker2" >
              <el-button type="primary" icon="el-icon-top " @click="marker2Click('guideMenzhen')">返回门诊室</el-button>
              </wei-markers>

      </wei-photo>
    </div>
  </template>
  
  <script>
  export default {
    name: "GuideZoulang",
    data() {
      return {
        panorama: "static/zoulang.jpg",
        options: {},
        marker1: { latitude: -0.3334174737358788 , longitude: 1.7614134130430328 },
        marker2: { latitude: -0.29407538414668233, longitude: 4.590837707331016 },
      };
    },
    methods: {
      viewChange(e) {
        console.log(e.latitude,e.longitude);
      },
      jump3D(id) {
        this.$router.push({ name: 'GuideDetail', params: { name:id }})
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