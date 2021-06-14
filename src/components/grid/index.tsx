import React, { useState } from "react"

import Row from "./Row"

interface Props {}
interface Size {
  rows: number
  cols: number
}

const Grid: React.FC<Props> = (props) => {
  const [size, setSize] = useState<Size>({
    rows: 5,
    cols: 5,
  })

  return (
    <div>
      Grid
      {new Array(size.rows).fill(true).map((el, index) => {
        return <Row key={index} cols={size.cols} />
      })}
    </div>
  )
}

export default Grid
