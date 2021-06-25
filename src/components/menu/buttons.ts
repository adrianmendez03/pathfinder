import { dfs } from "../../algos/maze/dfs"
import { recursiveDivision } from "../../algos/maze/recursive"
import { centeredRecursive } from "../../algos/maze/centeredRecursive"
import { noWalls, seperatedCells } from "../../algos/maze/format"

export interface ButtonFormat {
  name: string
  function: any
  format?: any
}

export const algos = [
  {
    name: "dfs",
    function: dfs,
  },
]

export const mazes = [
  {
    name: "randomized dfs",
    function: dfs,
    format: seperatedCells,
  },
  {
    name: "recursive division",
    function: recursiveDivision,
    format: noWalls,
  },
  {
    name: "centered recursion",
    function: centeredRecursive,
    format: noWalls,
  },
]
