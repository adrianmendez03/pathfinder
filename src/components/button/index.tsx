import React from "react"

import "./Button.css"

interface Props {
  refCallback?: React.RefObject<HTMLButtonElement>
  disabled?: boolean
  text: string
  class: string
  name: string
  callback: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      ref={props.refCallback ? props.refCallback : null}
      name={props.name}
      value={props.text}
      className={`button ${props.class}`}
      onClick={(event) => props.callback(event)}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.text}
    </button>
  )
}

export default Button
