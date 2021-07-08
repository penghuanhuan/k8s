import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";
import Login from '../views/Login.vue'
import Cluster from '../views/Cluster.vue'
import AssignmentList from "../views/AssignmentList";
import SoftWareList from "../views/SoftWareList";
import AddAssignment from "../views/AddAssignment"
import mySoft from "../views/mySoft"
import warn from "../views/warn"
import Template from "../views/Template"
import addTemplate from "../views/addTemplate"
import userList from "../views/userList"
import owner from "../views/owner"
import myTemplate from "../views/myTemplate"
import TemplateDep from "../views/TemplateDep"
import myAssignment from "../views/myAssignment";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect:{
      name:'Cluster'
    },
    children:[
      {
        path: '/myAssignment',
        name: 'myAssignment',
        component: myAssignment
      },
      {
        path: '/TemplateDep',
        name: 'TemplateDep',
        component: TemplateDep
      },
      {
        path: '/myTemplate',
        name: 'MyTemplate',
        component: myTemplate
      },
      {
        path:'/cluster',
        name:'Cluster',
        component: Cluster
      },
      {
        path:'/assignmentList',
        name:'AssignmentList',
        component: AssignmentList
      },
      {
        path:'/softWareList',
        name:'SoftWareList',
        component:SoftWareList
      },
      {
        path:'/mySoft',
        name:'mySoft',
        component:mySoft
      },
      {
        path:'/addAssignment',
        name:'AddAssignment',
        component:AddAssignment
      },
      {
        path:'/warn',
        name:'warn',
        component:warn
      },
      {
        path:'/Template',
        name:'Template',
        component:Template
      },
      {
        path:'/addTemplate',
        name:'addTemplate',
        component:addTemplate
      },
      {
        path:'/userList',
        name:'userList',
        component:userList
      },
      {
        path:'/owner',
        name:'owner',
        component:owner
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
