import { Cell } from "../interface"
import { getUnvisitedNeighbours } from "../maze/dfs"
import {
  generateBounds,
  sleep,
  generateHTMLElement,
  highlightPath,
} from "../utils"

export const bfs = async (grid: HTMLElement, start: Cell) => {
  const parentMap: {
    [key: string]: string
  } = {}
  const bounds = generateBounds(grid)
  // Add the start to the queue and mark it as visited.
  start.cell.dataset.visited = "true"
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
        await sleep(10)
        if (neighbour) {
          // Create a string of the neighbour's and topNode coordinates ...
          const neighbourString =
            `${neighbour.coords.x},${neighbour.coords.y}` as string
          const topNodeString = `${node.coords.x},${node.coords.y}` as string
          parentMap[neighbourString] = topNodeString
          neighbour.cell.classList.add("grid__cell--animate-highlight-visited")
          // ... mark it as visited.
          neighbour.cell.dataset.visited = "true"
          // If the neighbour is the target cell ...
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
