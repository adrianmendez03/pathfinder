import React, { useState } from "react"

import Row from "./Row"
import "./Grid.css"

interface Props {}
interface Size {
  rows: number
  cols: number
}

const Grid: React.FC<Props> = (props) => {
  const [size, setSize] = useState<Size>({
    rows: 24,
    cols: 14,
  })

  const [createWalls, setCreateWalls] = useState(false)

  const handleClick = () => {
    if (createWalls) {
      setCreateWalls(false)
    } else {
      setCreateWalls(true)
    }
  }

  return (
    <div className="grid" onClick={handleClick}>
      {new Array(size.rows).fill(true).map((el, index) => {
        return (
          <Row
            key={index}
            index={index}
            cols={size.cols}
            createWalls={createWalls}
          />
        )
      })}
    </div>
  )
}

export default Grid
