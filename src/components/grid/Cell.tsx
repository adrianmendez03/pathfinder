import React, { useState, useEffect, useRef } from "react"

interface Props {
  index: number
  createWalls: boolean
  type: string
}

const Tile: React.FC<Props> = (props) => {
  const [nameOfClass, setNameOfClass] = useState<String | undefined>()
  const cellRef = useRef<any>()

  useEffect(() => {
    if (props.type === "path") {
      setNameOfClass("grid__cell--path")
    } else {
      setNameOfClass("grid__cell--wall")
    }

    if (nameOfClass) {
      cellRef.current.classList.add(nameOfClass)
    }
  }, [nameOfClass, props.type])

  return (
    <div
      className={`grid__cell grid__cell--round col-${props.index}`}
      ref={cellRef}
      data-visited={false}
    ></div>
  )
}

export default Tile
