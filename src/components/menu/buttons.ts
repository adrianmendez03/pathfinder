// PATHFINDER ALGORITHMS
import { dfs as algoDfs } from "../../algos/pathfinding/dfs"
import { bfs } from "../../algos/pathfinding/bfs"
// MAZEGENERATION ALGORITHMS
import { dfs as mazeDfs } from "../../algos/maze/dfs"
import { recursiveDivision } from "../../algos/maze/recursive"
import { centeredRecursive } from "../../algos/maze/centeredRecursive"
import { noWalls, seperatedCells } from "../../algos/format"
import { binaryTree } from "../../algos/maze/binaryTree"
import { sideWinder } from "../../algos/maze/sideWinder"

export interface ButtonFormat {
  name: string
  function?: any
  format?: any
}

export const algos = {
  header: "aglorithms",
  buttons: [
    {
      name: "dfs",
      function: algoDfs,
    },
    {
      name: "bfs",
      function: bfs,
    },
  ],
}

export const mazes = {
  header: "maze generation",
  buttons: [
    {
      name: "clear grid",
      format: noWalls,
    },
    {
      name: "randomized dfs",
      function: mazeDfs,
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
  ],
}

export const distances = {
  header: "distance",
  buttons: [
    {
      name: "close",
    },
    {
      name: "mid",
    },
    {
      name: "far",
    },
  ],
}
