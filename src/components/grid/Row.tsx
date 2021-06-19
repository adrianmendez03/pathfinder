import React from "react"

import Tile from "./Cell"

interface Props {
  index: number
  cols: number
  createWalls: boolean
}

const Row: React.FC<Props> = (props) => {
  return (
    <div className={`flex--row grid__row row-${props.index}`}>
      {new Array(props.cols).fill(true).map((el, index) => {
        const type = index % 2 === 0 && props.index % 2 === 0 ? "path" : "wall"
        return (
          <Tile
            key={index}
            index={index}
            createWalls={props.createWalls}
            type={type}
          />
        )
      })}
    </div>
  )
}

export default Row
