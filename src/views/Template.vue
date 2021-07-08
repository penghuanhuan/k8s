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
  </div>
</template>

<script>
export default {
  name: "Template",
  data(){
    return{
      url:'http://172.20.10.4:8001',
      tableData:[],
      isAdd:false,
      currentPage: 1,
      currentTotal: 0,
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
    handleCurrentChange(val){
      this.currentPage = val;
      this.getTemplate();
    },
    add(){
      this.$router.push('./addTemplate')
    },
    //获取集群列表
    getTemplate(){
      this.$axios({
        method:'get',
        url:this.url+'/Template/list',
        params:{
          page:this.currentPage
        },
      }).then(res => {
        this.tableData =res.data.msg;
        this.currentTotal = res.data.total;
      })
    },
  },
}
</script>

<style scoped>

</style>
