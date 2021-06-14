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

  return (
    <div className="grid">
      {new Array(size.rows).fill(true).map((el, index) => {
        return <Row index={index} key={index} cols={size.cols} />
      })}
    </div>
  )
}

export default Grid
