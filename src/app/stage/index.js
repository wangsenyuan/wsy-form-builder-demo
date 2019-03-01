import React from 'react'
import ItemTypes from '../constants'
import { Workspace, Input, List, DroppedInput, DroppedList } from './dnd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import "./index.scss"
import { observe, getCurrentModel, changeTabKey } from './model'
import { Tabs } from 'antd'
import { registerRender } from '../workspace'
import InputEditor from './property/editors/input'
import ListEditor from './property/editors/list'
import { registerPropertyEditor, Editor as PropertyEditor } from './property'

registerRender(ItemTypes.Input, spec => <DroppedInput key={spec.key} spec={spec} />)
registerRender(ItemTypes.List, spec => <DroppedList key={spec.key} spec={spec} />)

registerPropertyEditor(ItemTypes.Input, InputEditor)
registerPropertyEditor(ItemTypes.List, ListEditor)

function Sidebar({ model }) {
  return <Tabs activeKey={model.activeTabKey} onChange={changeTabKey}>
    <Tabs.TabPane tab="Widgets" key="widgets-tab">
      <Input className="drag-item" spec={{ type: ItemTypes.Input, leaf: true, name: "输入框" }} />
      <List className="drag-item"
        spec={{
          type: ItemTypes.List,
          leaf: false,
          name: "列表",
          config: { flexDirection: "vertical" }
        }}
      />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Property" key="property-tab">
      {model.editingSpec ? <PropertyEditor spec={model.editingSpec} /> : "Property"}
    </Tabs.TabPane>
  </Tabs>
}

function Stage({ model }) {
  return (
    <div className="stage">
      <div className="workspace">
        <Workspace spec={model.rootSpec} />
      </div>
      <div className="sidebar">
        <Sidebar model={model} />
      </div>
    </div>
  )
}

class ModelStage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: getCurrentModel()
    }
  }

  componentDidMount() {
    this.unObserve = observe(model => {
      this.setState(model)
    })
  }

  componentWillUnmount() {
    if (this.unObserve) {
      this.unObserve()
      this.unObserve = null
    }
  }

  render() {
    return <Stage model={this.state.model} />
  }
}

export default DragDropContext(HTML5Backend)(ModelStage)