/**
 * Created by qqwan on 2018/4/18.
 */
import axios from 'axios'
import { router } from '../router/index'
import { Message } from 'element-ui'

export default function fetch (options) {
  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const axiosInstance = axios.create({
      // 设置默认根地址
      baseURL: '/',
      // 设置请求超时设置
      timeout: 30 * 1000,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      withCredentials: true
    })
    // 请求处理
    axiosInstance(options).then((response) => {
      let {retCode, msg, data} = response.data
      // 请求成功时,根据业务判断状态
      if (retCode === 0) {
        return resolve({ retCode, msg, data })
      } else if (retCode === 401) {
        router.replace({name: 'login'})
      } else { // 401表示未登录
        /*eslint-disable */
        reject({ retCode, msg, data })
      }
    }).catch((error) => {
      // 请求失败时,根据业务判断状态
      if (error.response) {
        let resError = error.response
        let resCode = resError.status
        let resMsg = error.message
        Message.error(resMsg)
        /*eslint-disable */
        reject({ retCode: resCode, msg: resMsg })
      }
    })
  })
}
