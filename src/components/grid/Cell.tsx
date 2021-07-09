import React from "react"

interface Props {
  index: number
  rowIndex: number
}

const Cell: React.FC<Props> = (props) => {
  return (
    <div
      className={`grid__cell grid__cell--open col-${props.index}`}
      data-visited="false"
      data-type="path"
      data-coords={`${props.index},${props.rowIndex}`}
    ></div>
  )
}

export default Cell
