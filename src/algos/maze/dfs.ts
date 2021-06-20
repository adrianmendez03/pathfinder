// import format from "./format"

import { gridFormat } from "./format"
import { generateBounds } from "./utils"

interface Cell {
  cell: any
  coords: Coords
}

interface Coords {
  x: number
  y: number
}

const randomIndex = (bound: number): number => {
  return Math.floor(Math.random() * bound)
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const getUnvisitedNeighbours = (
  grid: React.MutableRefObject<any>,
  x: number,
  y: number,
  bounds: {
    x: number
    y: number
  }
) => {
  const top: Cell | undefined =
    y - 2 >= 0
      ? {
          cell: grid.current.children[y - 2].children[x],
          coords: {
            x,
            y: y - 2,
          },
        }
      : undefined
  const right: Cell | undefined =
    x + 2 < bounds.x
      ? {
          cell: grid.current.children[y].children[x + 2],
          coords: {
            x: x + 2,
            y,
          },
        }
      : undefined
  const bottom: Cell | undefined =
    y + 2 < bounds.y
      ? {
          cell: grid.current.children[y + 2].children[x],
          coords: {
            x,
            y: y + 2,
          },
        }
      : undefined
  const left: Cell | undefined =
    x - 2 >= 0
      ? {
          cell: grid.current.children[y].children[x - 2],
          coords: {
            x: x - 2,
            y,
          },
        }
      : undefined

  const neighbours = [top, right, bottom, left]
  const univisitedNeighbours = neighbours.filter((neighbour) => {
    if (neighbour) {
      const { visited } = neighbour.cell.dataset
      return visited !== "true"
    }
    return false
  })

  return univisitedNeighbours
}

export const dfs = async (grid: React.MutableRefObject<any>) => {
  await gridFormat(grid)
  // Create a bounds object to hold the size of the grid
  const bounds = generateBounds(grid)
  // This is an iterative implementation of DFS so a stack is needed
  const stack = []
  // Choose an initial cell, mark it as visited and push it into the stack
  const coords: Coords = {
    x: randomIndex(Math.ceil(bounds.x) / 2) * 2,
    y: randomIndex(Math.ceil(bounds.y) / 2) * 2,
  }
  const initialCell: Cell = {
    cell: grid.current.children[coords.y].children[coords.x],
    coords: coords,
  }
  initialCell.cell.dataset.visited = true
  stack.push(initialCell)
  // While the stack is not not empty...
  while (stack.length > 0) {
    // ... pop a cell from the stack and make it a current cell
    const currentCell: Cell | undefined = stack.pop()
    currentCell!.cell.classList.add(
      "grid__cell--current",
      "grid__cell--animate-grow"
    )
    await sleep(5)
    const unvisitedNeighbours = getUnvisitedNeighbours(
      grid,
      currentCell!.coords.x,
      currentCell!.coords.y,
      bounds
    )
    // If the current cell has any neighbours which have not been visited...
    if (unvisitedNeighbours.length > 0) {
      // ... push the current cell to the stack...
      stack.push(currentCell)
      // ... choose a random neighbour...
      const randomNeighbour =
        unvisitedNeighbours[randomIndex(unvisitedNeighbours.length)]
      // ... remove the wall between the current cell and the chosen cell...
      const wall =
        grid.current.children[
          (currentCell!.coords.y + randomNeighbour!.coords.y) / 2
        ].children[(currentCell!.coords.x + randomNeighbour!.coords.x) / 2]
      wall.classList.remove("grid__cell--wall")
      wall.classList.add("grid__cell--path")
      // ... mark the neighbour as visited and push it into the stack.
      randomNeighbour!.cell.dataset.visited = true
      stack.push(randomNeighbour)
    }
    currentCell!.cell.classList.remove("grid__cell--current")
  }
}
