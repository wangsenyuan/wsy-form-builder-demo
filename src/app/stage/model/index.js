import React from 'react'
import randomString from 'random-string'

let observer = null

function nextKey() {
  return randomString({ length: 20 })
}

let rootSpec = {
  children: [],
  leaf: false,
  key: nextKey()
}

export function observe(o) {
  if (observer !== null) {
    throw new Error('multiple obervers not supported')
  }
  observer = o
  emitChange()
}

export function addChild(parentSpec, childSpec) {
  console.log('addChild called')
  function loop(cur) {
    if (cur.key === parentSpec.key) {
      if (!cur.children) {
        cur.children = []
      }

      let obj = { ...childSpec }
      obj.key = nextKey()

      cur.children.push(obj)
    } else if (cur.children) {
      cur.children = cur.children.map(item => loop(item))
    }
    return cur
  }
  rootSpec = loop(rootSpec)
  emitChange()
}

function emitChange() {
  if (observer !== null) {
    // console.log('emitChange')
    observer(rootSpec)
  }
}

export const getCurrentSpec = () => rootSpec