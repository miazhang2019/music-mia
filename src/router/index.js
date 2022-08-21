import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '../App.vue'

// 导入
// import Recommend from '@/views/Recommend'
// import Rank from '@/views/Rank'
// import Singer from '@/views/Singer'
// import Search from '@/views/Search'
const Recommend = () =>
  import(/*webpackChunkName:'ImportFunDemo'*/ '@/views/Recommend')

const Rank = () => import(/*webpackChunkName:'ImportFunDemo'*/ '@/views/Rank')

const Singer = () =>
  import(/*webpackChunkName:'ImportFunDemo'*/ '@/views/Singer')

const Search = () =>
  import(/*webpackChunkName:'ImportFunDemo'*/ '@/views/Search')

const Detail = () =>
  import(/*webpackChunkName:'ImportFunDemo'*/ '@/views/Detail')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        // 二级路由前面不要有 /
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/search',
    component: Search
  }
]
/*
  注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  解决方案: 1.Router这两个不要使用history模式, 使用hash模式
            2.在服务端上面进行一些额外的配置
  * */
// 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
