import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import { fetchAverageInfo } from 'services/health'

import styles from './averageChart.module.scss'

export const setChartColor = (datum: any, myColor: string, compareColor: string) => {
  return datum.x === '나' ? myColor : compareColor
}

const AverageChart = () => {
  const { score } = fetchAverageInfo()

  return (
    <div className={styles.container}>
      <VictoryChart height={300}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize: 25 } }} />
        <VictoryBar
          barWidth={60}
          data={score}
          labels={({ datum }) => `${datum.value}점`}
          x='x'
          y='value'
          style={{
            data: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, '#ffd300', '#fe612c'),
            },
            labels: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, '#fe612c', 'black'),
              fontSize: 25,
            },
          }}
        />
        <VictoryLine data={score} x='x' y='value' />
        <VictoryScatter
          data={score}
          x='x'
          y='value'
          style={{
            data: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, 'grey', 'white'),
              stroke: ({ datum }: CallbackArgs) => setChartColor(datum, 'none', 'black'),
              strokeWidth: 1,
            },
          }}
          size={6}
        />
      </VictoryChart>
    </div>
  )
}

export default AverageChart
