<template>
<div>
<div class="box">
  <ul>
    <li class="top">{{displayname}}</li>
    <li class="content">
      <div>用户名：</div>
      <div>{{username}}</div>
    </li>
    <li class="content">
      <div>邮箱：</div>
      <div>{{mail}}</div>
    </li>
    <li >
      <el-button type="danger" @click="isUpdate=true">修改密码</el-button>
    </li>
  </ul>
</div>
  <el-dialog
    title="修改密码"
    :visible.sync="isUpdate"
    width="30%"
    :append-to-body="true">
    <el-form ref="form" label-width="80px">
      <el-form-item label="新密码">
        <el-input v-model="password" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isUpdate= false">取 消</el-button>
    <el-button type="primary" @click="isUpdate = false; update()">确认</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "owner",
  data(){
    return{
      username:"",
      displayname:'',
      mail:'',
      isUpdate:false,
      password:'',
      url:'http://172.20.10.4:8001',
    }
  },
  mounted(){
    this.username = localStorage.getItem("username");
    this.displayname = localStorage.getItem("displayname");
    this.mail = localStorage.getItem("mail");
  },
  methods:{
    update(){
      this.$axios({
        method:'put',
        url:this.url+'/User/updatePW',
        data:{
          username:this.username,
          password:this.password,
        }
      }).then(res=>{
        this.$message({
          message:'修改密码成功，请重新登录',
          type:'success'
        })
        this.$router.push('/');
      })
    }
  }
}
</script>

<style scoped lang="scss">
ul{
  li{
    list-style: none;
    margin-top:10px;
  }
}
.box{
  //background-color: rosybrown;
  width:300px;
  height:200px;
  margin-left:20%;
}
.top{
  font-size:30px;
  height:50px;
  line-height: 50px;
  text-align: center;
}
.content{
  display: flex;
  justify-content: flex-start;
}
</style>
