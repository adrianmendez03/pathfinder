import {
  generateBounds,
  randomInteger,
  randomIntegerBetweenTwoValues,
  createWall,
  sleep,
} from "../utils"

const chooseWallDirection = (width: number, height: number): string => {
  // Wall direction is based on the width and height.
  // Choose a random value between 0 and width + height.
  const randomValue = randomInteger(width + height)
  // If the width is less than the random value return Horizontal.
  // Else, return Vertical
  // This is purely aesthetical.
  return width < randomValue ? "horizontal" : "vertical"
}

export const recursiveDivision = async (
  grid: React.MutableRefObject<any>,
  bounds = generateBounds(grid)
) => {
  // Get the bounds that we're working with.
  const { x, y } = bounds
  // Get the width and height for convenience
  const width = x.end - x.start
  const height = y.end - y.start
  // If the width or height is less than two...
  if (width <= 2 || height <= 2) {
    // ... break the recursiion.
    return
  }
  // Choose wall direction...
  const wallDirection = chooseWallDirection(width, height)
  // If the wall direction is horizontal the length should be equal to the width, vice versa
  const wallLength = wallDirection === "horizontal" ? width : height
  // The wall should only be placed on even tiles and not touch either ends
  const wallIndex =
    wallDirection === "horizontal"
      ? Math.floor(randomIntegerBetweenTwoValues(y.start + 2, y.end - 1) / 2) *
        2
      : Math.floor(randomIntegerBetweenTwoValues(x.start + 2, x.end - 1) / 2) *
        2
  // The gap should only be placed on odd tiles and can be placed anywhere anlong the wall
  const gapIndex =
    wallDirection === "horizontal"
      ? Math.floor(randomIntegerBetweenTwoValues(x.start, x.end - 1) / 2) * 2 +
        1
      : Math.floor(randomIntegerBetweenTwoValues(y.start, y.end - 1) / 2) * 2 +
        1

  // Loop through the length of the wall
  for (let i = 0; i < wallLength; i++) {
    // The location of the cell is dependant on the wall direction
    // If the direction is horizontal then the cell's location is [x.start plus the current iteration, wallIndex]
    // Else the cell's location is [wallIndex, y.start plus the current iteration]
    const cell =
      wallDirection === "horizontal"
        ? grid.current.children[wallIndex].children[x.start + i]
        : grid.current.children[y.start + i].children[wallIndex]
    // If location of the cell is not equal to the gap index, form a wall.
    if (wallDirection === "horizontal") {
      if (x.start + i !== gapIndex) {
        createWall(cell)
      }
    } else {
      if (y.start + i !== gapIndex) {
        createWall(cell)
      }
    }
    await sleep(25)
  }
  // If the divide is horizontal recurse on the top and bottom sections
  // Else recurse on the left and right sides
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
