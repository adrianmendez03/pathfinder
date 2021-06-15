import React, { useState, useEffect } from "react"

interface Props {
  index: number
  createWalls: boolean
  type: string
}
interface ColorStyle {
  backgroundColor: string
}

const Tile: React.FC<Props> = (props) => {
  const [tileColor, setTileColor] = useState<ColorStyle | undefined>()

  useEffect(() => {
    if (props.type === "path") {
      setTileColor({ backgroundColor: "#111928" })
    } else {
      setTileColor({ backgroundColor: "#262f3b" })
    }
  }, [props.type])

  const handleMouseEnter = () => {
    if (props.createWalls) {
      if (tileColor!.backgroundColor === "#262f3b") {
        setTileColor({ backgroundColor: "#111928" })
      } else {
        setTileColor({ backgroundColor: "#262f3b" })
      }
    }
  }

  return (
    <div
      className={`grid__cell grid__cell--round col-${props.index}`}
      style={tileColor}
      onMouseEnter={handleMouseEnter}
      data-visited={false}
    ></div>
  )
}

export default Tile
