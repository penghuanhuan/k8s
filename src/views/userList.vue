<template>
<div>
  <div class="butt">
    <el-button type="primary" size="large" @click="isAdd = true">添加</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      align="center"
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      min-width="200"
      align="center"
      prop="mail"
      label="邮箱">
    </el-table-column>
    <el-table-column
      align="center"
      prop="displayname"
      label="中文名">
    </el-table-column>
    <el-table-column
      min-width="300"
      align="center"
      prop="role"
      label="角色">
    </el-table-column>
    <template v-if="Crole==='admin'">
      <el-table-column
        align="center"
        label="操作"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-button @click.native="isdelete = true,getRow(scope.row)" type="danger" size="mini">删除</el-button>
        </template>

      </el-table-column>
    </template>

  </el-table>

  <el-dialog
    title="删除"
    :visible.sync="isdelete"
    width="30%"
    :append-to-body="true">
    <span>确认删除？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isdelete= false">取 消</el-button>
    <el-button type="primary" @click="isdelete = false; deleteUser()">确认</el-button>
  </span>
  </el-dialog>

  <el-dialog
    title="添加"
    :visible.sync="isAdd"
    width="30%"
    :append-to-body="true">
    <el-form ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="mail" ></el-input>
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="displayname" ></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-radio v-model="role" label="admin">admin</el-radio>
        <el-radio v-model="role" label="user">user</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isAdd= false">取 消</el-button>
    <el-button type="primary" @click="isAdd = false; addUser()">确认</el-button>
  </span>
  </el-dialog>
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
</template>

<script>
export default {
  name: "userList",
  data(){
    return{
      tableData:[],
      isAdd:false,
      isdelete:false,
      url:'http://172.20.10.4:8001',
      currentPage: 1,
      currentTotal: 0,
      role:'admin',
      username:'',
      mail:'',
      displayname:'',
      Crole:"admin",

    }
  },
  mounted(){
    this.getUser();
    this.Crole=localStorage.getItem("role");
  },
  methods:{
    getRow(val){
      this.username = val.username;
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getUser();
    },
    getUser(){
      this.$axios({
        method:'get',
        url:this.url+'/User/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.currentTotal = res.data.total;
      })
    },
    addUser(){
      this.$axios({
        method:'post',
        url:this.url+'/User/add',
        data:{
          username:this.username,
          mail:this.mail,
          displayname:this.displayname,
          role:this.role,
        },
      }).then(res => {
       this.getUser();
      })
    },
    deleteUser(){
      this.$axios({
        method:'get',
        url:this.url+'/User/delete',
        params:{
          username:this.username,
        },
      }).then(res => {
        this.getUser();
       this.$message({
         message:res.data.msg,
         type:"success"
       })
      })
    }
  },
}
</script>

<style scoped>

</style>
