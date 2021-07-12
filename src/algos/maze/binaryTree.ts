import { generateBounds, randomInteger, breakdownWall, sleep } from "../utils"
import { Bounds } from "../interface"

// Function to check if North or West Neighbours exist.
const fetchNeighbours = (
  grid: HTMLElement,
  bounds: Bounds,
  x: number,
  y: number
) => {
  const neighbours = {
    north: false,
    west: false,
  }

  if (y - 1 >= 0) {
    neighbours.north = true
  }
  if (x - 1 >= 0) {
    neighbours.west = true
  }

  return neighbours
}

export const binaryTree = async (grid: HTMLElement) => {
  // Create some variables for convenience
  const bounds = generateBounds(grid)
  const { x, y } = bounds
  const width = x.end - x.start
  const height = y.end - y.start
  // For every separate tile..
  for (let i = 0; i < height; i += 2) {
    for (let j = 0; j < width; j += 2) {
      // ... mark the current tile.
      const cell = grid.children[i].children[j]
      cell.classList.add("grid__cell--current")
      await sleep(10)
      // Check if north or west neighbours exist...
      const neighbours = fetchNeighbours(grid, bounds, j, i)
      // ... if both exists...
      if (neighbours.north && neighbours.west) {
        // ... flip a coin, if heads ...
        if (randomInteger(2)) {
          // ... connect cell to north neighbour.
          const northNeighbour = grid.children[i - 1].children[j] as HTMLElement
          breakdownWall(northNeighbour, "grid__cell--animate-shrink")
        }
        // If tails ...
        else {
          // ... connect cell to west neighbour
          const westNeighbour = grid.children[i].children[j - 1] as HTMLElement
          breakdownWall(westNeighbour, "grid__cell--animate-shrink")
        }
      }
      // If only north exists...
      else if (neighbours.north) {
        // ... connect cell to north neighbour.
        const northNeighbour = grid.children[i - 1].children[j] as HTMLElement
        breakdownWall(northNeighbour, "grid__cell--animate-shrink")
      }
      // If only west exists...
      else if (neighbours.west) {
        // ... connect cell to west neighbour.
        const westNeighbour = grid.children[i].children[j - 1] as HTMLElement
        breakdownWall(westNeighbour, "grid__cell--animate-shrink")
      }
      // Unmark the current cell
      cell.classList.remove("grid__cell--current")
    }
  }
}
