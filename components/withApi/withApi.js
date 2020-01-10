import React, { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import api from '../../services/api'

const withApi = WrappedComponent => {

  const WithApi = props => {
    const { signOut } = useContext(UserContext)
    const clientApi = api(null, signOut)
    return <WrappedComponent api={clientApi} {...props} />
  }

  if (WrappedComponent.getInitialProps) {
    WithApi.getInitialProps = async ctx => {
      const serverApi = api(ctx)
      ctx.api = serverApi
      const componentProps = await WrappedComponent.getInitialProps(ctx)
      return { ...componentProps }
    }
  }

  WithApi.displayName = `WithApi(${getDisplayName(WrappedComponent)})`;

  return WithApi
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withApi
