import React, { useContext, useEffect } from 'react'
import SafeJSONParse from 'json-parse-safe'
import Router from 'next/router'
import nookies from 'nookies'
import UserContext from '../../contexts/UserContext'

const withAuth = WrappedComponent => {

  const WithAuth = props => {
    const { user, updateUser } = useContext(UserContext)
    useEffect( _ => {
      if ( ! user) {
        Router.push('/')
      }
    }, [user])
    return <WrappedComponent updateUser={updateUser} {...props} />
  }

  WithAuth.getInitialProps = async ctx => {
    const { user: userString } = nookies.get(ctx, 'user')
    const user = SafeJSONParse(userString).value
    if ( ! user ) {
      const redirectRoute = `/login?redirectTo=${ctx.pathname}`
      if (ctx.res) {
        ctx.res.redirect(redirectRoute)
        ctx.res.end()
      } else {
        Router.replace(redirectRoute)
      }
      return { }
    }
    if (WrappedComponent.getInitialProps) {
      ctx.user = user
      const componentProps = await WrappedComponent.getInitialProps(ctx)
      return { user, ...componentProps }
    } else {
      return { user }
    }
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth
