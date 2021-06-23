import React, { useState, useRef } from "react"

import { dfs } from "../../algos/maze/dfs"
import { mazes, algos } from "./buttons"
import Button from "../button"
import "./Menu.css"

interface Props {
  grid: React.MutableRefObject<null>
}

interface Options {
  algo: string | null
  maze: string | null
  running: boolean
}

const Menu: React.FC<Props> = (props) => {
  const [options, setOptions] = useState<Options>({
    algo: null,
    maze: null,
    running: false,
  })
  const visualzePathButton = useRef<HTMLButtonElement>(null)

  // const toggleRun = () => {
  //   setOptions({
  //     ...options,
  //     running: !options.running,
  //   })
  // }

  const generateMaze = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOptions({
      ...options,
      maze: (event.target as HTMLButtonElement).value,
      running: true,
    })

    const value = (event.target as HTMLButtonElement).value
    switch (value) {
      case "dfs":
        await dfs(props.grid)
        break
      default:
        break
    }

    setOptions({
      ...options,
      maze: (event.target as HTMLButtonElement).value,
      running: false,
    })
  }

  const visualzePath = async () => {
    // toggleRun()

    if (options.algo) {
      switch (options.algo) {
        default:
          break
      }
    } else {
      visualzePathButton.current!.classList.add("button--error-outline")
    }

    // toggleRun()
  }

  const handleAlgoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    visualzePathButton.current!.classList.remove("button--error-outline")
    const value = (event.target as HTMLButtonElement).value

    setOptions({
      ...options,
      algo: value,
    })
  }

  const renderButtons = (
    buttons: string[],
    type: keyof Options,
    callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  ) => {
    return buttons.map((button, index) => {
      return (
        <li key={index}>
          <Button
            name={type}
            callback={callback}
            text={button}
            class={
              options[type] === button
                ? "button--accent-filled"
                : "button--accent-outline"
            }
            disabled={options.running}
          />
        </li>
      )
    })
  }

  return (
    <section className="menu flex--col rounded-corners">
      <section className="flex--col">
        <Button
          name="algo"
          callback={visualzePath}
          text={
            options.algo ? `Visualize ${options.algo}` : "Pick an algorithm"
          }
          class="button--accent-outline"
          refCallback={visualzePathButton}
          disabled={options.running}
        />
      </section>
      <section className="flex--col">
        <section className="menu__inputs">
          <p>Algorithms</p>
          <ul className="flex--row">
            {algos && renderButtons(algos, "algo", handleAlgoClick)}
          </ul>
        </section>
        <section className="menu__inputs">
          <p>Maze Generation</p>
          <ul className="flex--row">
            {mazes && renderButtons(mazes, "maze", generateMaze)}
          </ul>
        </section>
      </section>
    </section>
  )
}

export default Menu
