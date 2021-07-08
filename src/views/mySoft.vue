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
        <template slot-scope="scope">
          <el-button @click.native="isdelete = true,getRow(scope.row)" type="danger" size="mini">删除</el-button>
          <el-button @click.native="isupdate = true,getRow(scope.row)" type="primary" size="mini">修改</el-button>
        </template>

      </el-table-column>
    </el-table>

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
      :append-to-body="true">
      <el-form ref="form" label-width="80px">
        <el-form-item label="软件名称">
          <el-input v-model="soft_name"></el-input>
        </el-form-item>
        <el-form-item label="软件类型">
          <el-input v-model="soft_type" ></el-input>
        </el-form-item>
        <el-form-item label="镜像地址">
          <el-input v-model="image_url" ></el-input>
        </el-form-item>
        <el-form-item label="挂载路径">
          <el-input v-model="mountpath" ></el-input>
        </el-form-item>
        <el-form-item label="配置文件内容">
          <el-input v-model="config" ></el-input>
        </el-form-item>
        <el-form-item label="配置端口">
          <el-input v-model="containerPort" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isAdd= false">取 消</el-button>
    <el-button type="primary" @click="isAdd = false; addSoft()">确认</el-button>
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
  name: "mySoft",
  data(){
    return{
      currentPage: 1,
      currentTotal: 0,
      url:'http://172.20.10.4:8001',
      tableData:[],
      isAdd:false,
      isupdate:false,
      isdelete:false,
      soft_name:'',
      soft_type:'',
      soft_code:0,
      image_url:'',
      mountpath:'',
      config:'',
      containerPort:''

    }
  },
  mounted() {
    this.getSoftWareList();
  },
  methods:{
    //获取软件列表
    getSoftWareList(){
      this.$axios({
        method:'get',
        url:this.url+'/Softlist/listByName',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.total = res.data.total;
      })
    },
    getRow(row){
      this.soft_name=row.soft_name;
      this.soft_type=row.soft_type;
      this.soft_code=row.soft_code;
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getSoftWareList();
    },
    deleteSoft(){
      this.$axios.put(this.url+'/Softlist/delete?soft_code='+this.soft_code).then(res=>{
        this.$message({
          message: res.data.msg,
          type: 'success',
        })
        this.getSoftWareList();
      }).catch(err=>{
        this.$message({
          message: '删除失败',
          type: 'error',
        })
      })
    },
    updateSoft(){
      this.$axios.put(this.url+'/Softlist/update',{
        soft_code:this.soft_code,
        soft_name:this.soft_name,
        soft_type:this.soft_type
      }).then(res=>{
        this.$message({
          message: res.data.msg,
          type: 'success',
        })
        this.getSoftWareList();
      }).catch(err=>{
        this.$message({
          message: '修改失败',
          type: 'error',
        })
      })
    },
    addSoft(){
      this.$axios({
        method:'post',
        url:this.url+'/Softlist/add',
        data:{
          soft_name:this.soft_name,
          soft_type:this.soft_type,
          soft_code:this.soft_code,
          url:this.image_url,
          mountpath:this.mountpath,
          config:this.config,
          containerPort:this.containerPort
        },
      }).then(res =>{
        this.$message({
          message:'添加成功',
          type:'success'
        })
        this.getSoftWareList();
      }).catch(err=>{
        this.$message({
          message:'添加失败',
          type:'error'
        })
      })
    }
  }
}
</script>

<style scoped>
.butt{
  display:flex;
  justify-content: flex-start;
}
</style>
