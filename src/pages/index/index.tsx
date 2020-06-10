import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { wd_get_num } from "../../configs/Api"
import './index.scss'

type IndexState = {
  num: number,
  user_name: string,
  is_login: boolean
}
export default class Index extends Component<{}, IndexState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
   super(props)
   this.state = {
     num: 0,
     user_name: '',
     is_login: false
   }
  }

  getNum() {
    Taro.request({
      url: wd_get_num(),
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).then ((res) => {
      this.setState({
        num: res.data.data.num
      })
    })
  }

  goLogin() {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  goHome() {
    Taro.navigateTo({
      url: '/pages/home/index'
    })
  }

  componentWillMount () { }

  componentDidMount () {
    this.getNum()
  }

  componentWillUnmount () { }

  componentDidShow () {
    const user_name = Taro.getStorageSync('user_name')
    const token = Taro.getStorageSync('token')
    this.setState({
      user_name,
      is_login: !!token
    })
   }

  componentDidHide () { }

  render () {
    const { num, user_name, is_login } = this.state
    return (
      <View className='index'>
        <View style='padding: 32px 0;'>
          用户名：{user_name}
        </View>
        <View className='num'>{num}</View>
        { is_login
          ?
          <View className='btn' >
            <AtButton type='primary' onClick={this.goHome}>进入</AtButton>
          </View>
          :
          <View className='btn' >
            <AtButton type='secondary' onClick={this.goLogin}>登录</AtButton>
          </View>
        }
      </View>
    )
  }
}
