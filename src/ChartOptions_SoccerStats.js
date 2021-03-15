const chartoptions = {
  chart: {
    styleMode: true,
    zoomType: "xy",
    height: 950,
    width: 1500,
    marginRight: 60,
    marginLeft: 60,
    marginTop: 50,
    scrollablePlotArea: {
      scrollPositionX: 0
    }
  },
  tooltip: {
  headerFormat: '',
  pointFormat: 'Name: <b style="font-size: 10px">{point.name}</b><br/>Transfer Market Value: <b>€{point.y} Millions </b><br/># of Goals Scored: <b>{point.x}</b>'
},
  title: {
    text: ""
  },
  xAxis: {
    lineColor: "#000000",
    lineWidth: 1,
    title: {
      text: "# of Goals"
    }
  },
  yAxis: {
    tickAmount: 8,
    lineColor: "#000000",
    lineWidth: 1,
    title: {
      text: "Market Value"
    },
    labels: { enabled: true },
    min: ''
  },
  plotOptions: {
    scatter: {
    dataLabels: {
      format: "{point.name}",
      enabled: true,
      style: {
        fontSize: '9'+'px'
      }
    },
    
  }
  },
  credits: {
    enabled: false
  },
  series: [
    {
      showInLegend: true,
      name: "Market Value vs Goal Scatter Plot",
      type: "scatter",
      data: [],
      color: "#006388",
      marker: {
        radius: 3
      },
      credits: {
        enabled: false
      }
    },
    {
      showInLegend: true,
      name: "Avg Goals Scored",
      type: "line",
      data: [],
      marker: { enabled: false },
      color: "green",
      credits: {
        enabled: false
      },
      visible : false
    },
    {
      showInLegend: true,
      name: "Avg Market Value",
      type: "line",
      data: [],
      marker: { enabled: false },
      color: "blue",
      credits: {
        enabled: false
      },
      visible : false
    },
    {
      showInLegend: true,
      name: "Simple Regression Line",
      type: "line",
      data: [],
      marker: { enabled: false },
      color: "red",
      credits: {
        enabled: false
      }
    }
  ]
  
};

export default chartoptions