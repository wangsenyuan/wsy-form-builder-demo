import React from 'react'
import { Input as InputEl } from 'antd'

export default function Input(props) {
  let { rdKey, ...rest } = props
  return (
    <InputEl key={rdKey} {...rest} />
  )
}