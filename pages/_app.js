import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserContext from '../components/UserContext'
import { setAccessToken, removeAccessToken } from '../services/auth'
import Layout from '../components/layout/Layout'
import api from '../services/api'
import { AuthModalProvider } from '../contexts/AuthModalContext'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {

  state = {
    user: null,
  }

  static async getInitialProps({ Component, router, ctx }) {
    let layoutPropsTasks = { }, pagePropsTasks = { }
    if (Layout.getInitialProps) {
      layoutPropsTasks = Layout.getInitialProps(ctx)
    }
    if (Component.getInitialProps) {
      pagePropsTasks = Component.getInitialProps(ctx)
    }
    const [ layoutProps, pageProps ] = await Promise.all([
      layoutPropsTasks,
      pagePropsTasks,
    ]);
    return { layoutProps, pageProps }
  }

  componentDidMount = async x_ => {
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      this.setState(prev => ({
        ...prev,
        user,
      }))
    } else {
      // Router.push('/')
    }
  }

  signIn = (user, tokenResponse) => {

    const { token_type, expires_in, access_token, refresh_token } = tokenResponse

    setAccessToken(access_token)

    localStorage.setItem('token_type', token_type)
    localStorage.setItem('expires_in', expires_in)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('user', JSON.stringify(user))

    this.setState(
      {
        user: user
      },
      /* _ => {
        Router.push('/', '#logged')
      } */
    )
  }

  signOut = async _ => {

    api.post('logout').then((response) => {
      console.log('Logout successfully', response)
      removeAccessToken()
      localStorage.removeItem('token_type')
      localStorage.removeItem('expires_in')
      localStorage.removeItem('refresh_token')

    }).catch((error) => {
      console.log("Couldn't logout", error)
    })

    localStorage.removeItem('user')
    this.setState({
      user: null
    })

    // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  }

  render() {
    const { Component, layoutProps, pageProps } = this.props
    return <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut }}>
      <AuthModalProvider>
        <Component layoutProps={layoutProps} {...pageProps} />
      </AuthModalProvider>
    </UserContext.Provider>
  }
}

export default MyApp
