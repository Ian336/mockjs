<!--
 * @Author: your name
 * @Date: 2020-10-20 22:25:17
 * @LastEditTime: 2020-10-21 00:55:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mock\src\views\mock.vue
-->
<template>
  <div>123
   <el-table :data="list" @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
     <el-table-column
      prop="addr"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>
    <el-table-column
      prop="birth"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
   </el-table>
   <input type="text" v-model="listQuery.name">
   <input type="text" v-model="addQuery.name">
   <button @click="checkName">查询</button>
   <button @click="addlist">增加</button>
   <button @click="dellist">删除</button>
   <button @click="updatalist">修改</button>
   <button @click="batchremove">批量删除</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
        list:[],
      listQuery: {
        page: 1,
        limit: 10,
        name:""
      },
      addQuery:{
         id:"0",
      name: "许志强",
      addr: "九江",
      age: 26,
      birth: "1992",
      sex: ""
      },
       delQuery:{
         id:"0", 
      },
      idsList:{ids:"1,2,3,4"}
      
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.idsList=val
       console.log("选择",val);
      },
    batchremove(){
       axios.post('/api/user/batchremove',{data:this.idsList}).then((res) => {
      console.log("删除",res)
      this.checkName()
      // this.list=res.data.data
    }).catch((err) => {
      // console.log(err)
    });
    },
    updatalist(){
      axios.get('/api/user/updateUser',{params:this.addQuery}).then((res) => {
      console.log("删除",res)
      // this.checkName()
      // this.list=res.data.data
    }).catch((err) => {
      // console.log(err)
    });
    },
    dellist(){
      axios.get('/api/user/deleteUser',{params:this.delQuery}).then((res) => {
   
     
      // console.log("删除",res)
      this.checkName()
      // this.list=res.data.data
    }).catch((err) => {
      // console.log(err)
    });
    },
    addlist(){
       axios.get('/api/user/createUser',{params:this.addQuery}).then((res) => {
   
     
      // console.log(res)
      this.checkName()
      // this.list=res.data.data
    }).catch((err) => {
      // console.log(err)
    });
    },
    checkName(){
     axios.get('/api/user/getUserList',{params:this.listQuery}).then((res) => {
     console.log("checkName -> this.listQuery", this.listQuery)
     
      // console.log(res)
      this.list=res.data.data
    }).catch((err) => {
      // console.log(err)
    });
  }},
  mounted() {
    // api就是你线上的网址
   this.checkName()
  }
}
</script>