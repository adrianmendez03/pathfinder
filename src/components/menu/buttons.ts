import { dfs } from "../../algos/maze/dfs"
import { recursiveDivision } from "../../algos/maze/recursiveDivision"

export interface ButtonFormat {
  name: string
  function: any
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
  },
  {
    name: "recursive division",
    function: recursiveDivision,
  },
]
