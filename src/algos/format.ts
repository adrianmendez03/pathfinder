import { generateBounds } from "./utils"

const resetCellData = (cell: HTMLElement) => {
  cell.dataset.visited = "false"
  cell.dataset.distance = "infinity"
}

export const resetPath = (grid: HTMLElement) => {
  const bounds = generateBounds(grid)

  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.children[i].children[j] as HTMLElement
      resetCellData(cell)
      cell.classList.remove("grid__cell--animate-grow")
      // cell.classList.remove("grid__cell--animate-shrink")
      cell.classList.remove("grid__cell--animate-highlight")
      cell.classList.remove("grid__cell--animate-highlight-visited")
      cell.classList.remove("grid__cell--start")
      cell.classList.remove("grid__cell--current")
      cell.classList.remove("grid__cell--path")
    }
  }
}

export const cleanCell = (cell: HTMLElement) => {
  const classes = new Set(cell.classList)

  if (classes.has("grid__cell--animate-grow")) {
    cell.classList.remove("grid__cell--animate-grow")
  }

  if (classes.has("grid__cell--animate-shrink")) {
    cell.classList.remove("grid__cell--animate-shrink")
  }

  if (classes.has("grid__cell--animate-highlight")) {
    cell.classList.remove("grid__cell--animate-highlight")
  }

  if (classes.has("grid__cell--animate-highlight-visited")) {
    cell.classList.remove("grid__cell--animate-highlight-visited")
  }

  if (classes.has("grid__cell--open")) {
    cell.classList.remove("grid__cell--open")
  }

  if (classes.has("grid__cell--wall")) {
    cell.classList.remove("grid__cell--wall")
  }

  if (classes.has("grid__cell--path")) {
    cell.classList.remove("grid__cell--path")
  }

  if (classes.has("grid__cell--start")) {
    cell.classList.remove("grid__cell--start")
  }

  if (classes.has("grid__cell--current")) {
    cell.classList.remove("grid__cell--current")
  }
}

export const noWalls = async (grid: HTMLElement) => {
  const bounds = generateBounds(grid)

  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.children[i].children[j] as HTMLElement
      resetCellData(cell)
      cleanCell(cell)
      cell.classList.add("grid__cell--open")
      cell.dataset.type = "path"
    }
  }
}

export const seperatedCells = (grid: HTMLElement) => {
  // Create our bounds.
  const bounds = generateBounds(grid)
  // For every cell in the grid...
  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.children[i].children[j] as HTMLElement
      resetCellData(cell)
      cleanCell(cell)
      // ... if cell is even on its x and y axis make it a path
      // else make it a wall
      if (i % 2 === 0 && j % 2 === 0) {
        cell.classList.add("grid__cell--open")
        cell.dataset.type = "path"
      } else {
        cell.classList.add("grid__cell--wall")
        cell.dataset.type = "wall"
      }
    }
  }
}
