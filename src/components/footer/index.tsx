import React from "react"

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer>
      Built by{" "}
      <a target="_blank" rel="noreferrer" href="https://www.adrianmendez.me">
        Adrian Mendez
      </a>
    </footer>
  )
}

export default Footer
