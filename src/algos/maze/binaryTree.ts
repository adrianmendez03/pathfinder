import {
  Bounds,
  generateBounds,
  randomInteger,
  breakdownWall,
  sleep,
} from "./utils"

// Function to check if North or West Neighbours exist.
const fetchNeighbours = (
  grid: React.MutableRefObject<any>,
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

export const binaryTree = async (grid: React.MutableRefObject<any>) => {
  // Create some variables for convenience
  const bounds = generateBounds(grid)
  const { x, y } = bounds
  const width = x.end - x.start
  const height = y.end - y.start
  // For every separate tile..
  for (let i = 0; i < height; i += 2) {
    for (let j = 0; j < width; j += 2) {
      // ... mark the current tile.
      const cell = grid.current.children[i].children[j]
      cell.classList.add("grid__cell--current")
      await sleep(25)
      // Check if north or west neighbours exist...
      const neighbours = fetchNeighbours(grid, bounds, j, i)
      // ... if both exists...
      if (neighbours.north && neighbours.west) {
        // ... flip a coin, if heads ...
        if (randomInteger(2)) {
          // ... connect cell to north neighbour.
          const northNeighbour = grid.current.children[i - 1].children[j]
          breakdownWall(northNeighbour)
        }
        // If tails ...
        else {
          // ... connect cell to west neighbour
          const westNeighbour = grid.current.children[i].children[j - 1]
          breakdownWall(westNeighbour)
        }
      }
      // If only north exists...
      else if (neighbours.north) {
        // ... connect cell to north neighbour.
        const northNeighbour = grid.current.children[i - 1].children[j]
        breakdownWall(northNeighbour)
      }
      // If only west exists...
      else if (neighbours.west) {
        // ... connect cell to west neighbour.
        const westNeighbour = grid.current.children[i].children[j - 1]
        breakdownWall(westNeighbour)
      }
      // Unmark the current cell
      cell.classList.remove("grid__cell--current")
    }
  }
}
