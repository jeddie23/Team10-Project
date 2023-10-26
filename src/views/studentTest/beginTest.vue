<template>
    <div>
        <el-table
      :data="testData"
      style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="questionDescription"
            label="题目描述"
            width="180">
        </el-table-column>
      <el-table-column label="选择正确答案">
        <template slot-scope="scope">
            <el-radio-group v-model="scope.row.userAnswer">
                <el-radio :label="'A'">{{scope.row.choiceA}}</el-radio>
                <el-radio :label="'B'">{{scope.row.choiceB}}</el-radio>
                <el-radio :label="'C'">{{scope.row.choiceC}}</el-radio>
                <el-radio :label="'D'">{{scope.row.choiceD}}</el-radio>
            </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right;margin-right: 60px;">
        <el-button type="success" :disabled="isLoading" @click="handleSubmit">提交试卷</el-button>
    </div>
    </div>
</template>

<script>
import { post, get } from "@/api/login";
import qs from "qs";

export default {
    data(){
        return{
            testData: [],
            isLoading: false
        }
    },
    created(){
        this.fetchData();
    },
    watch: {
        '$route.query.id': {
            handler() {
                this.fetchData();
            }
    }
    },
    methods: {
        fetchData(){
            get("/api/getPaperById",{paperId: this.$route.query.paperId}).then((res)=>{
                let data = res.paperQuestionDTOS;
                data.forEach(element => {
                    element.userAnswer = ''
                });
                this.testData = data;
            
        })
    },
        handleSubmit(){
            let data = []
            let {userId} = JSON.parse(sessionStorage.getItem('userinfo'))
            let params = {
                examId: this.$route.query.examId,
                userId
            };
            params = qs.stringify(params)
            this.testData.forEach(e=>{
                let obj = {};
                obj.questionId = e.questionId;
                obj.userAnswer = e.userAnswer
                data.push(obj)
            })
            this.isLoading = true
            post("/api/uq/submit?"+params,data).then(res=>{
                console.log(res);
                this.isLoading = false;
                this.$router.push({path:'/studenttest/paperlist'})
            })
        }
    }
}
</script>

<style>

</style>