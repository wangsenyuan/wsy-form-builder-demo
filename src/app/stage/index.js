import React from 'react'
import ItemTypes from '../constants'
import { Workspace, Input, List, DroppedInput, DroppedList } from './dnd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import "./index.scss"
import { observe, getCurrentSpec } from './model'
import { Tabs } from 'antd'
import { registerRender } from '../workspace'

registerRender(ItemTypes.Input, spec => <DroppedInput key={spec.key} spec={spec} />)
registerRender(ItemTypes.List, spec => <DroppedList key={spec.key} spec={spec} />)

function Sidebar(rootSpec) {
  return <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Widgets" key="1">
      <Input className="drag-item" spec={{ type: ItemTypes.Input, leaf: true, name: "输入框" }} />
      <List className="drag-item" spec={{ type: ItemTypes.List, leaf: false, name: "列表" }} />
    </Tabs.TabPane>
    <Tabs.TabPane tab="Property" key="2">
      Properties Go Here
    </Tabs.TabPane>
  </Tabs>
}

function Stage({ rootSpec }) {
  return (
    <div className="stage">
      <div className="workspace">
        <Workspace spec={rootSpec} />
      </div>
      <div className="sidebar">
        <Sidebar rootSpec={rootSpec} />
      </div>
    </div>
  )
}

class ObervingStage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rootSpec: getCurrentSpec()
    }
  }

  componentDidMount() {
    this.unObserve = observe(rootSpec => {
      this.setState(rootSpec)
    })
  }

  componentWillUnmount() {
    if (this.unObserve) {
      this.unObserve()
      this.unObserve = null
    }
  }

  render() {
    return <Stage rootSpec={this.state.rootSpec} />
  }
}


export default DragDropContext(HTML5Backend)(ObervingStage)