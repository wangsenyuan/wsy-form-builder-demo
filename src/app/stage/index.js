import React from 'react'
import ItemTypes from '../constants'
import InputEl from '../components/input'
import { registerRender } from '../workspace'
import { Workspace, Input } from './dnd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import "./index.scss"

registerRender(ItemTypes.Input, spec => <InputEl key={spec.rdKey} spec={spec} />)

class Stage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rootSpec: {
        children: [],
        leaf: false
      }
    }
  }
  addChild = (parentSpec, childSpec) => {
    console.log('addChild called')
    function loop(cur) {
      if (cur === parentSpec) {
        if (!cur.children) {
          cur.children = []
        }

        let obj = { ...childSpec }
        if (!obj.leaf) {
          obj.addChild = this.addChild
        }

        cur.children.push(obj)
      } else if (cur.children) {
        cur.children = cur.children.map(item => loop(item))
      }
      return cur
    }
    let { rootSpec } = this.state
    rootSpec = loop(rootSpec)
    this.setState({ rootSpec })
  }

  render() {
    return (
      <div className="stage">
        <div className="workspace">
          <Workspace spec={this.state.rootSpec} addChild={this.addChild} />
        </div>
        <div className="sidebar">
          <Input spec={{ type: ItemTypes.Input, leaf: true }} />
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Stage)