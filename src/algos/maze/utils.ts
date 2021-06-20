export const generateBounds = (grid: React.MutableRefObject<any>) => {
  return {
    x: Math.ceil(grid.current.children[0].children.length),
    y: Math.ceil(grid.current.children.length),
  }
}

export const cleanTile = (tile: HTMLElement) => {
  const classes = new Set(tile.classList)
  if (classes.has("grid__cell--path")) {
    tile.classList.remove("grid__cell--path")
  } else {
    tile.classList.remove("grid__cell--wall")
  }
}
