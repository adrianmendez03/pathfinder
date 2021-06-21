export const generateBounds = (grid: React.MutableRefObject<any>) => {
  return {
    x: Math.ceil(grid.current.children[0].children.length),
    y: Math.ceil(grid.current.children.length),
  }
}
