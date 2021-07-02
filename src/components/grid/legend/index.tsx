import React from "react"

import { tiles } from "./tiles"
import "./Legend.css"

interface Props {}

const Legend: React.FC<Props> = (props) => {
  const renderTiles = () => {
    return tiles.map((tile, index) => {
      return (
        <li className="flex--row" key={index}>
          <span>{tile.name}</span>
          <div className={`grid__cell ${tile.class}`}></div>
        </li>
      )
    })
  }

  return (
    <section className="legend">
      <ul className="flex--row">{renderTiles()}</ul>
    </section>
  )
}

export default Legend
