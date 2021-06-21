import React, { useRef } from "react"

import Grid from "./components/grid"
import Legend from "./components/legend"
import Menu from "./components/menu"
import Footer from "./components/footer"
import "./App.css"
import "./styles/utils.css"

const App: React.FC = () => {
  const gridRef = useRef(null)

  return (
    <div id="app">
      <Grid gridRef={gridRef} />
      <Legend />
      <Menu grid={gridRef} />
      <Footer />
    </div>
  )
}

export default App
