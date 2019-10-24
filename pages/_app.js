import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserContext from '../components/UserContext'
import { setAccessToken, removeAccessToken } from '../services/auth'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {

  state = {
    user: null
  }

  componentDidMount = () => {
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      this.setState({
        user
      })
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

  signOut = _ => {

    removeAccessToken()

    localStorage.removeItem('token_type')
    localStorage.removeItem('expires_in')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')

    this.setState({
      user: null
    })

    // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  }

  render() {
    const { Component, pageProps } = this.props

    return <UserContext.Provider value={{ user: this.state.user, signIn: this.signIn, signOut: this.signOut }}>
      <Head>
        {/* <link rel='stylesheet' type='text/css' href='/static/nprogress.css' /> */}
      </Head>
      <Component {...pageProps} />
    </UserContext.Provider>
  }
}

export default MyApp
