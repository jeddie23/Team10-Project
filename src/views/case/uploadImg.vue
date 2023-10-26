<template>
  <div>
    <el-dialog
        title="图片上传"
        :visible.sync="formVisible"
        width="50%"
        :close-on-click-modal="false"
        :before-close="handleCloseUpload">
            <el-form
            ref="dialogForm"
            :model="allData"
            label-width="150px"
        >
            <el-card>
                <el-form-item style="float: left" :label="`${map[type]}（图）：`">
                    <el-card shadow="always" :body-style="{ padding: '0px' }">
                      <div slot="header" class="title">图片拖拽上传</div>
                      <div class="content-box">
                        <el-upload
                          action=""
                          drag
                          multiple
                          accept=".jpg,.png"
                          :file-list="allData.fileList"
                          :auto-upload="false"
                          :on-change="
                            (file, list) =>
                              handleChange(
                                file,
                                list,
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
            </el-card>
            <el-form-item style="text-align: right">
            <el-button @click="handleCloseUpload">取 消</el-button>
            <el-button
                type="primary"
                :loading="isLoading"
                @click="submit()"
                >确 定</el-button
            >
            </el-form-item>
        </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { post, get } from "@/api/login";
import qs from "qs";
export default {
    props: ["formVisible","type"],
    data(){
        return {
            isLoading: false,
            allData: {
                fileList: []
            },
            map:{
                'name':'疾病名称',
                'symptom': '接诊情况',
                'exam': '病例检查',
                'result': '诊断结果',
                'treat': '治疗方案'
            }
        }
    },
    methods: {
        handleCloseUpload(){
            this.$emit('isShow');
        },
        handleChange(file,list){
            this.allData.fileList = list;
        },
        submit(){
            this.isLoading=true;
            console.log(this.allData.fileList);
            let params = {
                diseaseId: this.$route.query.id,
                photoPrefix: this.type
            }
            let fd = new FormData();
            this.allData.fileList.forEach(file => {
                    fd.append("files",file.raw);
                });
            params = qs.stringify(params)
            post(`/api/data/uploadPhotos?${params}`,fd).then(res=>{
                this.isLoading=false;
                this.$emit('isShow');
                this.$message({
                    type: "success",
                    message: "上传成功!",
                });
            })
            this.allData.fileList=[];
        }
    }
}
</script>

<style>

</style>