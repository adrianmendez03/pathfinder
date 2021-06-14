import React from "react"

import Tile from "./Tile"

interface Props {
  index: number
  cols: number
}

const Row: React.FC<Props> = (props) => {
  return (
    <tr id={`row-${props.index}`}>
      {new Array(props.cols).fill(true).map((el, index) => {
        return <Tile index={index} key={index} />
      })}
    </tr>
  )
}

export default Row
