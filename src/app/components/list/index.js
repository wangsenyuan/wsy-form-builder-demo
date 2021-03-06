import React from 'react'
import "./index.scss"

export default function List(props) {
  let { spec, children } = props
  // console.log("List spec (" + JSON.stringify(spec) + ")")
  let flexDirection = (spec && spec.config && spec.config.flexDirection) || "vertical"

  let className = flexDirection + "-list"

  className += " list"

  // console.log('List className = ' + className)

  return <div className={className}>
    {children}
  </div>
}