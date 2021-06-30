import { generateBounds, sleep } from "../utils"
import { getUnvisitedNeighbours } from "../maze/dfs"
import { Cell } from "../interface"

export const dfs = async (
  grid: React.MutableRefObject<HTMLElement>,
  start: Cell
) => {
  const bounds = generateBounds(grid)
  const stack: Cell[] = []
  stack.push(start)
  while (stack.length > 0) {
    const topNode = stack.pop()
    topNode!.cell.dataset.visited = true
    const unvisitedNeighbours = getUnvisitedNeighbours(
      grid,
      topNode!.coords.x,
      topNode!.coords.y,
      bounds,
      1
    )
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      const neighbour = unvisitedNeighbours[i]
      if (neighbour) {
        neighbour.cell.classList.add(
          "grid__cell--start",
          "grid__cell--animate-grow"
        )
        await sleep(25)
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
