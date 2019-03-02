import React from 'react'
import Stage, { pluginElementPropertyEditoros, pluginDropElementRenders } from './stage'
import ItemTypes from './constants'
import InputEditor from './components/editors/input'
import ListEditor from './components/editors/list'
import { Input } from './components'
import List from './components/list'

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
