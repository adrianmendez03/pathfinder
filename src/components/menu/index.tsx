import React, { useState, useRef } from "react"

import Button from "../button"
import { mazes, algos, distances, ButtonFormat } from "./buttons"
import "./Menu.css"

interface Props {
  grid: React.MutableRefObject<null>
}

interface Options {
  algo: string | null
  maze: string | null
  distance: string
  running: boolean
}

const Menu: React.FC<Props> = (props) => {
  const [options, setOptions] = useState<Options>({
    algo: null,
    maze: null,
    distance: "mid",
    running: false,
  })
  const visualzePathButton = useRef<HTMLButtonElement>(null)

  // const toggleRun = () => {
  //   setOptions({
  //     ...options,
  //     running: !options.running,
  //   })
  // }

  const generateMaze = async (button: ButtonFormat) => {
    setOptions({
      ...options,
      maze: button.name,
      running: true,
    })

    await button.format(props.grid)
    await button.function(props.grid)

    setOptions({
      ...options,
      maze: button.name,
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

  const handleAlgoClick = (button: ButtonFormat) => {
    visualzePathButton.current!.classList.remove("button--error-outline")

    setOptions({
      ...options,
      algo: button.name,
    })
  }

  const handleDistanceClick = (button: ButtonFormat) => {
    setOptions({
      ...options,
      distance: button.name,
    })
  }

  const renderButtons = (
    buttons: ButtonFormat[],
    type: keyof Options,
    callback: (button: ButtonFormat) => void
  ) => {
    return buttons.map((button, index) => {
      return (
        <li key={index}>
          <Button
            name={type}
            callback={() => callback(button)}
            text={button.name}
            class={
              options[type] === button.name
                ? "button--accent-filled"
                : "button--accent-outline"
            }
            disabled={options.running}
          />
        </li>
      )
    })
  }

  const renderSection = (
    sectionInfo: {
      header: string
      buttons: ButtonFormat[]
    },
    type: keyof Options,
    callback: (button: ButtonFormat) => void
  ) => {
    const { header, buttons } = sectionInfo
    return (
      <section className="menu__inputs">
        <p>{header}</p>
        <ul className="flex--row">{renderButtons(buttons, type, callback)}</ul>
      </section>
    )
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
        {algos && renderSection(algos, "algo", handleAlgoClick)}
        {mazes && renderSection(mazes, "maze", generateMaze)}
        {distances && renderSection(distances, "distance", handleDistanceClick)}
      </section>
    </section>
  )
}

export default Menu
