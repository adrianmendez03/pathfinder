import React from "react"

import "./Button.css"

interface Props {
  text?: string
  icon?: string
  class: string
  callback: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<Props> = (props) => {
  return props.text ? (
    <button
      className={`button ${props.class}`}
      onClick={(event) => props.callback(event)}
    >
      {props.text}
    </button>
  ) : (
    <button
      className={`button ${props.class}`}
      onClick={(event) => props.callback(event)}
    >
      <i className={props.icon}></i>
    </button>
  )
}

export default Button
