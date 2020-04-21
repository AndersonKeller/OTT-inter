import SafeJSONParse from 'json-parse-safe'
import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import UserContext from '~/contexts/UserContext'
import withApi from '~/components/withApi'

const withAuth = (WrappedComponent, update = false) => {

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
    const { api } = ctx
    let user
    if (update) {
      try {

        // get updated user
        const { data } = await api.get('user')
        user = data

        // set user to cookies
        nookies.set(ctx, 'user', JSON.stringify(user), { path: '/' })

      } catch(error) { }
    } else {
      const { user: userString } = nookies.get(ctx, 'user')
      user = SafeJSONParse(userString).value
    }
    if ( ! user ) {
      const { pathname, res } = ctx
      const redirectRoute = `/login?redirectTo=${pathname}`
      console.log('redirectroute', redirectRoute)
      if (res) {
        res.redirect(redirectRoute)
        res.end()
      } else {
        Router.replace(redirectRoute)
      }
      return { }
    }
    if (WrappedComponent.getInitialProps) {

      // append user to the context
      ctx.user = user

      const componentProps = await WrappedComponent.getInitialProps(ctx)
      return { user, ...componentProps }
    } else {
      return { user }
    }
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  // wrap this hoc on withApi hoc
  return withApi(WithAuth)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth
