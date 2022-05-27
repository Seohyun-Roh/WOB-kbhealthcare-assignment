import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import styles from './yearsChart.module.scss'
import CHART_STYLE from './chartStyles'

const data = [
  { year: '2015', value: 878 },
  { year: '2017', value: 886 },
  { year: '2019', value: 854 },
  { year: '2020', value: 888 },
  { year: '2021', value: 875 },
]

// datum은 CallbackArgs 타입 안에 있는 값 중 any 타입
const setColor = (datum: any, recentColor: string, elseColor: string) => {
  return datum.year === data[data.length - 1].year ? recentColor : elseColor
}

const YearsChart = () => {
  return (
    <div className={styles.container}>
      <VictoryChart height={250}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { ...CHART_STYLE.label } }} />
        <VictoryGroup>
          <VictoryBar
            data={data}
            {...CHART_STYLE.value}
            barWidth={40}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(datum, '#ffd300', '#eeeeee'),
              },
              labels: {
                ...CHART_STYLE.label,
                fill: ({ datum }: CallbackArgs) => setColor(datum, '#fe612c', '#666666'),
              },
            }}
            labels={({ datum }) => `${datum.value}점`}
          />
          <VictoryLine data={data} {...CHART_STYLE.value} />
          <VictoryScatter
            data={data}
            {...CHART_STYLE.value}
            size={4}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(datum, '#fe612c', '#eeeeee'),
                stroke: ({ datum }: CallbackArgs) => setColor(datum, '#fe612c', '#000000'),
                strokeWidth: 1,
              },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

export default YearsChart
