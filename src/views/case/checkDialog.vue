<template>
  <div>
    <el-dialog
      :title="'新增'"
      :visible.sync="formVisible"
      class="dialog-form"
      :before-close="handleClose"
      fullscreen
    >
      <el-form
        ref="dialogForm"
        :model="allData"
        :rules="formRules"
        label-width="150px"
      >
      <el-form-item style="text-align: right">
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            :loading="isLoading"
            @click="submitForm('dialogForm')"
            >确 定</el-button
          >
        </el-form-item>
        <el-form-item label="病例类型">
            <el-select v-model="allData.type" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <div v-for="(item, index) in allData.tagList" :key="index">
          <el-card class="cardType">
            <el-form-item
              :label="`${item}:`"
              :prop="allData.fileList[index].id"
            >
              <el-input v-model="allData.textList[allData.fileList[index].id]" />
            </el-form-item>
            <div>
              <el-row :gutter="20">
                <el-col :span="10">
                  <el-form-item style="float: left" :label="`${item}（图）：`">
                    <el-card shadow="always" :body-style="{ padding: '0px' }">
                      <div slot="header" class="title">图片拖拽上传</div>
                      <div class="content-box">
                        <el-upload
                          action=""
                          drag
                          multiple
                          accept=".jpg,.png"
                          :file-list="
                            allData.fileList[index][
                              allData.fileList[index].id + 'PicList'
                            ]
                          "
                          :auto-upload="false"
                          :on-change="
                            (file, list) =>
                              handleChange(
                                file,
                                list,
                                index,
                                allData.fileList[index].id + 'PicList'
                              )
                          "
                        >
                          <i class="el-icon-upload" />
                          <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                          </div>
                          <div slot="tip" class="el-upload__tip">
                            只能上传jpg、jpeg、png文件，且不超过500kb
                          </div>
                        </el-upload>
                      </div>
                    </el-card>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item style="float: right" :label="`${item}（图）：`">
                    <el-card shadow="always" :body-style="{ padding: '0px' }">
                      <div slot="header" class="title">视频拖拽上传</div>
                      <div class="content-box">
                        <el-upload
                          action=""
                          drag
                          multiple
                          accept=".mp4"
                          :file-list="
                            allData.fileList[index][
                              allData.fileList[index].id + 'VideoList'
                            ]
                          "
                          :auto-upload="false"
                          :on-change="
                            (file, list) =>
                              handleChange(
                                file,
                                list,
                                index,
                                allData.fileList[index].id + 'VideoList'
                              )
                          "
                        >
                          <i class="el-icon-upload" />
                          <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                          </div>
                          <div slot="tip" class="el-upload__tip">
                            只能上传mp4文件
                          </div>
                        </el-upload>
                      </div>
                    </el-card>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-form>
      <el-dialog
        title="上传进度"
        :visible.sync="loadingVisible"
        width="30%"
        :close-on-click-modal="false"
        :before-close="handleCloseUpload">
          <span>文件上传中，请稍候</span>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="loadingPercent"></el-progress>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import service from '../../request'
import { post, get } from "@/api/login";
export default {
  name: "checkDialog",
  props: ["formVisible"],
  data() {
    return {
        loadingVisible: false,
        loadingPercent: 0,
        options: [{
          value: '传染病',
          label: '传染病'
        }, {
          value: '寄生虫病',
          label: '寄生虫病'
        }, {
          value: '内科',
          label: '内科'
        }, {
          value: '外产科疾病',
          label: '外产科疾病'
        }, {
          value: '常用手术',
          label: '常用手术'
        }],
      allData: {
        type: '',
        tagList: ["疾病名称", "接诊情况", "病例检查", "诊断结果", "治疗方案"],
        fileList: [
          {
            id: "nameFile",
            videoPrefix: 'name',
            nameFilePicList: [],
            nameFileVideoList: [],
          },
          {
            id: "infoFile",
            videoPrefix: 'symptom',
            infoFilePicList: [],
            infoFileVideoList: [],
          },
          {
            id: "caseFile",
            videoPrefix: 'exam',
            caseFilePicList: [],
            caseFileVideoList: [],
          },
          {
            id: "resultFile",
            videoPrefix: 'result',
            resultFilePicList: [],
            resultFileVideoList: [],
          },
          {
            id: "schemeFile",
            videoPrefix: 'treat',
            schemeFilePicList: [],
            schemeFileVideoList: [],
          },
        ],
        textList: {
          nameFile: undefined,
          infoFile: undefined,
          caseFile: undefined,
          resultFile: undefined,
          schemeFile: undefined,
        },
      },
      formRules: {},
      isLoading: false,
    };
  },
  created() {},
  methods: {
    handleCreate() {
      this.title = "新增";
      this.$emit('isShow');
    },
    // 新增/编辑弹出框 关 闭时操作
    handleClose() {
      this.$emit('isShow');
    },
    handleCloseUpload(){
      this.loadingVisible = false
    },
    allWithProgress(requests, callback){
        let index = 0;
        requests.forEach(item=>{
          item.then(()=>{
            index++;
            let progress = index*100/requests.length;
            callback(progress);
          })
        });
        return Promise.all(requests);
    },
    // 新增/编辑表单确认提交
    async submitForm(formName) {
        let type = this.allData.type;
        const {nameFile,infoFile,caseFile,resultFile,schemeFile} = this.allData.textList;
        let data = {
            diseaseType: type,
            diseaseName: nameFile,
            diseaseSymptom: infoFile,
            diseaseExam: caseFile,
            diseaseResult: resultFile,
            diseaseTreat: schemeFile
        };
        // let str = qs.stringify(data)
        post("/api/disease/addDisease",data).then(res=>{
            this.isLoading = true;
            let data = []
            this.loadingVisible = true;
            for(let i=0;i<5;i++){
                let fd1 = new FormData();
                let fd2 = new FormData();
                let params1 = {
                    diseaseId: res,
                    photoPrefix: this.allData.fileList[i].videoPrefix
                }
                let params2 = {
                    diseaseId: res,
                    VideoPrefix: this.allData.fileList[i].videoPrefix
                }
                this.allData.fileList[i][this.allData.fileList[i].id+'PicList'].forEach(file => {
                    fd1.append("files",file.raw);
                });
                this.allData.fileList[i][this.allData.fileList[i].id+'VideoList'].forEach(file =>{
                    fd2.append("files",file.raw);
                })
                params1 = qs.stringify(params1);
                params2 = qs.stringify(params2);
                data.push({params1,fd1})
                data.push({params2,fd2})
            }
            let urls = [];
            for (let i = 0; i < 10; i += 2) {
              if (data[i].fd1.has('files')) {
                urls.push(post(`/api/data/uploadPhotos?${data[i].params1}`,data[i].fd1));
              }
              if (data[i+1].fd2.has('files')) {
                urls.push(post(`/api/data/uploadVideos?${data[i+1].params2}`,data[i+1].fd2));
              }
            }
            this.allWithProgress(urls,(progress)=>{
              this.loadingPercent = Math.floor(progress)
            }).then(res=>{
              this.isLoading = false;
              this.loadingVisible = false;
              this.$emit('isShow');
              this.$message({
                type: "success",
                message: "上传成功!",
              });
            })
            // Promise.all(urls).then(res=>{
            //   this.isLoading = false;
            //   this.$emit('isShow');
            // }); 

        })
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    // --------上传图片--------
    // 进度条
    uploadPhotoProcess(event, file, fileList) {
      this.loadProgress = Math.floor(event.percent);
      if (this.loadProgress >= 100) {
        this.loadProgress = 100;
      }
    },
    handleChange(file, fileList, index, e) {
      this.allData.fileList[index][e] = fileList;
    },
    // 上传接口
    async uploadPic(file) {
      this.progressFlag = true; // 显示进度条
      const fd = new FormData();
      console.log("uploadPic id: ", this.dialogForm.id);
      fd.append("files", file);
      uploadPic(fd).then((response) => {
        this.progressFlag = false;
        this.$message({
          type: "success",
          message: "上传成功!",
        });
      });
    },
    // --------上传视频--------
    // 上传接口
    async uploadVid(file) {
      this.progressFlag = true; // 显示进度条
      const fd = new FormData();
      console.log("id: ", this.dialogForm.id);
      fd.append("files", file);
      uploadVid(fd).then((response) => {
        this.videoSrc = response.result.url;
        this.progressFlag = false;
        this.$emit("setFileSrc", this.videoSrc);
        this.$message({
          type: "success",
          message: "上传成功!",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-upload__tip {
  text-align: center;
}
.content-box {
  height: 30%;
}
.cardType {
  margin-bottom: 15px;
}
.loading{
  margin-top: 4000px;
}
</style>