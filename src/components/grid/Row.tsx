import React from "react"

import Tile from "./Tile"

interface Props {
  cols: number
}

const Row: React.FC<Props> = (props) => {
  return (
    <div>
      Row
      {new Array(props.cols).fill(true).map((el, index) => {
        return <Tile key={index} />
      })}
    </div>
  )
}

export default Row
