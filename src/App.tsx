import React, { useRef } from "react"

import Grid from "./components/grid"
import Menu from "./components/menu"
import "./App.css"
import "./styles/utils.css"

const App: React.FC = () => {
  const gridRef = useRef(null)

  return (
    <div id="app">
      <Grid gridRef={gridRef} />
      <Menu grid={gridRef} />
    </div>
  )
}

export default App
