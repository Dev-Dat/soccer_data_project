import React, { Component } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import ChartOptions from './ChartOptions_SoccerStats'
highchartsMore(Highcharts);

class SoccerStats extends Component {
  constructor(props) {
    super(props)
    this.state ={
      name: [],
      options: ChartOptions
    }
  }

  componentDidMount() {
    fetch('/playerinfo61.json',
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

      // object type
      let namevaluegoals = []
      console.log(data[0].player_goals)
      for (let i = 0; i < data.length; i++) {
      namevaluegoals.push({
        "x" : parseInt(data[i].player_goals),
        "y" : parseInt(data[i].player_mktValue_Recent.slice(1,6)),
        "name" : data[i].player_name
      })
      }
    
      // 득점 vs 시장가치 회귀식 계산    

      // X 평균
      let sumX = 0
      let avgX = 0
      for (let i = 0; i < data.length; i++) {
      sumX += parseInt(data[i].player_goals)
      }
      avgX = parseFloat((sumX/data.length).toFixed(2))
      console.log('sum_X', sumX)
      console.log('avg_X', avgX)
      
      let lineAvgX = []
      for (let i = 0; i < data.length-360; i++) {
        lineAvgX.push([avgX, i])
      }
      console.log('avg_X_line', lineAvgX)
      
      // Y 평균
      let sumY = 0
      let avgY = 0
      for (let i = 0; i < data.length; i++) {
      sumY += parseInt(data[i].player_mktValue_Recent.slice(1,6))
      }
      avgY = parseFloat((sumY/data.length).toFixed(2))
      console.log('sum_Y', sumY)
      console.log('avg_Y', avgY)
      
      let lineAvgY = []
      for (let i = 0; i < (data.length-440); i++) {
        lineAvgY.push([i, avgY])
      }
      console.log('avg_Y_line', lineAvgY)
      
      // beta1 (회귀선 기울기)
      let xydiffsum = 0
      let xxdiffsum = 0
      let beta1 = 0
      for (let i = 0; i < data.length; i++) {
       xydiffsum += (parseInt(data[i].player_goals) - avgX) * (parseInt(data[i].player_mktValue_Recent.slice(1,6)) - avgY)
       xxdiffsum += (parseInt(data[i].player_goals) - avgX) ** 2
       beta1 = parseFloat((xydiffsum/xxdiffsum).toFixed(2))
      }
      console.log('x-y covariance', xydiffsum)
      console.log('x variance', xxdiffsum)
      console.log('beta1', beta1)

      // beta0 = y_avg - beta1*x_avg  (회귀선 절편)
      let beta0 = 0
      beta0 = parseFloat((avgY - beta1 * avgX).toFixed(2))
      console.log('beta0', beta0)

      // 회귀선 좌표 찍기
      // 회귀식 =>  y_hat = b0_hat + b1_hat * x
      let regline = []
      for (let i = 0; i < data.length; i++) {
        regline.push([parseInt(data[i].player_goals), parseInt(data[i].player_goals) * beta1 + beta0])
      }

      // 옵션 복제 및 스테이트 업데이트
      const CopyOptions = {...this.state.options}
      CopyOptions.series[0].data = namevaluegoals
      CopyOptions.series[1].data = lineAvgX
      CopyOptions.series[2].data = lineAvgY
      CopyOptions.series[3].data = regline

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

export default SoccerStats;