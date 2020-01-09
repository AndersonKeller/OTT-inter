import React from 'react'
import api from '../../services/api'

const withApi = WrappedComponent => {

  return class extends React.Component {

    constructor(props) {
      super(props)
    }

    static async getInitialProps(ctx) {
      let componentProps = { }
      if (WrappedComponent.getInitialProps) {
        ctx.api = api
        componentProps = await WrappedComponent.getInitialProps(ctx)
      }
      return { ...componentProps }
    }

    render() {
      return <WrappedComponent api={api} {...this.props} />
    }
  }
}

export default withApi
