<template>
  <div>
    <el-button type="primary" icon="el-icon-back" class="fl" @click="$router.go(-1)"></el-button>
    <div class="title fl">病例详情</div>
    <div style="clear: both;"></div>
    <div style="margin-bottom: 20px;">
        <span class="type">病例类型:</span><el-tag type="info" size="medium">{{detailData.diseaseType}}</el-tag>
    </div>
    <div style="margin-bottom: 10px;">
        <el-button type="primary" icon="el-icon-download" @click="download(true)">下载图片</el-button>
        <el-button type="primary" icon="el-icon-download" @click="download(false)">下载视频</el-button>
    </div>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="疾病名称">
                <div class="content">
                    <span>疾病名称:&nbsp;&nbsp;&nbsp; </span><span>{{ detailData.diseaseName }}</span>
                </div>
                <div class="content">
                    <div>疾病名称图片：</div>
                    <el-button type="primary" @click="uploadImg('name')" icon="el-icon-upload">
                        上传图片
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseNamePhotoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">图片展示</div>
                        <div v-for="item in detailData.diseaseNamePhotoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickImg(item,'name')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div class="content-item">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgUrl"
                                :preview-src-list="[imgUrl]"
                                >
                            </el-image>
                        </div>
                    </el-card>
                </div>
                <div class="content">
                    <div>疾病名称视频：</div>
                    <el-button type="primary" @click="uploadVideo('name')" icon="el-icon-upload">
                        上传视频
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseNameVideoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">视频播放</div>
                        <div v-for="item in detailData.diseaseNameVideoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickVideo(item,'name')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div>
                            <el-button type="success" icon="el-icon-video-camera" @click="$router.push({path:'/video/video-mark',query:{videoUrl}})">
                                视频处理
                            </el-button>
                        </div>
                        <div class="content-item">
                            <VueVideoPlayer :url="videoUrl"/>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="接诊情况">
                <div class="content">
                    <span>接诊情况:&nbsp;&nbsp;&nbsp; </span><span>{{ detailData.diseaseSymptom }}</span>
                </div>
                <div class="content">
                    <div>接诊情况图片：</div>
                    <el-button type="primary" @click="uploadImg('symptom')" icon="el-icon-upload">
                        上传图片
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseSymptomPhotoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">图片展示</div>
                        <div v-for="item in detailData.diseaseSymptomPhotoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickImg(item,'symptom')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div class="content-item">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgUrl"
                                :preview-src-list="[imgUrl]"
                                >
                            </el-image>
                        </div>
                    </el-card>
                </div>
                <div class="content">
                    <div>接诊情况视频：</div>
                    <el-button type="primary" @click="uploadVideo('symptom')" icon="el-icon-upload">
                        上传视频
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseSymptomVideoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">视频播放</div>
                        <div v-for="item in detailData.diseaseSymptomVideoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickVideo(item,'symptom')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div>
                            <el-button type="success" icon="el-icon-video-camera" @click="$router.push({path:'/video/video-mark',query:{videoUrl}})">
                                视频处理
                            </el-button>
                        </div>
                        <div class="content-item">
                            <VueVideoPlayer :url="videoUrl"/>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="病例检查">
                <div class="content">
                    <span>病例检查:&nbsp;&nbsp;&nbsp; </span><span>{{ detailData.diseaseExam }}</span>
                </div>
                <div class="content">
                    <div>病例检查图片：</div>
                    <el-button type="primary" @click="uploadImg('exam')" icon="el-icon-upload">
                        上传图片
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseExamPhotoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">图片展示</div>
                        <div v-for="item in detailData.diseaseExamPhotoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickImg(item,'exam')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div class="content-item">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgUrl"
                                :preview-src-list="[imgUrl]"
                                >
                            </el-image>
                        </div>
                    </el-card>
                </div>
                <div class="content">
                    <div>病例检查视频：</div>
                    <el-button type="primary" @click="uploadVideo('exam')" icon="el-icon-upload">
                        上传视频
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseExamVideoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">视频播放</div>
                        <div v-for="item in detailData.diseaseExamVideoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickVideo(item,'exam')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div>
                            <el-button type="success" icon="el-icon-video-camera" @click="$router.push({path:'/video/video-mark',query:{videoUrl}})">
                                视频处理
                            </el-button>
                        </div>
                        <div class="content-item">
                            <VueVideoPlayer :url="videoUrl"/>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="诊断结果">
                <div class="content">
                    <span>诊断结果:&nbsp;&nbsp;&nbsp; </span><span>{{ detailData.diseaseResult }}</span>
                </div>
                <div class="content">
                    <div>诊断结果图片：</div>
                    <el-button type="primary" @click="uploadImg('result')" icon="el-icon-upload">
                        上传图片
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseResultPhotoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">图片展示</div>
                        <div v-for="item in detailData.diseaseResultPhotoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickImg(item,'result')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div class="content-item">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgUrl"
                                :preview-src-list="[imgUrl]"
                                >
                            </el-image>
                        </div>
                    </el-card>
                </div>
                <div class="content">
                    <div>诊断结果视频：</div>
                    <el-button type="primary" @click="uploadVideo('result')" icon="el-icon-upload">
                        上传视频
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseResultVideoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">视频播放</div>
                        <div v-for="item in detailData.diseaseResultVideoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickVideo(item,'exam')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div>
                            <el-button type="success" icon="el-icon-video-camera" @click="$router.push({path:'/video/video-mark',query:{videoUrl}})">
                                视频处理
                            </el-button>
                        </div>
                        <div class="content-item">
                            <VueVideoPlayer :url="videoUrl"/>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="治疗方案">
                <div class="content">
                    <span>治疗方案:&nbsp;&nbsp;&nbsp; </span><span>{{ detailData.diseaseTreat }}</span>
                </div>
                <div class="content">
                    <div>治疗方案图片：</div>
                    <el-button type="primary" @click="uploadImg('treat')" icon="el-icon-upload">
                        上传图片
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseTreatPhotoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">图片展示</div>
                        <div v-for="item in detailData.diseaseTreatPhotoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickImg(item,'treat')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div class="content-item">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="imgUrl"
                                :preview-src-list="[imgUrl]"
                                >
                            </el-image>
                        </div>
                    </el-card>
                </div>
                <div class="content">
                    <div>治疗方案视频：</div>
                    <el-button type="primary" @click="uploadVideo('treat')" icon="el-icon-upload">
                        上传视频
                    </el-button>
                    <el-empty :image-size="200" v-if="detailData.diseaseTreatVideoNum==0"></el-empty>
                    <el-card shadow="always" v-else>
                        <div slot="header">视频播放</div>
                        <div v-for="item in detailData.diseaseTreatVideoNum" :key="item" class="num">
                            <el-button type="primary" @click="clickVideo(item,'treat')">
                                {{ item }}
                            </el-button>
                        </div>
                        <div>
                            <el-button type="success" icon="el-icon-video-camera" @click="$router.push({path:'/video/video-mark',query:{videoUrl}})">
                                视频处理
                            </el-button>
                        </div>
                        <div class="content-item">
                            <VueVideoPlayer :url="videoUrl"/>
                        </div>
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <uploadImg :formVisible="imgVisible" @isShow="imgVisible=!imgVisible;fetchData()" :type="type"/>
    <uploadVideo :formVisible="videoVisible" @isShow="videoVisible=!videoVisible;fetchData()" :type="type"/>
  </div>
</template>

<script>
import { post, get,downloadFile } from "@/api/login";
import VueVideoPlayer from '../../components/VueVideoPlayer'
import uploadImg from './uploadImg'
import uploadVideo from './uploadVideo.vue'

export default {
name: 'caseDetail',
components:{VueVideoPlayer,uploadImg,uploadVideo},
data(){
    return{
        imgVisible: false,
        videoVisible: false,
        type: '',
        videoId: 1,            
        videoUrl: '',
        ImgId: 1,
        imgUrl: '',
        detailData: {
            diseaseId: '',
            diseaseType: "",
            diseaseName: "",
            diseaseNamePhotoNum: '',
            diseaseNameVideoNum: '',
            diseaseSymptom: "",
            diseaseSymptomPhotoNum: '',
            diseaseSymptomVideoNum: '',
            diseaseExam: "",
            diseaseExamPhotoNum: '',
            diseaseExamVideoNum: '',
            diseaseResult: "",
            diseaseResultPhotoNum: '',
            diseaseResultVideoNum: '',
            diseaseTreat: "",
            diseaseTreatPhotoNum: '',
            diseaseTreatVideoNum: '',
            diseasePhotoFilepath: "",
            diseaseVideoFilepath: ""
        },
        labelList: ["疾病名称","接诊情况","病例检查","诊断结果","治疗方案"]
    }
},
watch: {
    '$route.query.id': {
        handler() {
            console.log(this.$route.meta,'1');
            if(this.$route.meta.title == '病例详情'){
                this.fetchData();
            }
        }
    }
},
created(){
    this.fetchData();
},
methods: {
    uploadImg(type){
        this.imgVisible = true;
        this.type = type
    },
    uploadVideo(type){
        this.videoVisible = true;
        this.type = type
    },
    clickVideo(index,type){
        this.videoId = index;
        this.videoUrl = this.detailData.diseaseVideoFilepath+type+index+'.mp4'
        console.log(this.videoUrl);
    },
    clickImg(index,type){
        this.imgId = index;
        this.imgUrl = this.detailData.diseasePhotoFilepath+type+index+'.jpg'
        console.log(this.imgUrl);
    },
    fetchData(){
        get("/api/disease/getDiseaseById",{id:this.$route.query.id}).then((res)=>{
            this.detailData = res;
        })
    },
    fileDownload(url,type){
        downloadFile(url,{diseaseId:this.$route.query.id}).then((res)=>{
            let blob = new Blob([res.data], { type: 'application/zip' }); //设置下载的内容以及格式
            const url = window.URL.createObjectURL(blob); //设置路径
            const link = window.document.createElement('a'); // 创建a标签
            link.href = url;
            link.download = '病例'+type+this.$route.query.id; //设置文件名
            link.style.display = 'none';
            link.click();
            URL.revokeObjectURL(url); // 释放内存   
        })
    },
    download(isPhoto){
        if(isPhoto){
            this.fileDownload("/api/data/downloadAllPhotos",'图片')
        }else{
            this.fileDownload("/api/data/downloadAllVideos",'视频')
        }
    }
} 
}
</script>

<style lang="less" scoped>
.title{
    font-size: 24px;
    color: #409EFF;
    margin-left: 600px;
}
.my-label{
    font-size: 20px;
    color: black;
}
.content{
    font-size: 16px;
    line-height: 30px;
}
.type{
    font-size: 20px;
    margin-right: 100px;
}
.fl{
    float: left;
}
.num{
    display: inline-block;
}
</style>