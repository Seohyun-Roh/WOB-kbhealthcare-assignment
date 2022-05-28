import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import styles from './averageChart.module.scss'

const AverageChart = () => {
  const comparePeerAverage = [
    { x: '나', HealthScore: 875 },
    { x: '30대 남성', HealthScore: 866 },
  ]

  return (
    <div className={styles.container}>
      <VictoryChart height={300}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize: 20 } }} />
        <VictoryBar
          barWidth={60}
          data={comparePeerAverage}
          labels={({ datum }) => `${datum.HealthScore}점`}
          x='x'
          y='HealthScore'
          style={{
            data: {
              fill: ({ datum }) => (datum.x === '나' ? '#ffd300' : '#fe612c'),
            },
            labels: {
              fill: ({ datum }: CallbackArgs) => (datum.x === '나' ? '#fe612c' : 'black'),
              fontSize: 20,
            },
          }}
        />
        <VictoryLine data={comparePeerAverage} x='x' y='HealthScore' />
        <VictoryScatter
          data={comparePeerAverage}
          x='x'
          y='HealthScore'
          style={{
            data: {
              fill: ({ datum }) => (datum.x === '나' ? 'grey' : 'white'),
              stroke: ({ datum }) => (datum.x === '나' ? 'none' : 'black'),
              strokeWidth: 1,
            },
          }}
          size={5}
        />
      </VictoryChart>
    </div>
  )
}

export default AverageChart
