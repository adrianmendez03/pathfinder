import React from "react"

import { ButtonFormat } from "../menu/buttons"
import "./Button.css"

interface Props {
  refCallback?: React.RefObject<HTMLButtonElement>
  disabled?: boolean
  text: string
  class: string
  name: string
  callback: () => void
}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      ref={props.refCallback ? props.refCallback : null}
      name={props.name}
      value={props.text}
      className={`button ${props.class}`}
      onClick={props.callback}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.text}
    </button>
  )
}

export default Button
