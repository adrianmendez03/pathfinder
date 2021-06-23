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

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
