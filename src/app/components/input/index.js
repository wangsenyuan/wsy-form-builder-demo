import React from 'react'
import { Input as InputEl } from 'antd'
import "./index.scss"

export default function Input(props) {
  let { spec, ...rest } = props
  return (
    <InputEl {...rest} className={"item"} />
  )
}