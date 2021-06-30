import { generateBounds } from "../utils"
import { Cell } from "../interface"

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

export const dfs = (grid: React.MutableRefObject<HTMLElement>, start: Cell) => {
  const bounds = generateBounds(grid)
  const stack: Cell[] = []
  stack.push(start)
  while (stack.length > 0) {
    console.log(stack)
    const topNode = stack.pop()
    topNode!.cell.dataset.visited = true
    const unvisitedNeighbours = getUnvisitedNeighbours(
      grid,
      topNode!.coords.x,
      topNode!.coords.y,
      bounds
    )
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      const neighbour = unvisitedNeighbours[i]
      if (neighbour) {
        neighbour.cell.classList.add("grid__cell--start")
        if (neighbour.cell.dataset.end === "true") {
          console.log(true)
          return
        } else {
          stack.push(neighbour)
        }
      }
    }
  }
  console.log(false)
}
