import React from "react"

interface Props {
  index: number
}

const Tile: React.FC<Props> = (props) => {
  return <td className={`col-${props.index}`}>Tile</td>
}

export default Tile
