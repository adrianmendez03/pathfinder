import { Coords, Cell } from "../interface"
import { generateBounds, randomInteger, breakdownWall, sleep } from "../utils"

const getUnvisitedNeighbours = (
  grid: React.MutableRefObject<any>,
  x: number,
  y: number,
  bounds: {
    x: {
      start: number
      end: number
    }
    y: {
      start: number
      end: number
    }
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
    x + 2 < bounds.x.end
      ? {
          cell: grid.current.children[y].children[x + 2],
          coords: {
            x: x + 2,
            y,
          },
        }
      : undefined
  const bottom: Cell | undefined =
    y + 2 < bounds.y.end
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
  // Create a bounds object to hold the size of the grid
  const bounds = generateBounds(grid)
  // This is an iterative implementation of DFS so a stack is needed
  const stack = []
  // Choose an initial cell, mark it as visited and push it into the stack
  const coords: Coords = {
    x: randomInteger(Math.ceil(bounds.x.end) / 2) * 2,
    y: randomInteger(Math.ceil(bounds.y.end) / 2) * 2,
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
    currentCell!.cell.classList.add("grid__cell--current")
    await sleep(25)
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
        unvisitedNeighbours[randomInteger(unvisitedNeighbours.length)]
      // ... remove the wall between the current cell and the chosen cell...
      const wall =
        grid.current.children[
          (currentCell!.coords.y + randomNeighbour!.coords.y) / 2
        ].children[(currentCell!.coords.x + randomNeighbour!.coords.x) / 2]
      breakdownWall(wall)
      // ... mark the neighbour as visited and push it into the stack.
      randomNeighbour!.cell.dataset.visited = true
      stack.push(randomNeighbour)
    }
    currentCell!.cell.classList.remove("grid__cell--current")
  }
}
