//import Vue from 'vue' //生产环境需要注释
import Vuex from 'vuex'
import Axios from 'axios'

//Vue.use(Vuex)       //生产环境需要注释

const state = {
    // 登录信息
    loginUser: sessionStorage.getItem("loguser") || '游客',

    //登录用户信息
    userInfo: '',
    userPowerInfos:'',

    //留言
    lists: '',

    // 分页
    totalRecords: 1,//总页数
    curPage: 1 //当前页
}

const mutations = {
    getTotalRecord: (state,i) => {state.totalRecords = i},
    getCurPage: (state,i) => {state.curPage = i},
    getPublicList: (state,i) => {state.lists = i},
    getloginUser: (state,i) => {state.loginUser = i},
    getUserInfo: (state,i) => {state.userInfo = i},
    getUserPowerInfos: (state,i) => {state.userPowerInfos = i}

}

const actions = {
  getlu ({ commit }, i) {
      sessionStorage.setItem("loguser", i );
      commit('getloginUser', i)
  },
  gettr ({ commit }, i) {
      commit('getTotalRecord', i)
  },
  getcp ({ commit }, i) {
      commit('getCurPage', i)
  },
    //获取留言
  getpl ({ commit , state }) {
    Axios.get('index.php',{
      params: {
        c: "Index" ,p: "front" ,a: "getPage",
      }
    }).then((response) => {
      commit('getTotalRecord',response.data)
      Axios.get('index.php',{
        params: {
          c: "Index" ,
          p: "front" ,
          a: "getly" ,
          totalRecord: response.data,
          cur: state.curPage
        }
      }).then((re) => {
        commit('getPublicList', re.data)
        //console.log(state.lists)
      })
    })
  },
    //创建留言
  postly ({ commit , state }, param){
      Axios.post(
          'index.php?c=Index&p=front&a=post',{
              user: state.loginUser,
              userpost: param
          }).then((response) => {
          if(response.data){
              //alert('成功')
              return 1
          }else{
              //alert('失败')
              return 0
          }
      })
  },
    //获取登陆用户信息
  getuserinfo ({ commit , state }){
      Axios.get(
        'index.php',{
            params: {
                c: "UserInfo" ,
                p: "front" ,
                a: "show" ,
                user: state.loginUser
            }
        }
      ).then((response) => {
          if(response.data){
              state.userInfo = response.data
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  },
    //获取登陆用户留言
  getuserly ({ commit , state }){
      Axios.get('index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "getPage",
              user: state.loginUser
          }
      }).then((response) => {
          commit('getTotalRecord',response.data)
          Axios.get('index.php',{
              params: {
                  c: "UserInfo" ,
                  p: "front" ,
                  a: "getuserly" ,
                  user: state.loginUser,
                  totalRecord: response.data,
                  cur: state.curPage
              }
          }).then((re) => {
              commit('getPublicList', re.data)
              //console.log(state.lists)
          })
      })
  },
    //删除留言
  delly ({ commit , state }, param){
      //index.php?c=UserInfo&p=front&a=delete&id=".$values['id']
      Axios.get(
          'index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "delete",
              id: param
          }
      }).then((response) => {
          if(response.data){
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  },
    //获取会员权限 param用户名
  getpower ({ commit , state }){
      Axios.get('index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "getPowerPage",
              loginuser: state.loginUser
          }
      }).then((response) => {
            commit('getTotalRecord',response.data)
            Axios.get(
                'index.php',{
                params: {
                    c: "UserInfo" ,
                    p: "front" ,
                    a: "getpower",
                    loginuser: state.loginUser,
                    totalRecord: response.data,
                    cur: state.curPage
                }
            }).then((response) => {
                if(response.data){
                    commit('getUserPowerInfos',response.data)
                    //alert('成功')
                }else{
                    //alert('失败')
                }
            })
      })
  },
    //设置会员权限 param 设置用户名和等级
  setpower ({ commit , state }, param){
      Axios.get(
          'index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "setpower",
              loginuser: state.loginUser,
              username: param.username,
              powernum: param.powernum
          }
      }).then((response) => {
          if(response.data){
              //alert('成功')
              return 1
          }else{
              alert('失败')
              return 0
          }
      })
  },
  logout ({ commit , state }){
      Axios.get(
          'index.php',{
              params: {
                  c: "Index" ,
                  p: "front" ,
                  a: "logout",
                  user: state.loginUser
              }
          }).then((response) => {
          if(response.data){
              commit('getloginUser', '游客')
              sessionStorage.removeItem("loguser");
              commit('getUserPowerInfos', '')
              commit('getUserInfo', '')
              commit('getPublicList', '')
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})