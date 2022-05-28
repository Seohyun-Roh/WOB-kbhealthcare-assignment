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
      <div className={styles.averageChartWrapper}>
        <VictoryChart domainPadding={90}>
          <VictoryAxis tickValues={[1, 2]} />
          <VictoryBar
            data={comparePeerAverage}
            labels={({ datum }) => `${datum.HealthScore}점`}
            x='x'
            y='HealthScore'
            maxDomain={{ y: 100 }}
            minDomain={0}
            style={{
              data: {
                fill: ({ datum }) => (datum.x === '나' ? '#ffd300' : '#ff9500'),
              },
              labels: {
                fill: ({ datum }: CallbackArgs) => (datum.x === '나' ? '#ff9500' : 'black'),
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
    </div>
  )
}

export default AverageChart
