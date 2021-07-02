import React from "react"

interface Props {
  index: number
  rowIndex: number
}

const Cell: React.FC<Props> = (props) => {
  return (
    <div
      className={`grid__cell grid__cell--path grid__cell--round col-${props.index}`}
      data-visited="false"
      data-type="path"
    ></div>
  )
}

export default Cell
