import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './utils/cookie'

// 创建axios实例
const service = axios.create({
  // baseURL: "http://128.1.164.211:8080/api", 
  timeout: 120000 // 请求超时时间
})

export const $get = (obj) => {
  console.log('get param: ', obj.param)
  return axios.get(obj.url, { params: obj.param })

  // .then(res => {
  //   return res;
  // }).catch(err => {
  //   // errCallback && errCallback();
  //   return err;
  // })
}

export const $post = (obj) => {
  console.log('post param: ', obj.param)
  if (obj.url == '/data/uploadPhotos' || obj.url == '/data/uploadVideos') {
    return axios.post(obj.url, obj.param)
  } else {
    return axios.post(obj.url, QS.stringify(obj.param))
  }
}

// request拦截器设置
service.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  //   if (getToken()) {
  //     config.headers['Authorization'] = 'Bearer ' + getToken() // 请求头设置自带 token
  //   }
  //   config.headers['Content-Type'] = 'application/json' // 请求的数据格式为 json
  //   return config
  // },
  // error => {
  //   console.log(error)
  //   Promise.reject(error)
  }
)

// response 拦截器设置
service.interceptors.response.use(
  response => {
    console.log(response);
    const data = response.data;
    const code = data.code;
    const message = data.message;
    if (code === 200) {
      return data.data
    } else {
      Message({
        type: 'error',
        message
      })
      return Promise.reject('error')
    }
  },
  error => {
      Message({
        type: 'error',
        message: '接口请求失败'
      })
    return Promise.reject(error)
  }
)

export default service
