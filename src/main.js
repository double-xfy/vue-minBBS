import Vue from 'vue'                  //生产环境需要注释
import VueRouter from 'vue-router'     //生产环境需要注释
import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Info from './components/Info'
import module from './components/module'
import PrivateLetter from './components/PrivateLetter'
import OtherUserInfo from './components/OtherUserInfo'
import Power from './components/Power'
import Vote from './components/Vote'
import InputVote from './components/InputVote'
import VoteList from './components/VoteList'
import VoteListsEnd from'./components/VoteListsEnd'
import store from './store'

Vue.use(VueRouter)


const routes = [{
  path : '/home',
  component: Home,
  name: 'home'
},{
  path : '/login',
  meta: { auth: false },
  component: Login
},{
  path : '/',
  meta: { auth: false },
  redirect: { name: 'home' },
  component: Home
},{
  path : '/register',
  component: Register
},{
  path: '/otheruserinfo',
  name: 'otheruserinfo',
  component: OtherUserInfo,
  children:[{
    path: 'sendprivateletter/:othuser',
    name: 'sendprivateletter',
    component: PrivateLetter
  }]
},{
  path : '/info',
  name: 'info',
  component: Info,
  children: [{
    path: 'power',
    component: Power,
    name: 'power'
  },{
    path: 'module',
    component: module,
    name: 'module'
  },{
    path : 'privateletter',
    name : 'privateletter',
    component: PrivateLetter
  },{
    path: 'colvotelists',
    name: 'colvotelists',
    component: VoteListsEnd
  }]
},{
  path: '/vote',
  name: 'vote',
  component: Vote,
  children: [{
    path: 'inputvote',
    name: 'inputvote',
    component: InputVote
  },{
    path: 'votelist',
    name: 'votelist',
    component: VoteList
  },{
    path: 'votelistsend',
    name: 'votelistsend',
    component: VoteListsEnd
  }]
}
]


const router = new VueRouter({
  //mode: 'history',
  //base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})


const app = new Vue({
  //el: '#app',
  router,
  store,
  ...App
}).$mount('#app')
