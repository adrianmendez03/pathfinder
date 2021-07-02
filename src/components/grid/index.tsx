import React, { useState, useEffect, useRef } from "react"

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
  const grid = useRef<any>()

  useEffect(() => {
    const generateLength = (value: number) => {
      return Math.floor(Math.floor(value / 20) / 2) * 2 + 1
    }

    const updateSize = (height: number, width: number) => {
      setSize({
        rows: generateLength(height),
        cols: generateLength(width),
      })
    }

    if (grid.current) {
      updateSize(grid.current.clientHeight, grid.current.clientWidth)
    } else if (props.grid) {
      new ResizeObserver(() =>
        updateSize(props.grid!.clientHeight, props.grid!.clientWidth)
      ).observe(props.grid)
    }
  }, [grid, props.grid])

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
