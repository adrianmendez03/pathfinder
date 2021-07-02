import React, { useCallback, useState } from "react"

import Grid from "./components/grid"
import Menu from "./components/menu"
import "./App.css"
import "./styles/utils.css"

const App: React.FC = () => {
  const [grid, setGrid] = useState<HTMLElement | null>(null)
  const connectGridRef = useCallback((gridNode: HTMLElement) => {
    setGrid(gridNode)
  }, [])

  return (
    <div id="app">
      <Grid gridRef={connectGridRef} grid={grid} />
      <Menu grid={grid} />
    </div>
  )
}

export default App
