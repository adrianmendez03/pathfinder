import React from "react"

import Square from "./Square"

interface Props {
  cols: number
}

const Row: React.FC<Props> = (props) => {
  return (
    <div>
      Row
      {new Array(props.cols).fill(true).map((el, index) => {
        return <Square key={index} />
      })}
    </div>
  )
}

export default Row
