import React, { useState, useRef, useEffect } from "react"
import { resetPath } from "../../algos/format"
import { Cell } from "../../algos/interface"

import Button from "../button"
import { mazes, algos, distances, ButtonFormat } from "./buttons"
import "./Menu.css"

interface Props {
  grid: HTMLElement | null
}

interface Options {
  algo: ButtonFormat | null
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
  const [start, setStart] = useState<null | Cell>(null)
  const [end, setEnd] = useState<null | Cell>(null)

  const visualzePathButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (props.grid) {
      placeStartAndEndPoints()
    }
  }, [options.distance])

  const placeStartAndEndPoints = async () => {
    console.log("blah")
    await resetPath(props.grid!)

    if (start && end) {
      start.cell.classList.remove("grid__cell--start")
      end.cell.classList.remove("grid__cell--start")
      end.cell.dataset.end = false
    }

    const { grid } = props
    const constant = Math.floor(
      Math.floor(props.grid!.children.length / 2) / 2.5
    )

    let distance = constant

    if (options.distance === "far") {
      distance *= 0
    } else if (options.distance === "mid") {
      distance *= 1
    } else {
      distance *= 2
    }

    const width = grid!.children[0].children.length - 1
    const height = grid!.children.length - 1
    let i = 0 + distance
    let j = height - distance
    let startPlaced = false
    let endPlaced = false

    while (i < j && (!startPlaced || !endPlaced)) {
      if (!startPlaced) {
        for (let k = distance; k < width - distance; k++) {
          const cell = grid!.children[i].children[k] as HTMLElement
          const cellSet = new Set(cell.classList)

          if (!cellSet.has("grid__cell--wall")) {
            cell.classList.add("grid__cell--start", "grid__cell--animate-grow")
            startPlaced = true
            cell.dataset.x = k.toString()
            cell.dataset.y = i.toString()
            setStart({
              cell,
              coords: {
                x: k,
                y: i,
              },
            })
            break
          }
        }

        if (!startPlaced) {
          i++
        }
      }

      if (!endPlaced) {
        for (let k = width - distance; k >= distance; k--) {
          const cell = grid!.children[j].children[k] as HTMLElement
          const cellSet = new Set(cell.classList)

          if (!cellSet.has("grid__cell--wall")) {
            cell.classList.add("grid__cell--start", "grid__cell--animate-grow")
            endPlaced = true
            cell.dataset.x = k.toString()
            cell.dataset.y = i.toString()
            cell.dataset.end = "true"
            setEnd({
              cell,
              coords: {
                x: k,
                y: j,
              },
            })
            break
          }
        }

        if (!endPlaced) {
          j--
        }
      }
    }
    console.log(startPlaced || endPlaced)
  }

  const visualzePath = async () => {
    if (options.algo) {
      setOptions({
        ...options,
        running: true,
      })

      await placeStartAndEndPoints()
      await options.algo.function(props.grid, start)

      setOptions({
        ...options,
        running: false,
      })
    } else {
      visualzePathButton.current?.classList.add("button--error-outline")
    }
  }

  const handleMazeClick = async (button: ButtonFormat) => {
    setOptions({
      ...options,
      maze: button.name,
      running: true,
    })

    await button.format(props.grid)
    await button.function(props.grid)
    await placeStartAndEndPoints()

    setOptions({
      ...options,
      maze: button.name,
      running: false,
    })
  }

  const handleAlgoClick = (button: ButtonFormat) => {
    visualzePathButton.current!.classList.remove("button--error-outline")

    setOptions({
      ...options,
      algo: button,
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
      let name = options[type]

      if (options.algo && options.algo === options[type]) {
        const key: keyof ButtonFormat = "name"
        name = options.algo[key]
      }

      return (
        <li key={index}>
          <Button
            name={type}
            callback={() => callback(button)}
            text={button.name}
            class={
              name === button.name
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
            options.algo
              ? `Visualize ${options.algo.name}`
              : "Pick an algorithm"
          }
          class="button--accent-outline"
          refCallback={visualzePathButton}
          disabled={options.running}
        />
      </section>
      <section className="flex--col">
        {algos && renderSection(algos, "algo", handleAlgoClick)}
        {mazes && renderSection(mazes, "maze", handleMazeClick)}
        {distances && renderSection(distances, "distance", handleDistanceClick)}
      </section>
    </section>
  )
}

export default Menu
