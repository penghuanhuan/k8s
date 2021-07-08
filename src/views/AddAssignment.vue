<template>
<div >
<div>
  <ul  class="box" >
    <div class="box-c">
      <li class="content">
        <div class="lab">集群id</div>
        <div class="input">
          <el-input type="number" v-model="cluster_id"></el-input>
        </div>
      </li>
      <li class="content">
        <div class="lab">副本数</div>
        <div class="input">
          <el-input type="number" v-model="replicas"></el-input>
        </div>
      </li>
    </div>
    <div  class="box-c">
      <li class="content">
        <div class="lab">命名空间</div>
        <div class="input">
          <el-input v-model="namespace"></el-input>
        </div>
      </li>
      <li class="content">
        <div class="lab">任务名</div>
        <div class="input">
          <el-input v-model="taskname"></el-input>
        </div>
      </li>
<!--      <li class="content">-->
<!--        <div class="lab">用户名</div>-->
<!--        <div class="input">-->
<!--          <el-input></el-input>-->
<!--        </div>-->
<!--      </li>-->
    </div>
    <div  class="box-c">

      <li class="content">
        <div class="lab">使用时长</div>
        <div class="input">
          <el-input v-model="use_period"></el-input>
        </div>
      </li>
    </div>

    <div class="box-c ">
      <div class="flex-c">
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
      </div>
      <div class="flex-c">
        <li class="content">
          <div class="lab">环境变量列表</div>
          <div >
            <el-button type="primary" @click="isAddList = true">添加</el-button>
          </div>
        </li>
        <div v-for="(item,index) of List" :key="index" class="list">
          <ul>
            <li class="flexbox">
              <div class="mar-l">序号:{{index+1}}</div>
              <div class="mar-l">变量名:{{item.name}}</div>
              <div  class="mar-l">变量值:{{item.value}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ul>
  <div>
    <el-button type="danger" style="margin-left:800px;margin-top:50px;" @click="up()">部署</el-button>
  </div>


</div>
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

  <el-dialog
    title="添加环境变量"
    :visible.sync="isAddList"
    width="30%"
    :append-to-body="true">
    <el-form ref="softForm"  label-width="80px">
      <el-form-item label="变量名">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="变量值">
        <el-input v-model="value"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isAddList= false">取 消</el-button>
    <el-button type="primary" @click="isAddList = false;addList()">确认</el-button>
  </span>
  </el-dialog>
  <el-dialog
    title=""
    :visible.sync="isMsg"
    width="30%"
    :append-to-body="true">
    <div style="white-space: pre-wrap">{{msg}}</div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isMsg= false">关闭</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "AddAssignment",
  data(){
    return{
      isAddList:false,
      isAddSoft:false,
      url:'http://172.31.15.69:30000',
      cluster_id:0,//集群id
      replicas:0,//副本数
      namespace:'',//命名空间
      taskname:'',//任务名
      use_period:'',//使用时长
      soft_code:'',// 软件编号
        cpu_limit:'',// cpu限制
        cpu_require:'',// cpu需求
        mem_limit:'',// 内存限制
        mem_require:'',//内存需求
      softList:[],
      name:'',
      value:'',
      List:[],
      msg:'',
      isMsg:false

    }
  },
  mounted:{

  },
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
    addList(){
      let obj={};
      obj.name=this.name;
      obj.value=this.value;
      this.List[this.List.length]=obj;
      this.name='';
      this.value='';
    },
    up(){
      let username = localStorage.getItem("displayname")
      this.$axios({
        method:'post',
        url:this.url+'/Environment/create',
        data:{
          cluster_id:this.cluster_id,//集群id
          replicas:this.replicas,//副本数
          namespace:this.namespace,//命名空间
          taskname:this.taskname,//任务名
          use_period:this.use_period,//使用时长
          soft_list:this.softList,
          envList:this.List,
          assign_username:username
        },
      }).then(res =>{
      this.msg= res.data.msg;
      this.isMsg=true;
      })
    }
  },
}
</script>

<style scoped lang="scss">
ul{
  li{
    list-style-type: none;
  }
}
.box{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.flex-c{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
.box-c{
  display: flex;
  justify-content: space-between;
}
.flexbox{
  display: flex;
  justify-content: flex-start;
}
.content{
  width:500px;
  display: flex;
  justify-content: flex-start;
  margin-top:20px;
  .lab{
    width:100px;
    margin-right:10px;
  }
}
</style>
