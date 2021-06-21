import React, { useState } from "react"
import { dfs } from "../../algos/maze/dfs"

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

  return (
    <section className="menu flex--row rounded-corners">
      <section className="flex--col">
        <Button callback={generateMaze} text="Visualize Path" />
        <Button callback={generateMaze} text="Generate Maze" />
      </section>
      <section className="flex--col">
        <Button callback={generateMaze} icon="fas fa-cogs" />
      </section>
    </section>
  )
}

export default Menu
