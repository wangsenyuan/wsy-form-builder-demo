import React from 'react'
import { Input as InputEl, Icon as IconEl } from 'antd'
import "./index.scss"

export function Input(props) {
  let { spec, ...rest } = props
  let { config } = spec
  let label = (config && config.label) || "输入框"
  return (
    <InputEl {...rest} className={"item"} placeholder={label} />
  )
}

export const Icon = IconEl