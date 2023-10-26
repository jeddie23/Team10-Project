<template>
    <div>
        <el-popover
            placement="top-start"
            title="导览"
            width="200"
            trigger="manual"
            content="点击不同位置进入不同区域"
            v-model="visible1">
                <el-image :src="`static/yaofang1.png`" class="img" 
                @click="getInfo($event)" 
                @mouseenter="visible1 = true"
                @mouseleave="visible1 = false"
                slot="reference">
                </el-image>
         </el-popover>
    </div>
</template>

<script>
export default {
    name:'GuideYaofang',
    data() {
        return{
            visible1: false,
        }
    },
    methods: {
        getInfo(e) {
            // console.log(e.offsetX,e.offsetY);
            if(this.judgePosition(350,440,e.offsetX) && this.judgePosition(240,400,e.offsetY)){
                console.log('药房详情');
            }
            if(this.judgePosition(700,800,e.offsetX) && this.judgePosition(300,400,e.offsetY)){
                console.log('走廊');
            }
        },
        judgePosition(left,right,num) {
            if(num >= left && num <= right) return true;
            return false;
        }
    }
}
</script>

<style>
.img{
    width: 80%;
    display: block;
    margin: auto;
}
</style>