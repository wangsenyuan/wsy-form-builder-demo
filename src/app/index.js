import React from 'react'
import Stage, { pluginElementPropertyEditoros } from './stage'
import ItemTypes from './constants'
import InputEditor from './components/editors/input'
import ListEditor from './components/editors/list'

pluginElementPropertyEditoros((registerPropertyEditor, editSpec) => {
  registerPropertyEditor(ItemTypes.Input, InputEditor)
  registerPropertyEditor(ItemTypes.List, ListEditor)
})

export default function App(props) {
  return <Stage {...props} />
}
