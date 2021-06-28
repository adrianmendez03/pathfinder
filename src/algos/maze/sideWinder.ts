import { breakdownWall, generateBounds, randomInteger, sleep } from "../utils"

const breakRandomCeiling = async (
  grid: React.MutableRefObject<any>,
  currentRun: any[],
  coords: number[]
) => {
  if (coords[1] === 0) {
    return
  } else if (currentRun.length > 0) {
    const randomIndex = randomInteger(currentRun.length)
    const randomValue = currentRun[randomIndex]
    breakdownWall(
      grid.current.children[randomValue[1] - 1].children[randomValue[0]]
    )
  } else {
    breakdownWall(grid.current.children[coords[1] - 1].children[coords[0]])
  }
}

export const sideWinder = async (grid: React.MutableRefObject<any>) => {
  // Create some variables for convenience
  const bounds = generateBounds(grid)
  const { x, y } = bounds
  const height = y.end - y.start
  const width = x.end - x.start
  // For every seperate tile...
  for (let i = 0; i < height; i += 2) {
    // ... create an array to hold the current segment of tiles.
    let currentRun: any[] = []
    for (let j = 0; j < width; j += 2) {
      // Mark the current tile.
      const cell = grid.current.children[i].children[j]
      cell.classList.add("grid__cell--current")
      await sleep(25)
      // If the tile is in the first row...
      if (i === 0 && j < width - 1) {
        // ... breakdown the west wall.
        breakdownWall(grid.current.children[i].children[j + 1])
      }
      // If it is the last tile in the row...
      else if (j === width - 1) {
        // ... break a random ceiling.
        currentRun.push([j, i])
        await breakRandomCeiling(grid, currentRun, [j, i])
        currentRun = []
      }
      // Otherwise...
      else {
        // Add the current tile to the current segment array.
        currentRun.push([j, i])
        // Flip a coin to decide if you'll continue the segment..
        if (randomInteger(2)) {
          // ... if segment continues, break the west wall.
          breakdownWall(grid.current.children[i].children[j + 1])
        }
        // Else...
        else {
          //... break a random ceiling.
          await breakRandomCeiling(grid, currentRun, [j, i])
          currentRun = []
        }
      }
      cell.classList.remove("grid__cell--current")
    }
  }
}
