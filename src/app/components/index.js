import React from 'react'
import { Input as InputEl } from 'antd'
import "./index.scss"

export function Input(props) {
  let { spec, ...rest } = props
  let { config } = spec
  let label = (config && config.label) || "输入框"
  return (
    <InputEl {...rest} className={"item"} placeholder={label} />
  )
}
