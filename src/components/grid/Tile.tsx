import React from "react"

interface Props {
  index: number
}

const Tile: React.FC<Props> = (props) => {
  return (
    <div className={`grid__tile grid__tile--round col-${props.index}`}></div>
  )
}

export default Tile
