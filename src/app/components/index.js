import React from 'react'
import { Input as InputEl, Icon as IconEl } from 'antd'
import "./index.scss"

export function Input(props) {
  let { spec, ...rest } = props
  return (
    <InputEl {...rest} className={"item"} />
  )
}

export const Icon = IconEl