import { dfs } from "../../algos/maze/dfs"
import { recursiveDivision } from "../../algos/maze/recursiveDivision"
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
    name: "dfs",
    function: dfs,
    format: seperatedCells,
  },
  {
    name: "recursive division",
    function: recursiveDivision,
    format: noWalls,
  },
]
