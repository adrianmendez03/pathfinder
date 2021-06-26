import { breakdownWall, generateBounds, randomInteger, sleep } from "./utils"

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
    let currentRun: any[] = []
    for (let j = 0; j < width; j += 2) {
      const cell = grid.current.children[i].children[j]
      cell.classList.add("grid__cell--current")
      await sleep(25)
      if (i === 0 && j < width - 1) {
        breakdownWall(grid.current.children[i].children[j + 1])
      } else if (j === width - 1) {
        currentRun.push([j, i])
        await breakRandomCeiling(grid, currentRun, [j, i])
        currentRun = []
      } else {
        currentRun.push([j, i])
        if (randomInteger(2)) {
          breakdownWall(grid.current.children[i].children[j + 1])
        } else {
          await breakRandomCeiling(grid, currentRun, [j, i])
          currentRun = []
        }
      }
      cell.classList.remove("grid__cell--current")
    }
  }
}
