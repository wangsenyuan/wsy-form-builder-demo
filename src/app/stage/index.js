import React from 'react'
import ItemTypes from '../constants'
import { Workspace, Input, List } from './dnd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import "./index.scss"
import { observe, getCurrentSpec } from './model'

function Stage({ rootSpec }) {
  return (
    <div className="stage">
      <div className="workspace">
        <Workspace spec={rootSpec} />
      </div>
      <div className="sidebar">
        <Input className="drag-item" spec={{ type: ItemTypes.Input, leaf: true }} />
        <List className="drag-item" spec={{ type: ItemTypes.List, leaf: false }} />
      </div>
    </div>
  )
}

class ObervedStage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rootSpec: getCurrentSpec()
    }
  }

  componentDidMount() {
    observe(rootSpec => {
      this.setState(rootSpec)
    })
  }

  render() {
    return <Stage rootSpec={this.state.rootSpec} />
  }
}


export default DragDropContext(HTML5Backend)(ObervedStage)