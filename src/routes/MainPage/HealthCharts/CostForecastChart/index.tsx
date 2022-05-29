import { fetchForecastInfo } from 'services/health'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'
import { setChartColor } from '../AverageChart'

import styles from './costForecastChart.module.scss'

const CostForecastChart = () => {
  const { score } = fetchForecastInfo().expense

  return (
    <div className={styles.container}>
      <VictoryChart height={300}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize: 25 } }} />
        <VictoryBar
          data={score}
          barWidth={60}
          x='x'
          y='value'
          labels={({ datum }) => datum.value}
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

export default CostForecastChart
