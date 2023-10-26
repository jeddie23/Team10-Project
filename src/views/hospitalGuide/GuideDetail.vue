<template>
  <div>
    <model-fbx :src="`static/${name}.fbx`" height="900" width="700"></model-fbx>
  </div>
</template>

<script>
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { ModelFbx,ModelGltf } from 'vue-3d-model';
export default {
  data() {
    return {
      container: "",
      name: ''
    };
  },
  components:{ModelFbx,ModelGltf},
  mounted() {
    console.log(this.$route);
    this.name = this.$route.params.name;
  },
  methods: {
    // 初始化
    init() {
    },
  },
};
</script>
<style>

</style>
