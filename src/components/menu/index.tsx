import React, { useState } from "react"

import { dfs } from "../../algos/maze/dfs"
import { mazes, algos } from "./buttons"
import Button from "../button"
import "./Menu.css"

interface Props {
  grid: React.MutableRefObject<null>
}
interface Options {
  maze: string | null
  algo: string | null
}

const Menu: React.FC<Props> = (props) => {
  const [options, setOptions] = useState<Options>({
    maze: "dfs",
    algo: null,
  })

  const generateMaze = async () => {
    switch (options.maze) {
      case "dfs":
        await dfs(props.grid)
        break
      default:
        break
    }
  }

  const renderButtons = (buttons: string[]) => {
    return buttons.map((button, index) => {
      return (
        <li key={index}>
          <Button
            callback={() => console.log("bruh")}
            text={button}
            class="button--accent-outline"
          />
        </li>
      )
    })
  }

  return (
    <section className="menu flex--col rounded-corners">
      <section className="flex--col">
        <Button
          callback={generateMaze}
          text="Visualize Path"
          class="button--accent-outline"
        />
        <Button
          callback={generateMaze}
          text="Generate Maze"
          class="button--accent-outline"
        />
      </section>
      <section className="flex--col">
        <section className="menu__inputs">
          <p>Algorithms</p>
          <ul className="flex--row">{algos && renderButtons(algos)}</ul>
        </section>
        <section className="menu__inputs">
          <p>Maze Generation</p>
          <ul className="flex--row">{mazes && renderButtons(mazes)}</ul>
        </section>
      </section>
    </section>
  )
}

export default Menu
