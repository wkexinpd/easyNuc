import {getToken, setToken, removeToken} from "../../utils/auth"
import { login } from '../../api/user'

const state = {
  // userNum  登陆者的账号
  // userName 登陆者的姓名
  // userPhone 登陆者的联系方式
  // token: '',  登陆者的令牌
  // roleNum: '' 登陆者的权限
  // collage 所在系
  //test、askLeave、register分别代表实验、请假、签到权限 0为没有该权限 1为有该权限
  token: getToken(),
  userNum: '',
  userName: '',
  userPhone: '',
  roleNum: 0,
  collage: 0,
  test: 0,
  askLeave: 0,
  register: 0,
  newEasyList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNUM: (state, userNum) => {
    state.userNum = userNum
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_USERPHONE: (state, userPhone) => {
    state.userPhone = userPhone
  },
  SET_ROLENUM: (state, roleNum) => {
    state.roleNum = roleNum
  },
  SET_COLLAGE: (state, collage) => {
    state.collage = collage
  },
  SET_TEST: ( state, test ) => {
    state.test = test
  },
  SET_ASKLEAVE: ( state, askLeave ) => {
    state.askLeave = askLeave
  },
  SET_REGISTER: ( state, register ) => {
    state.register = register
  },
  SET_NEWEASYLIST: ( state, newEasyList ) => {
    state.newEasyList = newEasyList
  }
}

const actions = {
  login({ commit },userInfo){
    const { userNum, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ lvUserNum: userNum.trim(), lvUserPassword: password }).then(response => {
        console.log(response)
        const { data, model_power } = response
        const {token, lvUserNum, lvUserName, lvUserPhone, roleNum, collage} = data
        const { test, askLeave, register } = model_power
        console.log(response);
        commit('SET_TOKEN',token)
        setToken(token)
        commit('SET_USERNUM', lvUserNum)
        commit('SET_USERNAME', lvUserName)
        commit('SET_USERPHONE', lvUserPhone)
        commit('SET_ROLENUM', roleNum)
        commit('SET_COLLAGE', collage)
        commit('SET_TEST', test)
        commit('SET_ASKLEAVE', askLeave)
        commit('SET_REGISTER', register)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let test = state.test
        let askLeave = state.askLeave
        let register = state.register
        let roleNum = state.roleNum
        let arr = [
            { "test": test },
            { "askLeave": askLeave },
            { "register": register },
            { "roleNum": roleNum }
          ]
        commit('SET_NEWEASYLIST', arr)
        resolve(arr)
      },500)
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try{
        commit('SET_TOKEN', '')
        commit('SET_TEST', 0)
        commit('SET_ASKLEAVE', 0)
        commit('SET_REGISTER', 0)
        removeToken()
        //路由重定向

        resolve()
      }catch (error) {
        reject(error)
      }
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_TEST', 0)
      commit('SET_ASKLEAVE', 0)
      commit('SET_REGISTER', 0)
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
