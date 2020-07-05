import router from './router'
import store from './store'
import { Message } from "element-ui"
import { getToken } from "./utils/auth"

const whiteList = [ '/login' ]

router.beforeEach( async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    }else{
      const hasRoles = store.getters.newEasyList && store.getters.newEasyList.length > 0
      if( hasRoles ){
        next()
      } else {
        try{
          const easyList = await store.dispatch('user/getInfo')
        //  动态路由的生成
          const accessRoutes = await store.dispatch('permission/generateRoutes',easyList)
          console.log(accessRoutes);
          router.addRoutes(accessRoutes)
          next({...to, replace: true})
        }catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
} )
