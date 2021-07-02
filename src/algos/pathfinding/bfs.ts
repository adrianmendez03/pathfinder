import { Cell } from "../interface"
import { getUnvisitedNeighbours } from "../maze/dfs"
import { generateBounds, sleep } from "../utils"

export const bfs = async (grid: HTMLElement, start: Cell) => {
  const bounds = generateBounds(grid)
  // Add the start to the queue and mark it as visited.
  start.cell.dataset.visited = true
  const q = []
  q.push(start)
  // While the queue is not empty...
  while (q.length > 0) {
    // ... get the node at the top of the queue.
    const node = q.shift()
    if (node) {
      // Fetch all of its unvisited neighbours.
      const unvisitedNeighbours = getUnvisitedNeighbours(
        grid,
        node.coords.x,
        node.coords.y,
        bounds,
        1
      )
      // For every unvisited neighbour ...
      for (let i = 0; i < unvisitedNeighbours.length; i++) {
        const neighbour = unvisitedNeighbours[i]
        await sleep(25)
        if (neighbour) {
          neighbour.cell.classList.add(
            "grid__cell--start",
            "grid__cell--animate-grow"
          )
          // ... mark it as visited.
          neighbour.cell.dataset.visited = true
          // If the neighbour is the target cell ...
          if (neighbour.cell.dataset.end === "true") {
            // ... return true
            return true
          }
          // Else ...
          else {
            // ... add the neighbour to the queue
            q.push(neighbour)
          }
        }
      }
    }
  }
  return false
}
