<template>
  <div class="block">
    <h1 class="demonstration">兽医手术工作内容岗位责任及流程</h1>
    <el-carousel height="400px" style="width: 80%;margin: auto;">
      <el-carousel-item v-for="(item,index) in urlList" :key="item.name">
        <!-- <h3>{{ item.name }}</h3> -->
        <el-image :src="item.url" class="pic" @click="showDetail(index)"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h2>{{urlList[currentNum].name}}</h2>
        </div>
        <div class="content">
            {{urlList[currentNum].detail}}
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
    name: 'animalDoc',
    data() {
        return {
            urlList: [
                {
                    name: '手术类型',
                    url: 'http://t13.baidu.com/it/u=3793675250,2473610582&fm=224&app=112&f=JPEG?w=357&h=500',
                    detail:'根据手术的目的不同，可分为：诊断手术，如胸、腹腔穿刺以抽取胸腔液或腹腔液；肝脏穿刺，以采取活体组织，供化验用；治疗手术，如疝修补、肿瘤切除等；经济手术，如公畜去势，牛胆囊培植牛黄等；整形手术，如眼睑内翻和外翻整形，皮肤移植等；试验手术，如器官移植、胃肠造瘘等。'
                },
                {
                    name: '无菌处理',
                    url: 'https://img0.baidu.com/it/u=2660925181,3887114449&fm=253&fmt=auto&app=138&f=JPEG?w=602&h=400',
                    detail: '在手术前和施术过程中，一切器械、物品、衣服、病畜患部和术者的手等都必须进行无菌处理。无菌技术因处理对象而异：敷料、止血纱布、隔离巾和手术衣等均用高压蒸汽灭菌。橡胶制品用化学药品浸泡。器械可用化学药品浸泡或高压蒸汽灭菌。术者的手、臂，先用肥皂洗刷，再用化学药品消毒，最后戴上灭菌手套。患畜术部除毛后用肥皂水清洗，擦干后用碘酊消毒，并再用酒精脱碘。房屋常用过氧乙酸、福尔马林蒸气等消毒'
                },
                {
                    name: '手术过程',
                    url: 'https://img95.699pic.com/xsj/2k/th/1a.jpg%21/fw/700/watermark/url/L3hzai93YXRlcl9kZXRhaWwyLnBuZw/align/southeast',
                    detail: `可概括为组织分割、止血和缝合3个部分。
目的在于打开手术通路，显露发病器官和组织，以便手术施行。所用的方法和器械随机体组织的性质而有不同。皮肤、肌肉等软组织可用各型外科刀、外科剪作锐性分割；皮下组织、筋膜和有些肌肉也可用刀柄、止血钳或手指作钝性分离，其优点是可预防神经和血管的意外损伤，避免组织的过度开张，减少机能破坏。骨、软骨等硬组织可用骨钻、骨锯、骨凿和骨剪等分割。组织分割尚可应用特殊的技术和器械，如用激光刀或高频电刀等，可比用刀切割的出血少。超低温冷冻方法也有良好效果。
目的在于阻断流血,保证术部良好的显露,便于手术操作。止血方法可分预防性止血和手术过程中止血。前者是在手术前注射提高血液凝固的药品，借以提高机体抗出血能力，减少手术中出血。在四肢、尾部等部位手术时，通常在术部近端装置驱血带或止血带。手术过程中止血的方法很多，常用的有压迫止血，如止血钳钳压止血、结扎止血、电凝止血、烧烙止血、局部化学或生物学止血(明胶海绵、活组织填塞)等。
目的是将切开、切断或因外伤而分离的组织、器官进行对合，或重建其通道（如肠管），以创造愈合条件和促使功能恢复。常用的缝合材料有各型缝针、持针器、各种缝合材料等。缝合材料可分为两大类：一类是可吸收材料，如肠线(由绵羊小肠制成)，缝合到组织后可被吸收；另一类是不能由组织吸收的缝合材料，如丝线、棉线、金属丝、合成纤维缝合线等。缝合的方法有多种(见图)。也有用缝合机械进行某些组织的缝合，或用粘合剂进行切口粘合的。 　50年代中期，在低倍双筒显微镜下进行耳、眼的手术基础上逐渐形成的显微外科，现已发展到应用于身体的其他部位，兽医上主要用于家畜神经、血管和其他组织的缝合。
除紧急手术（如肠扭转、大出血等）需要立刻进行手术外，其他手术都可选择日期，先对动物进行临床检查和化验室检查，了解动物的健康状态，采取相应措施为手术创造良好条件。如贫血的动物要先输血,血浆蛋白低的要补充高蛋白饲料,水、电解质和酸碱平衡紊乱的要纠正其紊乱等。术前（特别是胃肠道手术）24小时给动物应用抗生素，以防细菌感染术部。术前还应给动物注射破伤风类毒素或抗毒素，以预防破伤风感染。`
                },
                {
                    name: '术后护理',
                    url: 'https://img0.baidu.com/it/u=3907892744,1098337310&fm=253&fmt=auto&app=138&f=JPEG?w=856&h=500',
                    detail: '术后护理的内容包括：饲养方法的制定，病畜全身状态的监护和治疗，定期应用抗生素等。对腹部手术后的动物一般不宜用悬吊装置，以免腹部受到过大的压力，引起伤口崩裂。'
                },
            ],
            currentNum: 0
        }
    },
    methods: {
        showDetail(index){
            this.currentNum = index;
        }
    }
}
</script>

<style lang="less" scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .demonstration{
    text-align: center;
    color: #175ECE;
  }

  .pic{
    height: 400px;
    width: 100%;
  }
  .clearfix{
    text-align: center;
  }
  .content{
    text-indent: 2em;
  }
</style>