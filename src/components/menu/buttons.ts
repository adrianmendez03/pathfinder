import { dfs } from "../../algos/maze/dfs"
import { recursiveDivision } from "../../algos/maze/recursive"
import { centeredRecursive } from "../../algos/maze/centeredRecursive"
import { noWalls, seperatedCells } from "../../algos/maze/format"
import { binaryTree } from "../../algos/maze/binaryTree"
import { sideWinder } from "../../algos/maze/sideWinder"

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
  {
    name: "binary tree",
    function: binaryTree,
    format: seperatedCells,
  },
  {
    name: "sidewinder",
    function: sideWinder,
    format: seperatedCells,
  },
]
