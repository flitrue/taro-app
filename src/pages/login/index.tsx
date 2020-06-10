import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import Api, { wd_login } from "../../configs/Api"
import './index.scss'


type LoginState = {
  username: string,
  password: string
}
export default class Login extends Component<{}, LoginState> {
  config: Config = {
    navigationBarTitleText: '登录'
  }
  
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  handleInputName(value) {
    this.setState({
      username: value
    })
  }

  handleInputPwd(value) {
    this.setState({
      password: value
    })
  }

  handleSubmit() {
    const params = {
      username: this.state.username,
      password: this.state.password
    }
    Api.post(wd_login, params).then(res => {
      if (res.data.code == 0) {
        Taro.setStorage({key: 'user_name', data: res.data.data.user_name})
        Taro.setStorage({key: 'user_id', data: res.data.data.user_id})
        Taro.setStorage({key: 'token', data: res.data.data.access_token})
        Taro.showToast({
          title: "登录成功",
          duration: 2000
        })
        setTimeout(() => {
          Taro.hideToast()
          Taro.navigateBack()
        }, 2000)
      }
    })
  }

  render() {
    const { username, password } = this.state
    return (
    <View className='login'>
      <AtForm onSubmit={this.handleSubmit.bind(this)}>
        <AtInput name='user' placeholder='用户名' value={username} onChange={this.handleInputName.bind(this)} />
        <AtInput name='password' type='password' value={password} placeholder='密码' onChange={this.handleInputPwd.bind(this)} />
        <AtButton formType='submit'>登录</AtButton>
      </AtForm>
    </View>
    )
  }
}