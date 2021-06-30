import { generateBounds } from "./utils"

export const resetVisited = (grid: React.MutableRefObject<any>) => {
  const bounds = generateBounds(grid)

  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.current.children[i].children[j]
      cell.dataset.visited = false
      cell.classList.remove("grid__cell--animate-grow")
    }
  }
}

export const cleanCell = (tile: HTMLElement) => {
  const classes = new Set(tile.classList)

  if (classes.has("grid__cell--animate-grow")) {
    tile.classList.remove("grid__cell--animate-grow")
  }

  if (classes.has("grid__cell--path")) {
    tile.classList.remove("grid__cell--path")
  }

  if (classes.has("grid__cell--wall")) {
    tile.classList.remove("grid__cell--wall")
  }

  if (classes.has("grid__cell--start")) {
    tile.classList.remove("grid__cell--start")
  }
}

export const noWalls = async (grid: React.MutableRefObject<any>) => {
  const bounds = generateBounds(grid)

  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.current.children[i].children[j]
      cell.dataset.visited = false
      cleanCell(cell)
      cell.classList.add("grid__cell--path")
      cell.dataset.type = "path"
    }
  }
}

export const seperatedCells = (grid: React.MutableRefObject<any>) => {
  // Create our bounds.
  const bounds = generateBounds(grid)
  // For every cell in the grid...
  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const cell = grid.current.children[i].children[j]
      cell.dataset.visited = false
      cleanCell(cell)
      // ... if cell is even on its x and y axis make it a path
      // else make it a wall
      if (i % 2 === 0 && j % 2 === 0) {
        cell.classList.add("grid__cell--path")
        cell.dataset.type = "path"
      } else {
        cell.classList.add("grid__cell--wall")
        cell.dataset.type = "wall"
      }
    }
  }
}
