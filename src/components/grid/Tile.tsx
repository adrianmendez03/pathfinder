import React from "react"

interface Props {
  index: number
}

const Tile: React.FC<Props> = (props) => {
  return <div className={`col-${props.index}`}>Tile</div>
}

export default Tile
