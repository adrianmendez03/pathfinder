import React from "react"

import Grid from "./components/grid"
import { dfs } from "./algos/maze/dfs"
import "./App.css"
import "./styles/utils.css"

const App: React.FC = () => {
  return (
    <div id="app">
      <Grid />
      <button onClick={dfs}>DFS</button>
    </div>
  )
}

export default App
