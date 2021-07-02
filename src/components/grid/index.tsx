import React, { useState, useEffect } from "react"

import Row from "./Row"
import Legend from "./legend"
import "./Grid.css"

interface Props {
  gridRef: (gridNode: HTMLElement) => void
  grid: HTMLElement | null
}
interface Size {
  rows: number
  cols: number
}

const Grid: React.FC<Props> = (props) => {
  const [size, setSize] = useState<Size | null>(null)

  useEffect(() => {
    const generateLength = (value: number) => {
      return Math.floor(Math.floor(value / 20) / 2) * 2 + 1
    }

    if (props.grid) {
      const { clientHeight, clientWidth } = props.grid
      setSize({
        rows: generateLength(clientHeight),
        cols: generateLength(clientWidth),
      })
    }
  }, [props.grid])

  return size ? (
    <div className="grid__container">
      <section ref={props.gridRef} className="grid rounded-corners">
        {new Array(size.rows).fill(true).map((el, index) => {
          return <Row key={index} index={index} cols={size.cols} />
        })}
      </section>
      <Legend />
    </div>
  ) : (
    <div className="grid__container">
      <section ref={props.gridRef} className="grid rounded-corners">
        Loading
      </section>
      <Legend />
    </div>
  )
}

export default Grid
