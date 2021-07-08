<template>
<div>
  <div>
    <el-button size="large" type="danger" @click="warn()">到期警告</el-button>
  </div>
  <div>该操作仅能由管理员实现</div>
</div>
</template>

<script>
export default {
  name: "warn",
  data(){
    return{
      url:'http://172.20.10.4:8001'
    }
    },
  methods:{
    warn(){
      this.$axios({
        method:'post',
        url:this.url+'/resource/recycle',
        data:{
        },
      }).then(res =>{
        this.$message({
          message:res.data.msg,
          type:'success'
        })
      })
      }
  }


}
</script>

<style scoped>

</style>
