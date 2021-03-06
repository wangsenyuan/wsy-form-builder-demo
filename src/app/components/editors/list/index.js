import React from 'react'
import { Form, Select, Button } from 'antd'

class ListEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      config: {
        flexDirection: props.spec.config.flexDirection
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spec === null || prevProps.spec.key !== this.props.spec.key) {
      let config = {
        flexDirection: this.props.spec.config.flexDirection
      }
      console.log('update ListEditor(' + JSON.stringify(config) + ')')

      this.setState({ config })
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    let { spec } = this.props
    let { config } = this.state
    this.props.editSpec({ config, key: spec.key })
  }

  handleChange = value => {
    let { config } = this.state
    config.flexDirection = value
    this.setState({ config })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="list-spec-edit-form">
          <Form.Item>
            <Select value={this.state.config.flexDirection} onChange={this.handleChange}>
              <Select.Option value="vertical">垂直</Select.Option>
              <Select.Option value="horizontal">水平</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="form-button">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default function ListEditorFn(props, editSpec) {
  // console.log('ListEditor(' + JSON.stringify(props) + ')')
  return <ListEditor {...props} editSpec={editSpec} />
}

