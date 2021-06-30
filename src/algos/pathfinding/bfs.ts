import { Cell } from "../interface"
import { getUnvisitedNeighbours } from "../maze/dfs"
import { generateBounds, sleep } from "../utils"

export const bfs = async (grid: React.MutableRefObject<any>, start: Cell) => {
  const bounds = generateBounds(grid)
  start.cell.dataset.visited = true
  const q = []
  q.push(start)
  while (q.length > 0) {
    const node = q.shift()
    if (node) {
      const unvisitedNeighbours = getUnvisitedNeighbours(
        grid,
        node.coords.x,
        node.coords.y,
        bounds,
        1
      )
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbour = unvisitedNeighbours[i]
        await sleep(25)
        if (neighbour) {
          neighbour.cell.classList.add(
            "grid__cell--start",
            "grid__cell--animate-grow"
          )
          neighbour.cell.dataset.visited = true
          if (neighbour.cell.dataset.end === "true") {
            return true
          } else {
            q.push(neighbour)
          }
        }
      }
    }
  }
  return false
}
