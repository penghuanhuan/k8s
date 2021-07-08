<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
      <el-table-column
        width="100"
        align="center"
        prop="cluster_id"
        label="所在集群ID">
      </el-table-column>
      <el-table-column
        min-width="50"
        align="center"
        prop="assign_username"
        label="部署者">
      </el-table-column>
      <el-table-column
        min-width="100"
        align="center"
        prop="taskname"
        label="环境名">
      </el-table-column>
      <el-table-column
        min-width="100"
        align="center"
        prop="namespace"
        label="命名空间">
      </el-table-column>
      <el-table-column
        min-width="100"
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
    <template v-if="role === 'admin'">
      <el-table-column
        min-width="150"
        align="center"
        label="操作">
        <template slot-scope="scope" v-if="scope.row.recycle_status === 0">
            <el-button type="danger" size="mini" @click="getRow(scope.row);isdelete=true">回收</el-button>
            <el-button type="success" size="mini" @click="getRow(scope.row);isRenewal =true">续期</el-button>
          <el-button type="primary" size="mini" @click="getRow(scope.row);isShow=true;Show()">查看</el-button>
        </template>
      </el-table-column>
    </template>

    </el-table>
  <!--   分页-->
  <div class="block">
    <el-pagination
      layout="prev, pager, next"
      :total="100"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
    <!--    删除-->
    <el-dialog
      title="删除"
      :visible.sync="isdelete"
      width="30%"
      :append-to-body="true">
      <span>确定删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isdelete = false">取 消</el-button>
    <el-button type="primary" @click="isdelete = false; deleteTem()">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 续期-->
    <el-dialog
      title="续期"
      :visible.sync="isRenewal"
      width="30%"
      :append-to-body="true">
      <el-form ref=""  label-width="80px">
        <el-form-item label="续期时长">
          <el-input v-model="time" placeholder="请输入续期时长（单位小时）"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isRenewal = false">取 消</el-button>
    <el-button type="primary" @click="isRenewal = false; renewal()">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 查看-->
    <el-dialog
      title="部署状态"
      :visible.sync="isShow"
      width="30%"
      :append-to-body="true">
      <div style="white-space: pre-wrap">{{status}}</div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="isShow = false;">关闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "AssignmentList",
  data(){
    return{
      url:'http://172.31.15.69:30000',
      //url:'http://192.168.1.20:8001',
      currentPage:1,
      tableData:[],
      taskname:'',
      namespace:"",
      isdelete:false,
      isRenewal:false,
      time:0,
      role:'admin',
      isShow:false,
      status:'',

    }
  },
  mounted() {
    this.getAssignment();
    this.role=localStorage.getItem("role");
  },
  filters:{
    getStatus(val){
      if(val === 0){
        return '正在使用'
      }else if( val === 1){
        return '待回收'
      }else if(val === 3){
        return '已回收'
      }
    }
  },
  methods:{
    Show(){
      this.$axios({
        method:'get',
        url:this.url+'/Environment/information',
        params:{
          namespace : this.namespace,
          taskname :this.taskname,
        },
      }).then(res =>{
        this.status = res.data.msg;
      })
    },
    getRow(val){
      this.namespace =val.namespace;
      this.taskname=val.taskname;
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getAssignment();
    },
    //续期
    renewal(){
      this.$axios({
        method:'post',
        url:this.url+'/Environment/renewal',
        data:{
          namespace : this.namespace,
          taskname :this.taskname,
          time:this.time
        },
      }).then(res => {
        if (res.data.status === 'success') {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
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
    deleteTem(){

      this.$axios({
        method:'post',
        url:this.url+'/Environment/delete',
        data:{
         namespace : this.namespace,
         taskname :this.taskname,
        },
      }).then(res => {
        if(res.data.status=== 'success'){
          this.$message({
            message:res.data.msg,
            type:'success'
          }),
            this.getTemplate();
        }else{
          this.$message({
            message:res.data.msg,
            type:'error'
          })
        }

      })
    }
  },
}
</script>

<style scoped lang="scss">

</style>
