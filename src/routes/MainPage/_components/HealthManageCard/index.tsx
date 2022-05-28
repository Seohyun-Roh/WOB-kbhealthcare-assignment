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

const HealthManageCard = ({
  healthManageCardData,
  idx,
}: {
  healthManageCardData: IHealthManageCardData
  idx: number
}) => {
  const processHealthManageCardData = (_title: string) => {
    let title = ''
    let value = ''
    let detail = ''
    let normalOfStandard = ''
    const { tag } = healthManageCardData
    const boj = healthManageCardData.boj.slice(1)
    let signatureColor = ''
    let svg: any = null // svg element타입  SVGElement 아닌가요,,? SVGElement | null 넣으니 에러가나네요,,

    if (_title === 'resBMI') {
      title = '체질량 지수'
      value = `${healthManageCardData.value}kg/㎡`
      detail = `체질량 지수는 ${healthManageCardData.value}kg/㎡로 ${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = '정상 : 18.5 ~ 22.9 kg/㎡'
      signatureColor = '#7bcf3d'
      svg = <BMIIcon />
    }
    if (_title === 'resBloodPressure') {
      title = '혈압'
      value = `${healthManageCardData.value}mmHg`
      detail = `혈압은 ${healthManageCardData.value}mmHg로 ${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = '정상 : 이완 60~79 / 수축 90~119 mmHg'
      signatureColor = '#ca64e8'
      svg = <BloodPressureIcon />
    }
    if (_title === 'resTotalCholesterol') {
      title = '총콜레스테롤'
      value = `${healthManageCardData.value}mg/dL`
      detail = `총콜레스테롤은 ${healthManageCardData.value}mg/dL로 ${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = '정상 : 200 mg/dL 이하'
      signatureColor = '#3f60f0'
      svg = <CholesterolIcon />
    }
    if (_title === 'smkQty') {
      title = '흡연'
      value = ''
      detail = `${healthManageCardData.boj[0]} 중 입니다`
      normalOfStandard = ''
      signatureColor = '#68a0eb'
      svg = <SmokeIcon />
    }
    if (_title === 'resFastingBloodSuger') {
      title = '식전혈당'
      value = `${healthManageCardData.value}mg/dL`
      detail = `식전혈당은 ${healthManageCardData.value}mg/dL로 ${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = '정상 : 69~99 mg/dL'
      signatureColor = '#d990f0'
      svg = <FastingBloodSugerIcon />
    }
    if (_title === 'drnkQty') {
      title = '음주'
      value = ``
      detail = `${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = ''
      signatureColor = '#e99318'
      svg = <DrnkIcon />
    }
    if (_title === 'exerciQty') {
      title = '운동량'
      value = ``
      detail = `${healthManageCardData.boj[0]} 을 하고 있습니다.`
      normalOfStandard = ''
      signatureColor = '#73ccbc'
      svg = <ExerciseIcon />
    }
    if (_title === 'resGFR') {
      title = '신사구체여과율'
      value = `${healthManageCardData.value}mL/min `
      detail = `신사구체여과율은 ${healthManageCardData.value}mL/min로 ${healthManageCardData.boj[0]} 입니다.`
      normalOfStandard = '정상 : 60 mL/min 이상'
      signatureColor = '#edb3b4'
      svg = <GFRIcon />
    }

    return {
      title,
      value,
      detail,
      normalOfStandard,
      tag,
      boj,
      signatureColor,
      svg,
    }
  }

  const { title, detail, normalOfStandard, tag, boj, signatureColor, svg } = processHealthManageCardData(
    healthManageCardData.title
  )

  return (
    <ul>
      <li className={styles.healthCard}>
        <div className={styles.icon}>{svg}</div>
        <div className={styles.info}>
          <h3>0{idx}</h3>
          <p className={styles.healthTitle} style={{ color: signatureColor }}>
            {title}
          </p>
          <p className={styles.detail}>{detail}</p>
          <p className={styles.normal}>{normalOfStandard}</p>
          <ul className={styles.tag}>
            {tag.map((el) => {
              return <li key={`key_${el}`}>#{el}</li>
            })}
          </ul>
        </div>
        <div className={styles.manage}>
          <h4 style={{ color: signatureColor }}>이렇게 관리해 보세요!</h4>
          <ul>
            {boj.map((el) => {
              return <li key={`key_${el}`}>{el}</li>
            })}
          </ul>
        </div>
      </li>
    </ul>
  )
}

export default HealthManageCard
