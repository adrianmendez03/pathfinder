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
  cell.classList.remove("grid__cell--open")
  cell.classList.add("grid__cell--wall", "grid__cell--animate-grow")
  cell.dataset.type = "wall"
}

export const breakdownWall = (cell: HTMLElement) => {
  cell.classList.remove("grid__cell--wall")
  cell.classList.add("grid__cell--open", "grid__cell--animate-grow")
  cell.dataset.type = "path"
}

export const generateHTMLElement = (
  grid: HTMLElement,
  coords: string
): HTMLElement => {
  const coordsArr = coords.split(",")
  const x = parseInt(coordsArr[0])
  const y = parseInt(coordsArr[1])
  return grid.children[y].children[x] as HTMLElement
}

export const highlightPath = async (path: HTMLElement[]) => {
  for (let i = 0; i < path.length; i++) {
    const cell = path[i]
    await sleep(0)
    cell.classList.add("grid__cell--animate-highlight", "grid__cell--current")
    await sleep(25)
  }
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
