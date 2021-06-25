export interface Bound {
  start: number
  end: number
}

export interface Bounds {
  x: Bound
  y: Bound
}

export const generateBounds = (grid: React.MutableRefObject<any>) => {
  return {
    x: {
      start: 0,
      end: Math.ceil(grid.current.children[0].children.length),
    },
    y: {
      start: 0,
      end: Math.ceil(grid.current.children.length),
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

export const breakdownWall = (cell: any) => {
  cell.classList.remove("grid__cell--wall")
  cell.classList.add("grid__cell--path", "grid__cell--animate-grow")
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
