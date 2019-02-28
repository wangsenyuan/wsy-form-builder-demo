import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../constants'
import InputEl from '../../components/input'
import WorkspaceEl from '../../workspace'

const inputSource = {
  beginDrag(props) {
    return {
      spec: props.spec
    };
  }
}

function inputCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function DragableInput(props) {
  let { connectDragSource, isDragging, ...rest } = props

  return connectDragSource(
    <div style={{ width: '100%', height: '100%' }}>
      <InputEl {...rest} />
    </div>
  )
}

export const Input = DragSource(ItemTypes.Input, inputSource, inputCollect)(DragableInput)

const workspaceTarget = {
  canDrop(props) {
    console.log('workspace canDrop called')
    // should determine by the type of target
    return true
  },

  drop(props, monitor) {
    console.log('workspace drop called')
    //should update the spec
    let parentSpec = props.spec
    let addChild = props.addChild
    let item = monitor.getItem()
    addChild(parentSpec, item && item.spec && { ...item.spec })
  }
}

function workspaceCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

function DropableWorkspace(props) {
  let { connectDropTarget, isOver, canDrop, ...rest } = props
  return connectDropTarget(
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <WorkspaceEl {...rest} />
    </div>
  )
}

export const Workspace = DropTarget(ItemTypes.Input, workspaceTarget, workspaceCollect)(DropableWorkspace)