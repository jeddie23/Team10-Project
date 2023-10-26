<template>
    <div>
        <el-popover
            placement="top-start"
            title="导览"
            width="200"
            trigger="manual"
            content="点击不同位置进入不同区域"
            v-model="visible1">
                <el-image :src="`static/shuye1.png`" class="img" 
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
    name:'GuideShuye',
    data() {
        return{
            visible1: false,
        }
    },
    methods: {
        getInfo(e) {
            // console.log(e.offsetX,e.offsetY);
            if(this.judgePosition(40,120,e.offsetX) && this.judgePosition(160,300,e.offsetY)){
                console.log('出门');
            }
            if(this.judgePosition(730,790,e.offsetX) && this.judgePosition(320,440,e.offsetY)){
                console.log('detail');
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