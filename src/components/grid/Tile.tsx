import React, { useState } from "react"

interface Props {
  index: number
  createWalls: boolean
}
interface ColorStyle {
  backgroundColor: string
}

const Tile: React.FC<Props> = (props) => {
  const [tileColor, setTileColor] = useState<ColorStyle>({
    backgroundColor: "#111928",
  })

  const handleMouseEnter = () => {
    if (props.createWalls) {
      if (tileColor.backgroundColor === "#262f3b") {
        setTileColor({ backgroundColor: "#111928" })
      } else {
        setTileColor({ backgroundColor: "#262f3b" })
      }
    }
  }

  return (
    <div
      className={`grid__tile grid__tile--round col-${props.index}`}
      style={tileColor}
      onMouseEnter={handleMouseEnter}
    ></div>
  )
}

export default Tile
