import { generateBounds, sleep } from "../utils"
import { getUnvisitedNeighbours } from "../maze/dfs"
import { Cell } from "../interface"

export const dfs = async (grid: HTMLElement, start: Cell) => {
  const bounds = generateBounds(grid)
  // Add the starting cell to a stack.
  const stack: Cell[] = []
  stack.push(start)
  // While the stack is not empty...
  while (stack.length > 0) {
    // ... get the node at the top of the stack and mark it as visited.
    const topNode = stack.pop()
    topNode!.cell.dataset.visited = true
    // Fetch all of its unvisited neighbours.
    const unvisitedNeighbours = getUnvisitedNeighbours(
      grid,
      topNode!.coords.x,
      topNode!.coords.y,
      bounds,
      1
    )
    // For every non visited neighbour...
    for (let i = 0; i < unvisitedNeighbours.length; i++) {
      const neighbour = unvisitedNeighbours[i]
      if (neighbour) {
        neighbour.cell.classList.add(
          "grid__cell--start",
          "grid__cell--animate-grow"
        )
        await sleep(25)
        // ... if the neighbour is the target node...
        if (neighbour.cell.dataset.end === "true") {
          // ... return true
          console.log(true)
          return
        }
        // Else ...
        else {
          // ... push the neighbour to the stack.
          stack.push(neighbour)
        }
      }
    }
  }
  console.log(false)
}
