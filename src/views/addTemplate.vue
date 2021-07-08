<template>
<div>
  <ul  class="box" >
      <li class="content">
        <div class="lab">模板名称</div>
        <div class="input">
          <el-input  v-model="temname"></el-input>
        </div>
      </li>
      <li class="content">
        <div class="lab">软件列表</div>
        <div >
          <el-button type="primary" @click="isAddSoft = true">添加</el-button>
        </div>
      </li>
      <div v-for="(item,index) of softList" :key="index" class="list">
        <ul>
          <li class="flexbox">
            <div class="mar-l">序号:{{index+1}}</div>
            <div class="mar-l">软件编号:{{item.soft_code}}</div>
            <div  class="mar-l">cpu限制:{{item.cpu_limit}}</div>
          </li>
          <li class="flexbox">
            <div  class="mar-l">内存限制:{{item.mem_limit}}</div>
            <div  class="mar-l">cpu需求:{{item.cpu_require}}</div>
            <div class="mar-l" >内存需求:{{item.mem_require}}</div>
          </li>
        </ul>
      </div>
      </ul>
  <el-dialog
    title="添加软件列表"
    :visible.sync="isAddSoft"
    width="30%"
    :append-to-body="true">
    <el-form ref="softForm"  label-width="80px">
      <el-form-item label="软件编号">
        <el-input v-model="soft_code"></el-input>
      </el-form-item>
      <el-form-item label="cpu限制">
        <el-input v-model="cpu_limit" type="number"></el-input>
      </el-form-item>
      <el-form-item label="cpu需求">
        <el-input v-model="cpu_require"  type="number"></el-input>
      </el-form-item>
      <el-form-item label="内存限制">
        <el-input v-model="mem_limit"  type="number"></el-input>
      </el-form-item>
      <el-form-item label="内存需求">
        <el-input v-model="mem_require"  type="number"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isAddSoft= false">取 消</el-button>
    <el-button type="primary" @click="isAddSoft = false;addSoft()">确认</el-button>
  </span>
  </el-dialog>
  <div>
    <el-button type="danger" style="margin-left:800px;margin-top:50px;" @click="add()">添加</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "addTemplate",
  data(){
    return{
      isAddSoft:false,
      temname:"",
      softList:[],
      url:'http://172.20.10.4:8001',
      soft_code:'',// 软件编号
      cpu_limit:'',// cpu限制
      cpu_require:'',// cpu需求
      mem_limit:'',// 内存限制
      mem_require:'',//内存需求
  }},
  methods:{
    addSoft(){
      let obj={};
      obj.soft_code=this.soft_code
      obj.cpu_limit=this.cpu_limit
      obj.cpu_require=this.cpu_require
      obj.mem_limit=this.mem_limit
      obj.mem_require=this.mem_require
      this.softList[this.softList.length]=obj;
      console.log(this.softList)
      this.soft_code='';
      this.cpu_limit='';
      this.cpu_require='';
      this.mem_limit='';
      this.mem_require='';
    },
    add(){
      this.$axios({
        method:'post',
        url:this.url+'/Template/create',
        data:{
          temname:this.temname,
          soft_list:this.softList,
        },
      }).then(res =>{
        this.$message({
          message:res.data.msg,
          type:"success"
        })
        this.$router.push("./myTemplate")
      }).catch(err=>{
        this.$message({
          message:"添加失败",
          type:"error"
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
ul{
  li{
    list-style: none;
    margin-top:15px;
  }
}
.box{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.content{
  display: flex;
  justify-content: space-between;
  .lab{
    margin-right: 10px;
  }
}
.list{
  color:gray ;
  font-size:10px;
  width:400px;
  margin:10px;
  border-bottom:1px solid #8888;
  .mar-l{
    margin-left:30px;
  }
}
.flexbox{
  display: flex;
  justify-content: flex-start;
}
</style>
