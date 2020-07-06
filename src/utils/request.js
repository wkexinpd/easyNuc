import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from './auth'
import store from '../store'

const service = axios.create({
  baseURL: 'https://www.rwbb.xyz:443',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(res)
    if (res.status !== 200) {
      Message({
        message: res.msg || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // console.log(res)
      return res
    }
  },
  error => {
    console.log({ error })
    const { msg } = error.response.data
    Message({
      message: msg || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
