import { generateBounds, randomInteger, sleep } from "./utils"

const generateWallDirection = (width: number, height: number): string => {
  const randomNum = randomInteger(width + height)

  return randomNum < width ? "vertical" : "horizontal"
}

export const recursiveDivision = async (
  grid: React.MutableRefObject<any>,
  bounds = generateBounds(grid)
) => {
  const { x, y } = bounds

  const width = x.end - x.start
  const height = y.end - y.start

  if (width <= 2 || height <= 2) {
    return
  }

  const wallDirection = generateWallDirection(width, height)
  let wallPlacement, gap, wallLength, left, right

  if (wallDirection === "vertical") {
    wallPlacement = Math.floor(width / 2) + x.start
    wallLength = y.end - y.start
    gap = randomInteger(wallLength) + y.start
    left = {
      ...bounds,
      x: {
        start: x.start,
        end: wallPlacement - 1,
      },
    }
    right = {
      ...bounds,
      x: {
        start: wallPlacement + 1,
        end: x.end,
      },
    }
  } else {
    wallPlacement = Math.floor(height / 2) + y.start
    wallLength = x.end - x.start
    gap = randomInteger(wallLength) + x.start
    left = {
      ...bounds,
      y: {
        start: y.start,
        end: wallPlacement - 1,
      },
    }
    right = {
      ...bounds,
      y: {
        start: wallPlacement + 1,
        end: y.end,
      },
    }
  }

  const start = wallDirection === "vertical" ? y.start : x.start

  for (let i = 0; i < wallLength; i++) {
    if (i !== gap) {
      const cell =
        wallDirection === "vertical"
          ? grid.current.children[start + i].children[wallPlacement]
          : grid.current.children[wallPlacement].children[start + i]
      cell.classList.add("grid__cell--wall", "grid__cell--animate-grow")
      await sleep(25)
    }
  }

  await recursiveDivision(grid, left)
  await recursiveDivision(grid, right)
}
