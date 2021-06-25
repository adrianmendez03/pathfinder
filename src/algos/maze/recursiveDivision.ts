import {
  generateBounds,
  randomInteger,
  randomIntegerBetweenTwoValues,
  sleep,
} from "./utils"

const chooseWallDirection = (width: number, height: number): string => {
  const randomValue = randomInteger(width + height)
  return width < randomValue ? "horizontal" : "vertical"
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

  const wallDirection = chooseWallDirection(width, height)
  const wallLength = wallDirection === "horizontal" ? width : height
  const wallIndex =
    wallDirection === "horizontal"
      ? Math.floor((y.start + height / 2) / 2) * 2
      : Math.floor((x.start + width / 2) / 2) * 2
  const gapIndex =
    wallDirection === "horizontal"
      ? Math.floor(randomIntegerBetweenTwoValues(x.start + 1, x.end - 1) / 2) *
          2 +
        1
      : Math.floor(randomIntegerBetweenTwoValues(y.start + 1, y.end - 1) / 2) *
          2 +
        1

  for (let i = 0; i < wallLength; i++) {
    const cell =
      wallDirection === "horizontal"
        ? grid.current.children[wallIndex].children[x.start + i]
        : grid.current.children[y.start + i].children[wallIndex]
    if (wallDirection === "horizontal") {
      if (x.start + i !== gapIndex) {
        cell.classList.add("grid__cell--wall", "grid__cell--animate-grow")
      }
    } else {
      if (y.start + i !== gapIndex) {
        cell.classList.add("grid__cell--wall", "grid__cell--animate-grow")
      }
    }
    await sleep(25)
  }

  if (wallDirection === "horizontal") {
    const topBounds = {
      ...bounds,
      y: {
        start: y.start,
        end: wallIndex,
      },
    }
    const bottomBounds = {
      ...bounds,
      y: {
        start: wallIndex + 1,
        end: y.end,
      },
    }
    await recursiveDivision(grid, topBounds)
    await recursiveDivision(grid, bottomBounds)
  } else {
    const leftBounds = {
      ...bounds,
      x: {
        start: x.start,
        end: wallIndex,
      },
    }
    const rightBounds = {
      ...bounds,
      x: {
        start: wallIndex + 1,
        end: x.end,
      },
    }
    await recursiveDivision(grid, leftBounds)
    await recursiveDivision(grid, rightBounds)
  }
}
