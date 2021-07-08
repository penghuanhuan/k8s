<template>
  <div class="box">
    <div class="butt">
      <el-button type="primary" size="large" @click="isAdd = true">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
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
<!--    添加-->
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
export default  {
  name: "Custer",
  data(){
    return{
      currentPage: 1,
      currentTotal: 0,
      url:'http://172.20.10.4:8001',
      isAdd:false,
      tableData:[],//初始
      cluster_name:'' ,
      cluster_type:0,
      administrator:'',
      phone:'',
      total_cpu:0,
      total_mem:0,
    }
  },
  mounted(){
    this.getCluster();
  },

  filters:{
  },
  methods: {

    handleCurrentChange(val){
      this.currentPage = val;
      this.getCluster();
    },
    Close(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
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
        this.currentTotal = res.data.total;
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
        this.cluster_name='' ,
          this.cluster_type=0,
          this.administrator='',
          this.phone='',
          this.total_cpu=0,
          this.total_mem=0,
          this.$message({
            message: '添加成功',
            type: 'success',
          })
      }).catch(errr=>{
        this.$message({
          message: '添加失败',
          type: 'error',
        })
      })
    }


  }
}
</script>

<style scoped lang="css">
.butt{
  display:flex;
  justify-content: flex-start;
}
.block{
  /*position:fixed;*/
  /*left:400px;*/
  /*top:650px;*/
}

</style>
