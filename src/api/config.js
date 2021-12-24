import axios from 'axios'

// 开发环境
export const baseUrl = 'https://music-api-five.vercel.app'
// 测试环境
// export const baseUrl = 'http://121.41.42.16:3000'

//axios 的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误')
  }
)

export {
  axiosInstance
}