import React, { Component } from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import chartoptions from './ChartOptions_PlayerStats'
HighchartsMore(Highcharts);

class PlayerStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: [],
      options: chartoptions
    }
  }

  componentDidMount() {
    fetch('/playerinfo53.json',
    {
      Method: "GET",
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      }
    )
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(data => {
      console.log(data)
      // // 차트 그리기 시작
      // console.log(data.length)
      // console.log(data[0].player_rank)

      // object type
      let namevaluegoals = []
      for (let i = 0; i < data.length; i++) {
      namevaluegoals.push({
        "x" : parseInt(data[i].player_goals[0]),
        "y" : parseInt(data[i].player_mktValue[0].slice(1,6)),
        "z" : parseInt(data[i].player_age[0]),
        "name" : data[i].player_name[0]
      })
      }
      console.log(namevaluegoals) 

      // 득점 vs 시장가치 회귀식 계산    

      // X 평균
      // let sumX = 0
      // let avgX = 0
      // for (let i = 0; i < data.length; i++) {
      // sumX += parseInt(data[i].player_goals[0])
      // avgX = sumX/data.length
      // }
      // console.log(sumX)
      // console.log(avgX)
      
      // let lineAvgX = []
      // for (let i = 0; i < data.length; i++) {
      //   lineAvgX.push([avgX, i*0.4])
      // }
      // console.log(lineAvgX)
      
      // // Y 평균
      // let sumY = 0
      // let avgY = 0
      // for (let i = 0; i < data.length; i++) {
      // sumY += parseInt(data[i].player_mktValue[0].slice(1,6))
      // avgY = sumY/data.length
      // }
      // console.log(sumY)
      // console.log(avgY)
      
      // let lineAvgY = []
      // for (let i = 0; i < data.length; i++) {
      //   lineAvgY.push([i*0.1, avgY])
      // }
      // console.log(lineAvgY)
      
      // // beta1 (회귀선 기울기)
      // let xydiffsum = 0
      // let xxdiffsum = 0
      // let beta1 = 0
      // for (let i = 0; i < data.length; i++) {
      //  xydiffsum += (parseInt(data[i].player_goals[0]) - avgX) * (parseInt(data[i].player_mktValue[0].slice(1,6)) - avgY)
      //  xxdiffsum += (parseInt(data[i].player_goals[0]) - avgX) ** 2
      //  beta1 = xydiffsum/xxdiffsum
      // }
      // console.log(xydiffsum)
      // console.log(xxdiffsum)
      // console.log(beta1)

     
      // // beta0 = y_avg - beta1*x_avg  (회귀선 절편)
      // let beta0 = 0
      // beta0 = avgY - beta1 * avgX
      // console.log(beta0)


      // // 회귀선 좌표 찍기
      // // 회귀식 =>  y_hat = b0_hat + b1_hat * x
      // let regline = []
      // for (let i = 0; i < data.length; i++) {
      //   regline.push([parseInt(data[i].player_goals[0]), parseInt(data[i].player_goals[0]) * beta1 + beta0])
      // }
      // console.log(regline)


      // 옵션 복제 및 스테이트 업데이트
      const CopyOptions = {...this.state.options}
      CopyOptions.series[0].data = namevaluegoals
      // CopyOptions.series[1].data = lineAvgX
      // CopyOptions.series[2].data = lineAvgY
      // CopyOptions.series[3].data = regline

      this.setState({
        options: CopyOptions,
      })
    })
  }
  render() {
    return(
      <HighchartsReact
      Highcharts={Highcharts}
      options={this.state.options}>
      </HighchartsReact>
    )
  }
}

export default PlayerStats;