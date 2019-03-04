import React from 'react'
import Stage, { pluginElementPropertyEditoros, pluginDropElementRenders, pluginWidgets } from 'wsy-form-builder'
import ItemTypes from './stage/constants'
import InputEditor from './components/editors/input'
import ListEditor from './components/editors/list'
import { Input } from './components'
import List from './components/list'

pluginWidgets(() => {
  return [
    {
      name: "输入框",
      type: ItemTypes.Input,
      spec: {
        type: ItemTypes.Input, leaf: true, name: "输入框"
      }
    },
    {
      name: "列表",
      type: ItemTypes.List,
      spec: {
        type: ItemTypes.List,
        leaf: false,
        name: "列表",
        config: { flexDirection: "vertical" }
      }
    }
  ]
})

pluginDropElementRenders((registerRender, makeDropElement, makeDropList) => {
  let DroppedInput = makeDropElement(Input)
  registerRender(ItemTypes.Input, spec => <DroppedInput key={spec.key} spec={spec} />)

  let DroppedList = makeDropList(ItemTypes.Input, List)
  registerRender(ItemTypes.List, spec => <DroppedList key={spec.key} spec={spec} />)
})

pluginElementPropertyEditoros((registerPropertyEditor) => {
  registerPropertyEditor(ItemTypes.Input, InputEditor)
  registerPropertyEditor(ItemTypes.List, ListEditor)
})

export default function App(props) {
  return <Stage {...props} />
}
