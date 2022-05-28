import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import styles from './forecastChart.module.scss'

const ForecastChart = () => {
  const compareScoreDecade = [
    { x: '나', HealthScore: 875 },
    { x: '10년 후', HealthScore: 790 },
  ]

  const compareMediExpenseDecade = [
    { x: '나', mediExpense: 93335 },
    { x: '10년 후', mediExpense: 129455 },
  ]

  return (
    <div className={styles.container}>
      <h1>나의 10년 후 건강 예측</h1>
      <div className={styles.healthScoreWrapper}>
        <div className={styles.healthDecade}>
          <VictoryChart domainPadding={90}>
            <VictoryAxis tickValues={[1, 2]} />
            <VictoryBar
              data={compareScoreDecade}
              x='x'
              y='HealthScore'
              labels={({ datum }) => `${datum.HealthScore}점`}
              style={{
                data: {
                  fill: ({ datum }) => (datum.x === '나' ? '#ffd300' : '#ff9500'),
                },
                labels: {
                  fill: ({ datum }: CallbackArgs) => (datum.x === '나' ? '#ff9500' : 'black'),
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
      <div className={styles.mediExpenseWrapper}>
        <div className={styles.mediExpenseDecade}>
          <VictoryChart domainPadding={90}>
            <VictoryAxis tickValues={[1, 2]} />
            <VictoryBar
              data={compareMediExpenseDecade}
              x='x'
              y='mediExpense'
              labels={({ datum }) => datum.mediExpense}
              style={{
                data: {
                  fill: ({ datum }) => (datum.x === '나' ? '#ffd300' : '#ff9500'),
                },
                labels: {
                  fill: ({ datum }: CallbackArgs) => (datum.x === '나' ? '#ff9500' : 'black'),
                },
              }}
            />
            <VictoryLine data={compareMediExpenseDecade} x='x' y='mediExpense' />
            <VictoryScatter
              data={compareMediExpenseDecade}
              x='x'
              y='mediExpense'
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
    </div>
  )
}

export default ForecastChart
