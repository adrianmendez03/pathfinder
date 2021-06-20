import { cleanTile, generateBounds } from "./utils"

export const gridFormat = (grid: React.MutableRefObject<any>) => {
  // Create our bounds.
  const bounds = generateBounds(grid)
  // For every tile in the grid...
  for (let i = 0; i < bounds.y; i++) {
    for (let j = 0; j < bounds.x; j++) {
      const tile = grid.current.children[i].children[j]
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
