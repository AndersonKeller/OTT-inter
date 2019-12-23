import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { UserProvider } from '../contexts/UserContext'
import Layout from '../components/layout/Layout'
import { AuthModalProvider } from '../contexts/AuthModalContext'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {

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

  render() {
    const { Component, layoutProps, pageProps } = this.props
    return <UserProvider>
      <AuthModalProvider>
        <Component layoutProps={layoutProps} {...pageProps} />
      </AuthModalProvider>
    </UserProvider>
  }
}

export default MyApp
