<template>
  <div>
    <div>
        <el-card class="box-card">
            <div slot="header" class="title">
                <h1>前台学习工作计划1</h1>
            </div>
            <div v-for="(item,index) in processList1" :key="index" class="text item">
                {{item}}
            </div>
        </el-card>
        <el-card class="box-card" style="float: right;">
            <div slot="header" class="title">
                <h1>前台学习工作计划2</h1>
            </div>
            <div v-for="(item,index) in processList2" :key="index" class="text item">
                {{item}}
            </div>
        </el-card>
        <div style="clear: both;"></div>
    </div>
    <div>
        <el-steps :active="4" align-center>
            <el-step>
                <span slot="title" class="title2">岗位责任1</span>
                <span slot="description" class="description">负责接转总台电话、解答顾客一般问题。</span>
            </el-step>
            <el-step>
                <span slot="title" class="title2">岗位责任2</span>
                <span slot="description" class="description">负责接待来院顾客、完成接待、指引、介绍等流程。</span>
            </el-step>
            <el-step>
                <span slot="title" class="title2">岗位责任3</span>
                <span slot="description" class="description">负责关注现场服务环境、按照标准为顾客提供完善服务。</span>
            </el-step>
            <el-step>
                <span slot="title" class="title2">岗位责任4</span>
                <span slot="description" class="description">负责及时完成接待、顾客意见调查等相关数据汇报、上报。</span>
            </el-step>
        </el-steps>
    </div>
  </div>
</template>

<script>
export default {
    name: 'frontStage',
    data() {
        return {
            processList1: [
                `前台是展示公司的形象、服务的起点。对于客户来说，前台是他们接触我们公司的第一步,是对公司的第一印象，是非常重要的。所以前台在一定程度上代表了公司的形象。同时，公司对客户的服务，从前台迎客开始，好的开始是成功的一半.
                有了对其重要性的认识，所以我们一定要认真做好本职工作。努力提高服务质量。认真接听每一个电话，对反应的问题认真解答做好记录同时根据信息涉及的部门或责任人进行调度、传递、汇报。客户来访时我们将时刻注重保持良好的服务态度，热情的接待。在合适的环境下巧妙回答客户提出的问题。
                做到笑脸相迎、耐心细致、温馨提示等。在业余时间我们将加强学习一些关于电话技巧和服务礼仪知识。不断的为自己充电，以适应公司的快速发展。`
            ],
            processList2: [
                `不管是工作时间还是休假时间，公司有临时任务分配，我们都服从安排，积极去配合，不找理由推脱。作为一员，我们将奉献自己的一份力量为公司效命。平时积极参加公司组织的活动，加强同事之间的感情和部门之间的沟通。并且多了解公司的基本情况和经营内容。为了往后能更好的工作不断的打下基础。\n
  虽然前台的工作有时是比较的琐碎，但大小事都是要认真才能做好。所以我们都会用心的去做每一件事。感谢部门领导的教诲和公司给予我们的机会；通过这些日子的工作，我也清醒地看到了自己还存在许多不足，在以后的日子里我们将加强学习，努力把工作做得更好！`
            ]
        }
    }

}
</script>

<style lang="less" scoped>
.text{
    line-height: 30px;
    font-size: 18px;
    white-space: pre-line;
    text-indent: 2em;
}
.title{
    color: #409EFF;
}
.box-card{
    width: 45%;
    float: left;
}
.description{
    font-size: 16px;
    color: black;
}
.title2{
    font-size: 24px;
}
</style>

