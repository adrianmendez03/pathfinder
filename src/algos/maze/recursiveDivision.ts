import { generateBounds } from "./utils"

export const recursiveDivision = async (grid: React.MutableRefObject<any>) => {
  const bounds = generateBounds(grid)
  console.log(bounds)
}
