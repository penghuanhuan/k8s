<template >
 <div id="login">
   <div class="box">
     <div class="title">
       <span>kUBERNETES  资源管理系统</span>
     </div>
     <div class="login">
       <div class="content">
         <div class="label">
           <img src="../assets/img/user.png">
           <div><span>用户名</span></div>
         </div>
         <div>
           <el-input v-model="username"></el-input>
         </div>
       </div>
       <div class="content">
         <div class="label">
           <img src="../assets/img/password.png">
           <div><span>密码</span></div>
         </div>
         <div>
           <el-input v-model="password" type="password"></el-input>
         </div>
       </div>
       <div class="but">
         <el-button @click="login()" type="primary" >登录</el-button>
       </div>


     </div>

   </div>
 </div>
</template>

<script>

export default {
  name: 'Login',
  components: {

  },
mounted() {
},
  data(){
    return {
      username:'',
      password:'',
      url:'http://172.20.10.4:8001',
      user:{},
    }
  },
  methods: {
    login() {
      this.$axios({
        method:'post',
        url:this.url+'/User/login',
        data:{
          username:this.username,
          password:this.password
        },
      }).then(res =>{
        if(res.data.status==="fail"){
          this.$message({
            message: res.data.msg,
            type: "error",
          })
        }else{
          this.user = res.data.msg.displayname;
          localStorage.setItem("displayname",res.data.msg.displayname);
          localStorage.setItem("mail",res.data.msg.mail);
          localStorage.setItem("username",res.data.msg.username);
          localStorage.setItem("role",res.data.msg.role);
          this.$router.push({path:'./Home',query: {user: this.user}});
        }
      })

    },
  }
}
</script>
<style scoped lang="scss">
#login{
  background: url("../assets/img/login.jpg") no-repeat;
  height:100%;
  width:100%;
  position: fixed;
  background-size: 100% 100%;

}
.box{
  background-color: white;
  width:500px;
  height:220px;
  position: fixed;
  left:30%;
  top:30%;
  border:2px solid rgba(96,96,96,0.5);
  border-radius: 6px;
  .title{
    margin-top:10px;
    height: 50px;
    text-align: center;
    font-size:20px;
  }
  img{
    width:20px;
    height: 20px;
    border:1px solid gray;
    border-radius: 10px;
    margin-right:5px;
  }
  .login{
    width:300px;
    margin:auto;
    .content{
      display: flex;
      justify-content: space-between;
      margin-top:10px;
      margin-bottom:10px;
    }
    .label{
      display: flex;
      justify-content: space-between;
    }
  }
  .but{
    width:100px;
    margin:auto;
  }
}
</style>
