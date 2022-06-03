import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryLine, VictoryScatter } from 'victory'
import { CallbackArgs } from 'victory-core'

import { ScoreType } from 'types/health.d'

import styles from './chart.module.scss'
import { cx } from 'styles'
import CHART_STYLE from './chartStyles'

interface IProps {
  data: ScoreType[]
  setColor: (data: ScoreType[], datum: any, myColor: string, elseColor: string, isYears: boolean) => string
  isYears: boolean
}

const Chart = ({ data, setColor, isYears }: IProps) => {
  const chartHeight = isYears ? 250 : 300
  const barWidth = isYears ? 40 : 60
  const fontSize = isYears ? 16 : 25
  const scatterSize = isYears ? 4 : 6
  const barElseColor = isYears ? '#eeeeee' : '#fe612c'

  return (
    <div className={cx(styles.container, { [styles.yearsChart]: isYears })}>
      <VictoryChart height={chartHeight}>
        <VictoryAxis style={{ axis: { stroke: 'white' }, tickLabels: { fontSize, ...CHART_STYLE.label } }} />
        <VictoryGroup>
          <VictoryBar
            data={data}
            {...CHART_STYLE.value}
            barWidth={barWidth}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(data, datum, '#ffd300', barElseColor, isYears),
              },
              labels: {
                ...CHART_STYLE.label,
                fill: ({ datum }: CallbackArgs) => setColor(data, datum, '#fe612c', '#666666', isYears),
                fontSize,
              },
            }}
            labels={({ datum }) => `${datum.value}점`}
          />
          <VictoryLine data={data} {...CHART_STYLE.value} />
          <VictoryScatter
            data={data}
            {...CHART_STYLE.value}
            size={scatterSize}
            style={{
              data: {
                fill: ({ datum }: CallbackArgs) => setColor(data, datum, '#fe612c', '#eeeeee', isYears),
                stroke: ({ datum }: CallbackArgs) => setColor(data, datum, '#fe612c', '#000000', isYears),
                strokeWidth: 1,
              },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

export default Chart
