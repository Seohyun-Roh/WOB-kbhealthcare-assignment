import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import { fetchYearsChartInfo } from 'services/health'
import { YearsType } from 'types/health'

import styles from './yearsChart.module.scss'
import CHART_STYLE from './chartStyles'

// datum은 CallbackArgs 타입 안에 있는 값 중 any 타입
const setColor = (data: YearsType[], datum: any, recentColor: string, elseColor: string) => {
  return datum.x === data[data.length - 1].x ? recentColor : elseColor
}

const YearsChart = () => {
  const { yearsInfo } = fetchYearsChartInfo()

  return (
    <div className={styles.container}>
      <VictoryChart height={250}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { ...CHART_STYLE.label } }} />
        <VictoryGroup>
          <VictoryBar
            data={yearsInfo}
            {...CHART_STYLE.value}
            barWidth={40}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(yearsInfo, datum, '#ffd300', '#eeeeee'),
              },
              labels: {
                ...CHART_STYLE.label,
                fill: ({ datum }: CallbackArgs) => setColor(yearsInfo, datum, '#fe612c', '#666666'),
              },
            }}
            labels={({ datum }) => `${datum.value}점`}
          />
          <VictoryLine data={yearsInfo} {...CHART_STYLE.value} />
          <VictoryScatter
            data={yearsInfo}
            {...CHART_STYLE.value}
            size={4}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(yearsInfo, datum, '#fe612c', '#eeeeee'),
                stroke: ({ datum }: CallbackArgs) => setColor(yearsInfo, datum, '#fe612c', '#000000'),
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
