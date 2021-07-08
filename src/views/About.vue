<template>
 <div class="k8s">
   <el-row class="tac">
  <el-col :span="6">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <span class='title'>集群信息</span>
        </template>
        <el-menu-item index="1-1" @click="change('集群列表')">集群列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
         <template slot="title">
          <span  class='title'>资源管理</span>
          </template>
           <el-menu-item index="2-1" @click="change('环境部署')">环境部署</el-menu-item>
           <el-menu-item index="2-2" @click="change('部署列表')">部署列表</el-menu-item>
           <el-menu-item index="2-3" @click="change('我的部署')">我的部署</el-menu-item>
           <el-menu-item index="2-4" @click="change('到期警告')">到期警告</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
         <template slot="title">
          <span  class='title'>软件管理</span>
          </template>
           <el-menu-item index="3-1" @click="change('软件列表')">软件列表</el-menu-item>
           <el-menu-item index="3-2" @click="change('软件添加')">软件添加</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
         <template slot="title">
          <span  class='title'>模板管理</span>
          </template>
           <el-menu-item index="4-1" @click="change('我的模板')">我的模板</el-menu-item>
           <el-menu-item index="4-2" @click="change('模板列表')">模板列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
         <template slot="title">
          <span  class='title'>用户管理</span>
          </template>
           <el-menu-item index="5-1" @click="change('用户列表')">用户列表</el-menu-item>
           <el-menu-item index="5-2" @click="change('个人信息')">个人信息</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>


<div class='content' >
  <div class="butt" v-if="this.isSelect == '集群列表'">
    <el-button type="primary" size="mini" @click="isAdd = true">添加</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    @cell-click="getRow">
     <template v-if="this.isSelect == '部署列表'">
      <el-table-column
        align="center"
        prop="cluster_id"
        label="所在集群ID">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="assign_username"
        label="部署者">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="taskname"
        label="环境名">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="namespace"
        label="命名空间">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="recycle_status"
        label="回收状态">
        <template slot-scope="scope">{{scope.row.recycle_status|getStatus }}</template>
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="create_timestamp"
        label="部署时间">
      </el-table-column>
  </template>
     <template v-else-if="this.isSelect == '集群列表'">
       <el-table-column
         align="center"
         prop="id"
         label="集群ID">
       </el-table-column>
       <el-table-column
         min-width="150"
         align="center"
         prop="cluster_name"
         label="集群名">
       </el-table-column>
       <el-table-column
         align="center"
         prop="cluster_type"
         label="集群类型">
       </el-table-column>
       <el-table-column
         min-width="150"
         align="center"
         prop="administrator"
         label="管理者">
       </el-table-column>
       <el-table-column
         min-width="150"
         align="center"
         prop="phone"
         label="联系电话">
       </el-table-column>
       <el-table-column
         min-width="150"
         align="center"
         prop="remain_cpu"
         label="剩余CPU">
       </el-table-column>
       <el-table-column
         min-width="150"
         align="center"
         prop="remain_mem"
         label="剩余内存">
       </el-table-column>
     </template>
     <template v-else-if="this.isSelect == '软件列表'">
       <el-table-column
         align="center"
         prop="soft_code"
         label="软件编号">
       </el-table-column>
       <el-table-column
         min-width="200"
         align="center"
         prop="soft_name"
         label="软件名称">
       </el-table-column>
       <el-table-column
         align="center"
         prop="soft_type"
         label="软件类型">
       </el-table-column>
       <el-table-column
         min-width="300"
         align="center"
         prop="url"
         label="镜像地址">
       </el-table-column>
       <el-table-column
         min-width="200"
         align="center"
         prop="containerPort"
         label="配置端口">
       </el-table-column>
       <el-table-column
         align="center"
         label="操作"
         min-width="200"
       >
           <el-button @click.native="isdelete = true" type="danger" size="mini">删除</el-button>
           <el-button @click.native="isupdate = true" type="primary" size="mini">修改</el-button>
       </el-table-column>
     </template>
    <template v-else-if="this.isSelect == '模板列表'">
      <el-table-column
        align="center"
        prop="template_id"
        label="模板ID">
      </el-table-column>
      <el-table-column
        align="center"
        prop="template_name"
        label="模板名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="soft_names"
        label="包含软件">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="200"
      >
        <el-button @click.native="isdelete = true" type="danger" size="mini">删除</el-button>
        <el-button @click.native="isupdate = true" type="primary" size="mini">修改</el-button>
      </el-table-column>
    </template>
    <template v-else-if="this.isSelect == '我的模板'">
      <el-table-column
        align="center"
        prop="template_id"
        label="模板ID">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="template_name"
        label="模板名称">
      </el-table-column>
      <el-table-column
        min-width="200"
        align="center"
        prop="soft_names"
        label="包含软件">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="200"
      >
        <el-button @click.native="isdelete = true" type="danger" size="mini">删除</el-button>
        <el-button @click.native="isupdate = true" type="primary" size="mini">修改</el-button>
      </el-table-column>
    </template>

    <template v-else-if="this.isSelect == '用户列表'">
      <el-table-column
        align="center"
        prop="displayname"
        label="中文名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="mail"
        label="邮箱地址">
      </el-table-column>
      <el-table-column
        align="center"
        prop="role"
        label="角色权限">
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="账户名">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="200"
      >
        <el-button @click.native="isdelete = true" type="danger" size="mini">删除</el-button>
        <el-button @click.native="isupdate = true" type="primary" size="mini">修改</el-button>
      </el-table-column>
    </template>
  </el-table>
  <!--   分页-->
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :total="50"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</div>

   <el-dialog
     title="删除"
     :visible.sync="isdelete"
     width="30%"
     :append-to-body="true">
     <span>确认删除？</span>
     <span slot="footer" class="dialog-footer">
    <el-button @click="isdelete= false">取 消</el-button>
    <el-button type="primary" @click="isdelete = false; deleteSoft()">确认</el-button>
  </span>
   </el-dialog>

   <el-dialog
     title="修改"
     :visible.sync="isupdate"
     width="30%"
     :append-to-body="true">
     <el-form ref="form" label-width="80px">
       <el-form-item label="软件名称">
         <el-input v-model="soft_name"></el-input>
       </el-form-item>
       <el-form-item label="软件类型">
         <el-input v-model="soft_type" ></el-input>
       </el-form-item>

     </el-form>
     <span slot="footer" class="dialog-footer">
    <el-button @click="isupdate= false">取 消</el-button>
    <el-button type="primary" @click="isupdate = false; updateSoft()">确认</el-button>
  </span>
   </el-dialog>

  <el-dialog
  title="添加"
  :visible.sync="isAdd"
  width="30%"
  :before-close="Close"
  :append-to-body="true">
    <el-form ref="form" label-width="80px">
      <el-form-item label="集群名">
        <el-input v-model="cluster_name"></el-input>
      </el-form-item>
      <el-form-item label="集群类型">
        <el-input v-model="cluster_type" type="number"></el-input>
      </el-form-item>
      <el-form-item label="管理者">
        <el-input v-model="administrator"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="phone"></el-input>
      </el-form-item>
      <el-form-item label="总CPU">
        <el-input v-model="total_cpu" type="number"></el-input>
      </el-form-item>
      <el-form-item label="总内存">
        <el-input v-model="total_mem" type="number"></el-input>
      </el-form-item>
     </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="isAdd = false">取 消</el-button>
    <el-button type="primary" @click="isAdd = false; addCluster()">添 加</el-button>
  </span>
</el-dialog>

 </div>

</template>

<script>
export default {
  name: 'About',
  components: {
  },
  data(){
    return{
      isupdate:false,
      isdelete:false,
      listRow:{},
      isSelect:'集群列表',
      url:'http://192.168.1.7:8001',
      total:0,
      currentPage:1,
      isAdd:false,
      tableData:[],//初始
      cluster_name:'' ,
      cluster_type:0,
      administrator:'',
      phone:'',
      total_cpu:0,
      total_mem:0,
      soft_name:'',
      soft_type:'',
      soft_code:0,
    }
  },
  mounted(){
     this.getCluster();
  },
  filters:{
    getStatus(val){
      if(val == 0){
        return '正在使用'
      }else if( val == 1){
        return '待回收'
      }else if(val == 3){
        return '已回收'
      }
    }
  },
  methods: {
    getRow(row,column,event,cell) {
        this.listRow =row;
      console.log(row)
        this.soft_name = row.soft_name;
        this.soft_type = row.soft_type;
        this.soft_code = row.soft_code;
    },
    deleteSoft(){
      this.$axios.put(this.url+'/Softlist/delete?soft_code='+this.listRow.soft_code).then(res=>{
        this.tableData =res.data.msg;
        this.total = res.data.total;
        this.getSoftWareList();
      })
    },
    updateSoft(){
      this.$axios.put(this.url+'/Softlist/update',{
        soft_code:this.soft_code,
        soft_name:this.soft_name,
        soft_type:this.soft_type
      }).then(res=>{
        this.tableData =res.data.msg;
        this.total = res.data.total;
        this.getSoftWareList();
      })
    },

    handleCurrentChange(val){
      this.currentPage = val;
      if(this.isSelect == '集群列表'){
        this.getCluster();
      }else if(this.isSelect =='部署列表'){
        this.getAssignment();
      }else if(this.isSelect == '软件列表'){
        this.getSoftWareList();
      }else if(this.isSelect == '模板列表'){
        this.getTemplate();
      }else if(this.isSelect == '用户列表'){
        this.getUsers();
      }else if(this.isSelect == '我的模板'){
        this.getTemplateByname();
      }
    },
    change(ev){
      this.isSelect = ev;
      if(ev == '集群列表'){
        this.getCluster();
      }else if(ev =='部署列表'){
        this.getAssignment();
      }else if(ev == '软件列表'){
        this.getSoftWareList();
      }else if(ev == '模板列表'){
        this.getTemplate();
      }else if(ev == '用户列表'){
        this.getUsers();
      }else if(ev == '我的模板'){
        this.getTemplateByname();
      }
    },

     Close(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
    },

    //获取软件列表
    getSoftWareList(){
      this.$axios({
        method:'get',
        url:this.url+'/Softlist/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        console.log(res)
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //获取部署列表
    getAssignment(){
      this.$axios({
        method:'get',
        url:this.url+'/Assignment/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //获取集群列表
    getCluster(){
      this.$axios({
        method:'get',
        url:this.url+'/Cluster/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //获取模板列表
    getTemplate(){
      this.$axios({
        method:'get',
        url:this.url+'/Template/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //通过用户名获取模板列表
    getTemplateByname(){
      this.$axios({
        method:'get',
        url:this.url+'/Template/listByname?username=wuhanyf',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //获取用户列表
    getUsers(){
      this.$axios({
        method:'get',
        url:this.url+'/User/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    //添加集群
    addCluster(){
      this.$axios({
        method:'post',
        url:this.url+'/Cluster/add',
        data:{
          cluster_name:this.cluster_name ,
          cluster_type:this.cluster_type,
          administrator:this.administrator,
          phone:this.phone,
          total_cpu:this.total_cpu,
          total_mem:this.total_mem,
        },
      }).then(res => {
        this.getCluster();
      })
    },
    //添加用户
    addUser(){
      this.$axios({
        method:'post',
        url:this.url+'/User/add',
        data:{
          displayname:this.displayname ,
          mail:this.mail,
          role:this.role,
          username:this.username,
          password:this.password,
        },
      }).then(res => {
        this.getUsers();
      })
    }


}
}
</script>
<style scoped lang="scss">

.k8s{
.title{
  font-size:20px;
}
.content{
  margin-left:30%;
  position:fixed;
  left:0px;
  top:50px;
}
.butt{
  display:flex;
  justify-content: flex-start;
}
  .block{
    position:fixed;
    left:1000px;
    top:600px;
  }


}


</style>
