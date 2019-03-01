import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../../constants'
import { Input as InputEl, Icon } from '../../components'
import ListEl from '../../components/list'
import WorkspaceEl, { WrapList } from '../../workspace'
import "./index.scss"
import { addChild } from '../model'

function dropDropable(types) {
  return (Elem, props) => {
    // console.log('dropDropable called')
    let Res = makeDropable(types, Elem)
    return <Res dropable={true} {...props} />
  }
}

function droppedElem(Elem, drop) {
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

export const DroppedInput = droppedElem(InputEl)
export const DroppedList = droppedElem(WrapList(ListEl), dropDropable(ItemTypes.Input))
export const Input = makeDragable("输入框", ItemTypes.Input)
export const List = makeDragable("列表", ItemTypes.Input)
export const Workspace = makeDropable([ItemTypes.Input, ItemTypes.List], WorkspaceEl)