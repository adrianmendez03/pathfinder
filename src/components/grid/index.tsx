import React, { useState, useEffect } from "react"

import Row from "./Row"
import Legend from "./legend"
import "./Grid.css"

interface Props {
  gridRef: React.MutableRefObject<HTMLElement | null>
}
interface Size {
  height: number
  width: number
}

const Grid: React.FC<Props> = (props) => {
  const [size, setSize] = useState<Size | null>(null)

  useEffect(() => {
    console.log("blah")
    const { clientHeight, clientWidth } = props.gridRef.current!
    if (clientHeight && clientWidth) {
      setSize({
        height: clientHeight,
        width: clientWidth,
      })
    }
  }, [props.gridRef])

  const generate = (value: number) => {
    return Math.floor(Math.floor(value / 20) / 2) * 2 + 1
  }

  return (
    <div className="grid__container">
      <section ref={props.gridRef} className="grid rounded-corners">
        {size
          ? new Array(generate(size.height)).fill(true).map((el, index) => {
              return (
                <Row key={index} index={index} cols={generate(size.width)} />
              )
            })
          : "Loading"}
      </section>
      <Legend />
    </div>
  )
}

export default Grid
