import { generateBounds } from "./utils"

const cleanTile = (tile: HTMLElement) => {
  const classes = new Set(tile.classList)

  if (classes.has("grid__cell--animate-grow")) {
    tile.classList.remove("grid__cell--animate-grow")
  }

  if (classes.has("grid__cell--path")) {
    tile.classList.remove("grid__cell--path")
  } else {
    tile.classList.remove("grid__cell--wall")
  }
}

export const noWalls = (grid: React.MutableRefObject<any>) => {
  const bounds = generateBounds(grid)

  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const tile = grid.current.children[i].children[j]
      tile.dataset.visited = false
      cleanTile(tile)
      tile.classList.add("grid__cell--path")
    }
  }
}

export const seperatedCells = (grid: React.MutableRefObject<any>) => {
  // Create our bounds.
  const bounds = generateBounds(grid)
  // For every tile in the grid...
  for (let i = 0; i < bounds.y.end; i++) {
    for (let j = 0; j < bounds.x.end; j++) {
      const tile = grid.current.children[i].children[j]
      tile.dataset.visited = false
      cleanTile(tile)
      // ... if tile is even on its x and y axis make it a path
      // else make it a wall
      if (i % 2 === 0 && j % 2 === 0) {
        tile.classList.add("grid__cell--path")
      } else {
        tile.classList.add("grid__cell--wall")
      }
    }
  }
}
