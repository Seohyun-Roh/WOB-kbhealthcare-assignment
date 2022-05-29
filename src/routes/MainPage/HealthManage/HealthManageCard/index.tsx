import { cx } from 'styles'
import styles from './healthManageCard.module.scss'
import {
  HealthIcon1 as BloodPressureIcon,
  HealthIcon2 as BMIIcon,
  HealthIcon3 as DrnkIcon,
  HealthIcon4 as GFRIcon,
  HealthIcon5 as CholesterolIcon,
  HealthIcon6 as SmokeIcon,
  HealthIcon7 as FastingBloodSugerIcon,
  HealthIcon8 as ExerciseIcon,
} from 'assets/svgs'

interface IHealthManageCardData {
  title: string
  value: string
  boj: string[]
  tag: string[]
}

interface IProcessedHealthManageCardData {
  title: string
  value: string
  isSmkDrnkExerciseDetail: boolean | string
  standardOfNormal?: string
  svg: JSX.Element
}

const HealthManageCard = ({
  healthManageCardData,
  idx,
}: {
  healthManageCardData: IHealthManageCardData
  idx: number
}) => {
  const processHealthManageCardData = (subject: string): IProcessedHealthManageCardData => {
    const cardData: {
      [key: string]: IProcessedHealthManageCardData
    } = {
      resBMI: {
        title: '체질량 지수는',
        value: `${healthManageCardData.value}kg/㎡`,
        isSmkDrnkExerciseDetail: false,
        standardOfNormal: '정상 : 18.5 ~ 22.9 kg/㎡',
        svg: <BMIIcon />,
      },
      resBloodPressure: {
        title: '혈압은',
        value: `${healthManageCardData.value}mmHg`,
        isSmkDrnkExerciseDetail: false,
        standardOfNormal: '정상 : 이완 60~79 / 수축 90~119 mmHg',
        svg: <BloodPressureIcon />,
      },
      resTotalCholesterol: {
        title: '총콜레스테롤은',
        value: `${healthManageCardData.value}mg/dL`,
        isSmkDrnkExerciseDetail: false,
        standardOfNormal: '정상 : 200 mg/dL 이하',
        svg: <CholesterolIcon />,
      },
      smkQty: {
        title: '흡연',
        value: '',
        isSmkDrnkExerciseDetail: `${healthManageCardData.boj[0]}`,
        svg: <SmokeIcon />,
      },
      resFastingBloodSuger: {
        title: '식전혈당은',
        value: `${healthManageCardData.value}mg/dL`,
        isSmkDrnkExerciseDetail: false,
        standardOfNormal: '정상 : 69~99 mg/dL',
        svg: <FastingBloodSugerIcon />,
      },
      drnkQty: {
        title: '음주',
        value: '',
        isSmkDrnkExerciseDetail: `${healthManageCardData.boj[0]}`,
        svg: <DrnkIcon />,
      },
      exerciQty: {
        title: '운동량',
        value: '',
        isSmkDrnkExerciseDetail: `${healthManageCardData.boj[0]}`,
        svg: <ExerciseIcon />,
      },
      resGFR: {
        title: '신사구체여과율은',
        value: `${healthManageCardData.value}mL/min `,
        isSmkDrnkExerciseDetail: false,
        standardOfNormal: '정상 : 60 mL/min 이상',
        svg: <GFRIcon />,
      },
    }

    return cardData[subject]
  }

  const { tag } = healthManageCardData
  const boj = healthManageCardData.boj.slice(1)

  const { title, value, isSmkDrnkExerciseDetail, standardOfNormal, svg } = processHealthManageCardData(
    healthManageCardData.title
  )

  return (
    <li className={styles.healthCard}>
      <div className={styles.icon}>{svg}</div>
      <div className={styles.info}>
        <h3>0{idx}</h3>
        <p className={cx(styles.healthTitle, styles[healthManageCardData.title])}>{title}</p>
        <p className={styles.detail}>
          {isSmkDrnkExerciseDetail || (
            <>
              {title} {value}로 <br />
              <mark>{healthManageCardData.boj[0]}</mark> 입니다.
            </>
          )}
        </p>
        {standardOfNormal && <p className={styles.normal}>{standardOfNormal}</p>}
        <ul className={styles.tag}>
          {tag.map((el) => {
            if (el) {
              return <li key={`key_${el}`}>#{el}</li>
            }
            return null
          })}
        </ul>
      </div>
      <div className={styles.manage}>
        <h4 className={styles[healthManageCardData.title]}>이렇게 관리해 보세요!</h4>
        <ul>
          {boj.map((el) => {
            return <li key={`key_${el}`}>{el}</li>
          })}
        </ul>
      </div>
    </li>
  )
}

export default HealthManageCard
