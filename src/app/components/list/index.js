import React from 'react'
import "./index.scss"

export default function List(props) {
  let { spec, children } = props

  let horizontal = (spec && spec.config && spec.config.horizontal) || false

  let className = (horizontal && "horizontal-list") || "vertical-list"

  className += " list"

  return <div className={className}>
    {children}
  </div>
}