import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'
import { setChartColor } from '../AverageChart'

import styles from './healthForecastChart.module.scss'

const HealthForecastChart = () => {
  const compareScoreDecade = [
    { x: '나', HealthScore: 875 },
    { x: '10년 후', HealthScore: 790 },
  ]

  return (
    <div className={styles.container}>
      <VictoryChart height={300}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize: 20 } }} />
        <VictoryBar
          data={compareScoreDecade}
          barWidth={60}
          x='x'
          y='HealthScore'
          labels={({ datum }) => `${datum.HealthScore}점`}
          style={{
            data: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, '#ffd300', '#fe612c'),
            },
            labels: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, '#fe612c', 'black'),
              fontSize: 20,
            },
          }}
        />
        <VictoryLine data={compareScoreDecade} x='x' y='HealthScore' />
        <VictoryScatter
          data={compareScoreDecade}
          x='x'
          y='HealthScore'
          style={{
            data: {
              fill: ({ datum }: CallbackArgs) => setChartColor(datum, 'grey', 'white'),
              stroke: ({ datum }: CallbackArgs) => setChartColor(datum, 'none', 'black'),
              strokeWidth: 1,
            },
          }}
          size={5}
        />
      </VictoryChart>
    </div>
  )
}

export default HealthForecastChart
