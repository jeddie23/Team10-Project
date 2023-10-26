<template>
  <div>
    <wei-photo
      class="weiPhoto"
      v-wei-photo:photo720="options"
      :panorama.sync="panorama"
      @viewChange="viewChange"
    >
            <wei-markers :config="marker1" >
            <el-button type="primary" icon="el-icon-top " @click="marker1Click('guideYingxiang')">影像学检查室</el-button>
            </wei-markers>
            <wei-markers :config="marker2" >
            <el-button type="primary" icon="el-icon-top " @click="marker2Click('guideMenzhen')">门诊室</el-button>
            </wei-markers>
            <wei-markers :config="marker3" >
            <el-button type="primary" icon="el-icon-top " @click="marker3Click('标记3')">输液室</el-button>
            </wei-markers>
    </wei-photo>
  </div>
</template>

<script>
export default {
  name: "guideAll",
  data() {
    return {
      panorama: "static/guide.png",
      options: {},
      marker1: { latitude: -0.9353696589281819, longitude: 0.12691756323909506 },
      marker2: { latitude: -1.0283885868665732, longitude: 4.840072422012185 },
      marker3: { latitude: -1.000882538630218, longitude: 1.3557003330706896 },
    };
  },
  methods: {
    viewChange(e) {
      console.log(e.latitude,e.longitude);
    },
    marker1Click(path) {
      this.$router.push({name:path})
    },
    marker2Click(path) {
      this.$router.push({name:path})
    },
    marker3Click(con) {
      alert("点击了" + con);
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