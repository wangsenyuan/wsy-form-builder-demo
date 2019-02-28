import React from 'react'
// import ItemTypes from '../constants'
// import Input from '../components/input'

let renders = {}
let globalKey = 0
export function registerRender(type, render) {
  if (!type || !render) {
    throw new Error("invalid argument")
  }
  if (renders[type]) {
    throw new Error("can't register multiple renders for the same type: " + type)
  }
  renders[type] = render
}

function renderChild(child) {
  if (!child || !child.type) {
    return null
  }
  if (!renders[child.type]) {
    return null
  }

  globalKey--

  let childWithKey = Object.assign(child, { rdKey: globalKey })

  return renders[child.type](childWithKey)
}

export default function Workspace({ spec }) {
  return <div>
    {spec && spec.children.map(child => renderChild(child))}
  </div>
}