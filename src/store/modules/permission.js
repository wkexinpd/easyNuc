import { asyncRoutes, constantRoutes } from '../../router'

export function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    if (route.meta.roles.includes(role)) {
      return true
    }
  } else {
    return true
  }
}

export function filterAsyncRoutes (routes, role) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    console.log(tmp)
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, easyList) {
    return new Promise(resolve => {
      const accessedRoutes = []
      // if (rol)
      if (easyList[0].test === 1) {
        const arr = filterAsyncRoutes(asyncRoutes.indexExp, easyList[3].roleNum)
        for (let i = 0; i < arr.length; i++) {
          accessedRoutes.push(arr[i])
        }
      }
      if (easyList[1].askLeave === 1) {
        const arr = filterAsyncRoutes(asyncRoutes.indexLeave, easyList[3].roleNum)
        for (let i = 0; i < arr.length; i++) {
          accessedRoutes.push(arr[i])
        }
      }
      // if( easyList[2].register === 1 ){
      //   let arr = filterAsyncRoutes(asyncRoutes['indexLeave'],easyList[3].roleNum)
      //   accessedRoutes.push(arr[0])
      // }
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
