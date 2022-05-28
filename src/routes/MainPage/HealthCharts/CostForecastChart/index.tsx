import { VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'
import { setChartColor } from '../AverageChart'

import styles from './costForecastChart.module.scss'

const CostForecastChart = () => {
  const compareMediExpenseDecade = [
    { x: '나', mediExpense: 93335 },
    { x: '10년 후', mediExpense: 129455 },
  ]

  return (
    <div className={styles.container}>
      <VictoryChart height={300}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize: 20 } }} />
        <VictoryBar
          data={compareMediExpenseDecade}
          barWidth={60}
          x='x'
          y='mediExpense'
          labels={({ datum }) => datum.mediExpense}
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
        <VictoryLine data={compareMediExpenseDecade} x='x' y='mediExpense' />
        <VictoryScatter
          data={compareMediExpenseDecade}
          x='x'
          y='mediExpense'
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

export default CostForecastChart
