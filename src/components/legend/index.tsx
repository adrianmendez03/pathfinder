import React from "react"

import "./Legend.css"

interface Props {}

const Legend: React.FC<Props> = (props) => {
  const tiles = [
    {
      name: "Wall",
      class: "grid__cell--wall",
    },
    {
      name: "Path",
      class: "grid__cell--path",
    },
  ]

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
