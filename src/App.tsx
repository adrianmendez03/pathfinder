import React, { useRef } from "react"

import Grid from "./components/grid"
import { dfs } from "./algos/maze/dfs"
import "./App.css"
import "./styles/utils.css"

const App: React.FC = () => {
  const gridRef = useRef(null)

  return (
    <div id="app">
      <Grid gridRef={gridRef} />
      <button onClick={() => dfs(gridRef)}>DFS</button>
    </div>
  )
}

export default App
