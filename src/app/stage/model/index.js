import randomString from 'random-string'

let observer = null

function nextKey() {
  return randomString({ length: 20 })
}

let model = {
  rootSpec: {
    children: [],
    leaf: false,
    key: nextKey()
  },
  activeTabKey: "widgets-tab",
  editingSpec: null
}

function emitChange() {
  if (observer !== null) {
    // console.log('emitChange')
    observer(model)
  }
}


export function observe(o) {
  if (observer !== null) {
    throw new Error('multiple obervers not supported')
  }
  observer = o
  emitChange()
  return () => {
    observer = null
  }
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
      // obj.config = { ...childSpec.config }

      cur.children.push(obj)
    } else if (cur.children) {
      cur.children = cur.children.map(item => loop(item))
    }
    return cur
  }
  model.rootSpec = loop({ ...model.rootSpec })
  emitChange()
}

export const getCurrentModel = () => model

export const startEditingSpec = (spec) => {
  console.log('startEditingSpec(' + JSON.stringify(spec) + ")")
  model.editingSpec = spec
  model.activeTabKey = "property-tab"
  emitChange()
}

export const editSpec = (spec) => {
  function loop(cur) {
    if (cur.key !== spec.key) {
      if (cur.children) {
        cur.children = cur.children.map(item => loop(item))
      }
    } else {
      cur.config = { ...spec.config }
      // console.log('spec config to (' + JSON.stringify(cur.config) + ')')
    }
    return { ...cur }
  }

  if (!spec.config) {
    // no config, no update
    return
  }

  model.rootSpec = loop(model.rootSpec)
  emitChange()
}

export const changeTabKey = (key) => {
  console.log('changeTabKey(' + key + ')')
  model.activeTabKey = key
  emitChange()
}