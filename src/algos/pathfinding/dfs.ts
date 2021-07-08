import {
  generateBounds,
  generateHTMLElement,
  highlightPath,
  sleep,
} from "../utils"
import { getUnvisitedNeighbours } from "../maze/dfs"
import { Cell } from "../interface"

export const dfs = async (grid: HTMLElement, start: Cell) => {
  const parentMap: {
    [key: string]: string
  } = {}
  const bounds = generateBounds(grid)
  // Add the starting cell to a stack.
  const stack: Cell[] = []
  stack.push(start)
  // While the stack is not empty...
  while (stack.length > 0) {
    // ... get the node at the top of the stack and mark it as visited.
    const topNode = stack.pop()
    topNode!.cell.dataset.visited = "true"
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
      if (neighbour && topNode) {
        neighbour.cell.classList.add(
          "grid__cell--start",
          "grid__cell--animate-grow"
        )
        await sleep(25)
        // Create a string of the neighbour's and topNode coordinates ...
        const neighbourString =
          `${neighbour.coords.x},${neighbour.coords.y}` as string
        const topNodeString =
          `${topNode.coords.x},${topNode.coords.y}` as string
        // Add the corrdinates to the parent map.
        parentMap[neighbourString] = topNodeString
        // ... if the neighbour is the target node...
        if (neighbour.cell.dataset.end === "true") {
          // ... create an array to hold the path.
          const path = []
          // Set the current cell to be the target node.
          let current = neighbour.cell
          // While the current cell exists ...
          while (current) {
            // ... add the current cell to the path stack.
            path.unshift(current)
            const currentString = current.dataset.coords as string
            // If the value exists in the map ...
            if (parentMap[currentString]) {
              // ... set current to be equal to its parent
              current = generateHTMLElement(grid, parentMap[currentString])
            } // Else ...
            else {
              // break
              break
            }
          }

          await highlightPath(path)
          // ... return true
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
