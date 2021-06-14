import React from "react"

import Tile from "./Tile"

interface Props {
  index: number
  cols: number
  createWalls: boolean
}

const Row: React.FC<Props> = (props) => {
  return (
    <div className={`flex--row grid__row row-${props.index}`}>
      {new Array(props.cols).fill(true).map((el, index) => {
        return (
          <Tile key={index} index={index} createWalls={props.createWalls} />
        )
      })}
    </div>
  )
}

export default Row
