import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../constants'
import InputEl from '../../components/input'
import ListEl from '../../components/list'
import WorkspaceEl, { registerRender, WrapList } from '../../workspace'
import "./index.scss"
import { addChild } from '../model'
import { Icon } from 'antd';

function dropDropable(types) {
  return (Elem, props) => {
    // console.log('dropDropable called')
    let Res = makeDropable(types, Elem)
    return <Res dropable={true} {...props} />
  }
}

function DroppedElem(Elem, drop) {
  return props => {
    let className = "dropped"
    if (drop) {
      className += " droppable"
    }
    return <div className={className}>
      {!drop ? <Elem {...props} /> : drop(Elem, props)}
      <Icon type="edit" />
      <Icon type="delete" />
      <Icon type="up" />
      <Icon type="down" />
    </div>
  }
}

const DroppedInput = DroppedElem(InputEl)

registerRender(ItemTypes.Input, spec => <DroppedInput key={spec.key} spec={spec} />)

const DroppedList = DroppedElem(WrapList(ListEl), dropDropable(ItemTypes.Input))

registerRender(ItemTypes.List, spec => <DroppedList key={spec.key} spec={spec} />)

function makeDragable(name, type) {
  const elemSource = {
    beginDrag(props) {
      return {
        spec: props.spec
      };
    }
  }

  function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }

  function DraggleElement(props) {
    let { connectDragSource } = props

    return connectDragSource(
      <div style={{ width: '100%' }}>
        <span>{name}</span>
      </div>
    )
  }

  return DragSource(type, elemSource, collect)(DraggleElement)
}

export const Input = makeDragable("输入框", ItemTypes.Input)
export const List = makeDragable("列表", ItemTypes.Input)

function makeDropable(types, Elem) {
  const dropTarget = {
    canDrop(props) {
      // console.log('check canDrop: ' + JSON.stringify(props))
      // console.log('workspace canDrop called: ' + JSON.stringify(props))
      // should determine by the type of target
      return props && props.spec && props.spec.leaf === false
    },

    drop(props, monitor) {
      const hasDroppedOnChild = monitor.didDrop()
      if (hasDroppedOnChild) {
        console.log('has already dropped on child target')
        return
      }
      //should update the spec
      let parentSpec = props.spec
      let item = monitor.getItem()
      let childSpec = (item && item.spec && { ...item.spec }) || {}
      addChild(parentSpec, childSpec)
    }
  }

  function collect(connect, monitor) {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }
  }

  function DropableElement(props) {
    let { connectDropTarget, isOver, canDrop, ...rest } = props
    return connectDropTarget(
      <div className="dropable-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Elem {...rest} />
      </div>
    )
  }
  return DropTarget(types, dropTarget, collect)(DropableElement)
}
export const Workspace = makeDropable([ItemTypes.Input, ItemTypes.List], WorkspaceEl)