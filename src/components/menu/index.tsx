import React, { useState, useRef, useEffect } from "react"
import { cleanTile } from "../../algos/maze/format"

import Button from "../button"
import { mazes, algos, distances, ButtonFormat } from "./buttons"
import "./Menu.css"

interface Props {
  grid: React.MutableRefObject<any>
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
  const [start, setStart] = useState<null | HTMLElement>(null)
  const [end, setEnd] = useState<null | HTMLElement>(null)

  const visualzePathButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    placeStartAndEndPoints()
  }, [options.distance])

  const placeStartAndEndPoints = async () => {
    if (start) {
      start.classList.remove("grid__cell--start")
    }

    if (end) {
      end.classList.remove("grid__cell--start")
    }

    const { grid } = props

    const constant = Math.floor(
      Math.floor(grid.current.children.length / 2) / 2.5
    )

    let distance = constant
    if (options.distance === "far") {
      distance *= 0
    } else if (options.distance === "mid") {
      distance *= 1
    } else {
      distance *= 2
    }

    const width = grid.current.children[0].children.length - 1,
      height = grid.current.children.length - 1
    let i = 0 + distance,
      j = height - distance,
      startPlaced = false,
      endPlaced = false

    while (i < j && (!startPlaced || !endPlaced)) {
      if (!startPlaced) {
        for (let k = distance; k < width - distance; k++) {
          const cell = grid.current.children[i].children[k]
          const cellSet = new Set(cell.classList)

          if (!cellSet.has("grid__cell--wall")) {
            cell.classList.add("grid__cell--start", "grid__cell--animate-grow")
            startPlaced = true
            setStart(cell)
            break
          }
        }

        if (!startPlaced) {
          i++
        }
      }

      if (!endPlaced) {
        for (let k = width - distance; k >= distance; k--) {
          const cell = grid.current.children[j].children[k]
          const cellSet = new Set(cell.classList)

          if (!cellSet.has("grid__cell--wall")) {
            cell.classList.add("grid__cell--start", "grid__cell--animate-grow")
            endPlaced = true
            setEnd(cell)
            break
          }
        }

        if (!endPlaced) {
          j--
        }
      }
    }
  }

  const generateMaze = async (button: ButtonFormat) => {
    setOptions({
      ...options,
      maze: button.name,
      running: true,
    })

    await button.format(props.grid)
    await button.function(props.grid)
    placeStartAndEndPoints()

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
