export const generateBounds = (grid: HTMLElement) => {
  return {
    x: {
      start: 0,
      end: grid.children[0].children.length,
    },
    y: {
      start: 0,
      end: grid.children.length,
    },
  }
}

export const randomInteger = (bound: number): number => {
  return Math.floor(Math.random() * bound)
}

export const randomIntegerBetweenTwoValues = (
  min: number,
  max: number
): number => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const createWall = (cell: HTMLElement) => {
  cell.classList.remove("grid__cell--path")
  cell.classList.add("grid__cell--wall", "grid__cell--animate-grow")
  cell.dataset.type = "wall"
}

export const breakdownWall = (cell: HTMLElement) => {
  cell.classList.remove("grid__cell--wall")
  cell.classList.add("grid__cell--path", "grid__cell--animate-grow")
  cell.dataset.type = "path"
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
