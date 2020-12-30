import React from 'react'
import ReactFC from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import Chart from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme)

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: 'bar3D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      data,
      // Chart Configuration
      chart: {
        caption: 'Most Forked',
        yAxisName: 'Forks',
        xAxisName: 'Repos',
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',
      },
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
