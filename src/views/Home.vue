<template>
<div>
  <div class="top">
    <div class="lef">Kubernetes资源管理系统</div>
    <div class="ri">
      <div class="l"> <img src="../assets/img/man.png"></div>
      <div  class="l">{{user}}</div>
      <div  class="r">
        <el-button @click="exit()">退出</el-button>
      </div>
    </div>
  </div>
  <div class="fl">
    <div class="nav">
      <el-row class="tac">
        <el-col :span="6">
          <el-menu
            router
            default-active="1-1"
            class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span class='title'>集群信息</span>
              </template>
              <el-menu-item index="/cluster"  >集群列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span  class='title'>资源管理</span>
              </template>
              <el-menu-item index="/addAssignment" @click="change('环境部署')">环境部署</el-menu-item>
              <el-menu-item index="/assignmentList" @click="change('部署列表')">部署列表</el-menu-item>
              <el-menu-item index="/myAssignment" @click="change('我的部署')">我的部署</el-menu-item>
              <el-menu-item index="/warn" @click="change('到期警告')">到期警告</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span  class='title'>软件管理</span>
              </template>
              <el-menu-item index="/softWareList" @click="change('软件列表')">软件列表</el-menu-item>
              <el-menu-item index="/mySoft" @click="change('软件添加')">我的软件</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span  class='title'>模板管理</span>
              </template>
              <el-menu-item index="/myTemplate" @click="change('我的模板')">我的模板</el-menu-item>
              <el-menu-item index="/Template" @click="change('模板列表')">模板列表</el-menu-item>
              <el-menu-item index="/TemplateDep" @click="change('模板部署')">模板部署</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span  class='title'>用户管理</span>
              </template>
              <el-menu-item index="/userList" @click="change('用户列表')">用户列表</el-menu-item>
              <el-menu-item index="/owner" @click="change('个人信息')">个人信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>

      <!--    style="overflow-y:scroll;overflow-x:hidden;height:100%;"-->

    </div>
    <div class="content" >
      <router-view></router-view>
    </div>
  </div>


 </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      user:''
    }
  },
  components:{
  },
  created() {
    this.user = localStorage.getItem('displayname')
  },
  methods:{
    change(){
    },
    exit(){
      this.$router.push('/')
    }
  },
}
</script>

<style scoped lang="scss">
.fl{
  display: flex;
  justify-content: space-around;
}
.nav{
width:20%;
}
.content{
  width:80%;
}
.el-col-6{
  width:100%;
}
.top{
  background-color: black;
  color:white;
  height:100px;
  display: flex;
  justify-content: space-between;
  img{
    width:20px;
    height:20px;
  }
  .lef{
    font-size:35px;
    height: 100px;
    line-height: 100px;
  }
.ri{
  display: flex;
  justify-content: space-between;
  margin-right:100px;
  height: 100px;
  line-height: 100px;
  .l{
    margin-right: 10px;
  }
  .r{
    margin-left: 100px;
  }
}
}
</style>
