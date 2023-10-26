<template>
  <div class="user-center-wrapper clear-fix">
    <el-card shadow="always" :body-style="{padding: '50px'}">
      <div class="user-avatar">
        <img src="../assets/img/avatar.png" alt="avatar">
      </div>
      <ul class="user-info">
        <li>
          <label>用户名：</label>
          <span>{{ userInfo.userName }}</span>
        </li>
        <li>
          <label>角色：</label>
          <span>{{ userInfo.userRole==='student'?'学生':'管理员' }}</span>
        </li>
        <li>
          <label>电话号码：</label>
          <span>{{ userInfo.userPhoneNumber }}</span>
        </li>
        <li>
          <label>邮箱：</label>
          <span>{{ userInfo.userEmail }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'UserCenter',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo(){
      this.userInfo = JSON.parse(sessionStorage.getItem('userinfo'))
      console.log(this.userInfo);
    }
  }
}
</script>

<style lang="less">
.user-center-wrapper {
  .user-avatar {
    float: left;
    width: 150px;
    height: 150px;
  }
  .user-info {
    float: left;
    width: 800px;
    margin-left: 50px;
    margin-bottom: 50px;
    li {
      height: 34px;
      line-height: 34px;
      label,
      span {
        display: inline-block;
        vertical-align: middle;
      }
      label {
        width: 80px;
        margin-right: 12px;
        text-align: right;
      }
    }
  }
}
</style>
