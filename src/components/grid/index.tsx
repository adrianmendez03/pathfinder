import React, { useState, useEffect, useRef } from "react"

import Row from "./Row"
import Legend from "./legend"
import "./Grid.css"

interface Props {
  gridRef: (gridNode: HTMLElement) => void
}
interface Size {
  rows: number
  cols: number
}

const Grid: React.FC<Props> = (props) => {
  const [size, setSize] = useState<Size | null>(null)
  const grid = useRef<any>()

  useEffect(() => {
    const generateLength = (value: number) => {
      return Math.floor(Math.floor(value / 20) / 2) * 2 + 1
    }

    if (grid.current) {
      const { clientHeight, clientWidth } = grid.current
      setSize({
        rows: generateLength(clientHeight),
        cols: generateLength(clientWidth),
      })
    }
  }, [grid])

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
      <section ref={grid} className="grid rounded-corners">
        Loading
      </section>
      <Legend />
    </div>
  )
}

export default Grid
