<template>
    <!-- 三维画布 -->
    <div ref="draw" class="draw" />
  </template>
   
  <script>
  import * as THREE from 'three'; // 三维
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 控制器
   
  export default {
    name: 'Draw', // 三维画布
    props: {
      // // 传入模型函数
      initLoader: {
        type: [Function],
      },
      // 传入光源数组
      lightlist: {
        type: [Array],
        default: () => {
          return [
            {
              type: 'AmbientLight', // 光的类型
              color: 0xffffff, // 光的颜色
              intensity: 1, // 光照强度
              posiy: [0, 0, 0], // 光照位置
            },
          ];
        },
      },
      // 传入相机对象
      sightline: {
        type: [Object],
        default: () => {
          return {
            scale: 200, // 视线比例
            type: 'OrthographicCamera', // 相机的类型
            posiy: [200, 300, 200], // 相机位置
          };
        },
      },
      // 传入渲染对象
      strain: {
        type: [Object],
        default: () => {
          return {
            color: '#FFFFFF', // 背景颜色
            Encoding: false, // 色彩空间
            shadow: false, // 渲染阴影
          };
        },
      },
      // 是否开启鼠标控制
      orbit: {
        type: [Boolean],
        default: true,
      },
    },
    data() {
      return {
        scene: null, // 场景对象Scene
        camera: null, // 相机对象
        draw: null, // 节点对象
        renderer: null, // 渲染器对象
        controls: null, // 控件对象
        movetype: -1, // 鼠标事件，默认-1（0点击，1移动
        isclick: null, // 判断鼠标状态
      };
    },
    mounted() {
      // 初始化渲染
      this.init();
      // 初始化控制
      this.orbitControls();
      // 条添加事件
      this.addmeth();
      // 设置动画
      this.tweenUpdate();
    },
    methods: {
      init() {
        //  初始化场景对象
        this.initScene();
        // 初始化模型
        this.initLoader();
        // 初始化光源
        this.initLight();
        // 初始化相机
        this.initCamera();
        // 初始化渲染对象
        this.initRenderer();
        // 渲染操作
        this.animation();
      },
      // 初始化场景对象
      initScene() {
        // 初始化场景对象
        this.scene = new THREE.Scene();
        // 创建三维坐标系
        var axesHelper = new THREE.AxesHelper(100);
        // this.scene.add(axesHelper);
      },
      // 初始化光源
      initLight() {
        // 遍历添加光源
        this.lightlist.forEach((item) => {
          var light = new THREE[item.type](item.color, item.intensity);
          // light.position.set(item.posiy[0], item.posiy[1], item.posiy[2]); // 点光源位置
          if (item.type === 'DirectionalLight') {
            light.shadow.camera.near = 20; // 产生阴影的最近距离
            light.shadow.camera.far = 200; // 产生阴影的最远距离
            light.shadow.camera.left = -50; // 产生阴影距离位置的最左边位置
            light.shadow.camera.right = 50; // 最右边
            light.shadow.camera.top = 50; // 最上边
            light.shadow.camera.bottom = -50; // 最下面
            // 这两个值决定使用多少像素生成阴影 默认512
            light.shadow.mapSize.height = 1024;
            light.shadow.mapSize.width = 1024;
            // 告诉平行光需要开启阴影投射
            light.castShadow = true;
          }
          this.scene.add(light);
        });
      },
      // 初始化相机
      initCamera() {
        var k = this.$refs.draw.offsetWidth / this.$refs.draw.offsetHeight; // 窗口宽高比
        // 创建相机对象
        if (this.sightline.type === 'OrthographicCamera') {
          this.camera = new THREE.OrthographicCamera(
            -this.sightline.scale * k,
            this.sightline.scale * k,
            this.sightline.scale,
            -this.sightline.scale,
            1,
            1000
          );
        } else if (this.sightline.type === 'PerspectiveCamera') {
          this.camera = new THREE.PerspectiveCamera(this.scale, k, 0.1, 100000);
        }
        // 红 绿 蓝
        this.camera.position.set(
          this.sightline.posiy[0],
          this.sightline.posiy[1],
          this.sightline.posiy[2]
        ); // 设置相机位置
        this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)
      },
      // 渲染器对象
      initRenderer() {
        // 渲染器对象
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // 设置渲染区域尺寸
        this.renderer.setSize(
          this.$refs.draw.offsetWidth,
          this.$refs.draw.offsetHeight
        );
        // three.js 的色彩空间渲染方式  【重要】
        if (this.strain.Encoding) {
          this.renderer.outputEncoding = THREE.sRGBEncoding;
        }
        if (this.strain.shadow) {
          // 开启渲染阴影
          this.renderer.shadowMap.enabled = true;
          this.renderer.hadowMapEnabled = true;
        }
        this.renderer.setClearColor(this.strain.color, 1); // 设置背景颜色
        // body元素中插入canvas对象
        this.$refs.draw.appendChild(this.renderer.domElement);
      },
      // 执行渲染操作
      animation() {
        // 执行渲染操作
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animation);
      },
      // 初始化控制
      orbitControls() {
        if (this.orbit) {
          this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
          ); // 创建控件对象
        }
      },
      // 添加全局方法
      addmeth() {
        // 监听窗口尺寸变化
        window.addEventListener('resize', this.changeSize, false);
        // 监听鼠标按下
        window.addEventListener('mousedown', this.mouseDown, false);
        //  监听鼠标移动
        window.addEventListener('mousemove', this.mouseMove, false);
        // 监听鼠标弹起
        window.addEventListener('mouseup', this.mouseUp, false);
      },
      // 监听尺寸变化
      changeSize() {
        // 重置渲染器输出画布canvas尺寸
        this.renderer.setSize(
          this.$refs.draw.offsetWidth,
          this.$refs.draw.offsetHeight
        );
        var k = this.$refs.draw.offsetWidth / this.$refs.draw.offsetHeight; // 窗口宽高比
        // 重置相机投影的相关参数
        if (this.sightline.type === 'OrthographicCamera') {
          this.camera.left = -this.sightline.scale * k;
          this.camera.right = this.sightline.scale * k;
          this.camera.top = this.sightline.scale;
          this.camera.bottom = -this.sightline.scale;
        } else if (this.sightline.type === 'PerspectiveCamera') {
          camera.aspect = k;
        }
        // 如果相机的一些属性发生了变化，
        // 需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        this.camera.updateProjectionMatrix();
      },
      // 监听鼠标按下
      mouseDown(event) {
        this.isclick = {
          clientX: event.clientX,
          clientY: event.clientY,
        };
      },
      // 监听鼠标移动
      mouseMove(event) {
        if (!this.isclick) {
          if (this.$refs.draw) {
            var list = this.countmouse(event);
            // 传出鼠标移动事件
            this.$emit('change', 'move', list);
          }
        }
      },
      // 监听鼠标弹起
      mouseUp(event) {
        // 如果相等说明是点击事件
        if (
          (this.isclick.clientX === event.clientX) &
          (this.isclick.clientY === event.clientY)
        ) {
          // 传出点击事件
          this.isclick = null;
          if (this.$refs.draw) {
            var list = this.countmouse(event);
            this.$emit('change', 'click', list);
          }
        } else {
          this.isclick = null;
        }
      },
      // 判断当前点击的事件
      countmouse(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // 将鼠标点击位置的屏幕坐标转换成threejs中的标准坐标
        var dom = this.$refs.draw.getBoundingClientRect();
        if (
          event.clientX >= dom.left &&
          event.clientY >= dom.top &&
          event.clientX <= dom.left + this.$refs.draw.offsetWidth &&
          event.clientY <= dom.top + this.$refs.draw.offsetHeight
        ) {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
          raycaster.setFromCamera(mouse, this.camera);
          // 获取raycaster直线和所有模型相交的数组集合
          var list = raycaster.intersectObjects(this.scene.children);
          if (list.length > 0) {
            return list;
          } else {
            return [];
          }
        } else {
          return [];
        }
      },
      // 设置动画
      tweenUpdate() {
        requestAnimationFrame(this.tweenUpdate);
        this.$tweener.update();
      },
      // 运动动画
      tweenobj(object, potion, time) {
        this.$tween.fade(
          object.position,
          potion,
          time,
          0,
          this.$tweener.Easing.Cubic.InOut
        );
      },
    },
  };
  </script>
   
  <style scoped>
  .draw {
    width: 100%;
    height: 100%;
  }
  </style>