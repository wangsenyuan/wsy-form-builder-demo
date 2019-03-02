import React from 'react'
import { Form, Button, Input } from 'antd'

class InputEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      config: { ...props.spec.config }
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.spec || prevProps.spec.key !== this.props.spec.key) {
      let config = { ...this.props.spec.config }
      this.setState({ config })
    }
  }

  onChange = (key, evt) => {
    evt.preventDefault()
    let { config } = this.state
    config[key] = evt.target.value
    this.setState({ config })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    let { spec } = this.props
    let { config } = this.state
    this.props.editSpec({ config, key: spec.key })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="list-spec-edit-form">
          <Form.Item label="显示名" >
            <Input value={this.state.config.label} placeholder="显示名" onChange={evt => this.onChange("label", evt)} />
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

export default function Fn(props, editSpec) {
  return <InputEditor {...props} editSpec={editSpec} />
}