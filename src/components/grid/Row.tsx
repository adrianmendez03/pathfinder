import React from "react"

import Cell from "./Cell"

interface Props {
  index: number
  cols: number
}

const Row: React.FC<Props> = (props) => {
  return (
    <div className={`flex--row grid__row row-${props.index}`}>
      {new Array(props.cols).fill(true).map((el, index) => {
        const type = "path"
        return (
          <Cell key={index} index={index} type={type} rowIndex={props.index} />
        )
      })}
    </div>
  )
}

export default Row
