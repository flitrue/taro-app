import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import F2 from "@antv/f2";
import "./index.scss";

export default class Home extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };

  draw(): void {
    // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    const data = [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 }
    ];

    const env_type = Taro.getEnv()
    let pixelRatio = 1
    if (env_type == 'WEB') {
      pixelRatio = window.devicePixelRatio
    } else {
      pixelRatio = Taro.getSystemInfoSync().pixelRatio
    }

    // Step 1: 创建 Chart 对象
    const chart = new F2.Chart({
      id: "my-chart",
      pixelRatio: pixelRatio // 指定分辨率
    });

    // Step 2: 载入数据源
    chart.source(data);

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position("genre*sold").color("genre");

    // Step 4: 渲染图表
    chart.render();
  }

  componentWillMount() {}

  componentDidMount() {
    //this.draw()
  }

  componentWillUnmount() {}

  componentDidShow() {
    
  }

  componentDidHide() {}

  render() {
    return (
      <View className="home">
        <Text>F2 图表!</Text>
        <View>
          <canvas id="my-chart" width="400" height="260"></canvas>
        </View>
      </View>
    );
  }
}
