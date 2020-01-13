import Taro from '@tarojs/taro'
import configs from './index'

const baseUrl = configs.baseUrl

export const wd_get_num = (params = {}) => {
  return `${baseUrl}/post/dailynum`
}

export const wd_login = `${baseUrl}/auth/login`

export const wd_logout = `${baseUrl}/auth/logout`

// Taro.addInterceptor()
const token = Taro.getStorage('token')
export default {
  baseOptions(option, method = 'post') {
    let contentType = 'application/x-www-form-urlencoded'
    contentType = option.contentType || contentType
    option.access_token = token || ''
    option.lang = 'cn'
    const params = {
      url: option.url,
      method: method,
      data: option.params,
      header: {
        'content-type': contentType
      }
    }
    return Taro.request(params)
  },
  get(url, params = {}) {
    const option = { url, params }
    return this.baseOptions(option, 'get')
  },
  post(url, params = {}, contentType = '') {
    const option = { url, params, contentType }
    return this.baseOptions(option, 'post')
  }
}