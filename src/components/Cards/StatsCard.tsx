import React from 'react'

type Props = {
  firstTitle: string,
  firstValue: number | string,
  firstDesc: string,

  secondTitle: string,
  secondValue: number | string,
  secondDesc: string,

  thirdTitle: string,
  thirdValue: number | string,
  thirdDesc: string,
}

const StatsCard = (props: Props) => {
  return (
    <div>
      <div className="stats stats-vertical lg:stats-horizontal shadow">

        <div className="stat">
          <div className="stat-title">{props.firstTitle}</div>
          <div className="stat-value">{props.firstValue}</div>
          <div className="stat-desc">{props.firstDesc}</div>
        </div>

        <div className="stat">
          <div className="stat-title">{props.secondTitle}</div>
          <div className="stat-value">{props.secondValue}</div>
          <div className="stat-desc">{props.secondDesc}</div>
        </div>

        <div className="stat">
          <div className="stat-title">{props.thirdTitle}</div>
          <div className="stat-value">{props.thirdValue}</div>
          <div className="stat-desc">{props.thirdDesc}</div>
        </div>

      </div>
    </div>
  )
}

export default StatsCard