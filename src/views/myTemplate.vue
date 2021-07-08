<template>
  <div class="box">
    <div class="butt">
      <el-button type="primary" size="large" @click="add()">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="template_id"
        label="模板id">
      </el-table-column>
      <el-table-column
        min-width="150"
        align="center"
        prop="soft_names"
        label="软件名">
        <template slot-scope="scope">{{scope.row.soft_names|getName}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="template_name"
        label="模板名">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="getRow(scope.row);isdelete=true">删除</el-button>
        </template>
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
      :append-to-body="true">
      <el-form ref="form" label-width="80px">
        <el-form-item label="集群名">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item label="集群类型">
          <el-input  type="number"></el-input>
        </el-form-item>
        <el-form-item label="管理者">
          <el-input ></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isAdd = false">取 消</el-button>
    <el-button type="primary" @click="isAdd = false; ">添 加</el-button>
  </span>
    </el-dialog>

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
  </div>
</template>

<script>
export default {
  name: "myTemplate",
  components: {},
  data(){
    return{
      url:'http://172.20.10.4:8001',
      tableData:[],
      isAdd:false,
      isdelete:false,
      currentPage: 1,
      currentTotal: 0,
      template_id:0,
    }
  },
  mounted() {
    this.getTemplate();
  },
  filters:{
    getName(val){
      let  res = val.join(",")
      return res;
    }
  },
  methods:{
    getRow(val){
      this.template_id = val.template_id;
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getTemplate();
    },
    add(){
      this.$router.push('./addTemplate')
    },
    //获列表
    getTemplate(){
      this.$axios({
        method:'get',
        url:this.url+'/Template/listByName',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.currentTotal = res.data.total;
      })
    },
    //删除
    deleteTem(){
      this.$axios({
        method:'post',
        url:this.url+'/Template/delete',
        params:{
          id:this.template_id
        },
      }).then(res => {
        this.$message({
          message:'删除成功',
          type:'success'
        }),
          this.getTemplate();
      }).catch(err=>{
        this.$message({
          message:'删除失败',
          type:'error'
        })
      })
    }
  },
}
</script>

<style scoped>

</style>
