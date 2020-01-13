import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { wd_get_num } from "../../configs/Api"
import './index.scss'

type IndexState = {
  num: number
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
     num: 0
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

  componentWillMount () { }

  componentDidMount () {
    this.getNum()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { num } = this.state
    return (
      <View className='index'>
        <View className='num'>{num}</View>
        <View className='btn'>
          <AtButton type='primary' onClick={this.goLogin}>登录</AtButton>
        </View>
      </View>
    )
  }
}
