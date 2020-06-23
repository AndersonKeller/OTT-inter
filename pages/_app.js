/*
 * Loading example found at:
 * https://github.com/zeit/next.js/blob/canary/examples/with-loading/
 */

import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'shaka-player/dist/controls.css'
import React from 'react'
import NProgress from 'nprogress'
import * as Sentry from '@sentry/node'
import App from 'next/app'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import GlobalStyle from '~/styles'
import { AuthModalProvider } from '../contexts/AuthModalContext'
import { SearchProvider } from '../contexts/SearchContext'
import { ThemeProvider } from 'styled-components'
import { UserProvider } from '../contexts/UserContext'
import * as gtag from '~/lib/gtag'
// import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '~/theme'
// import withBasicAuth from '~/basic-auth'
import "~/styles/components/multiStepIndicator.scss"

NProgress.configure({ showSpinner: false })

let isPoppingState = false

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.TENANT + '_' + (process.env.NODE_ENV || 'testing'),
})

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
    ])

    return { layoutProps, pageProps }
  }

  routeChangeStart(url) {
    console.log(`Loading ${url}...`)
    NProgress.start()
  }

  routeChangeComplete(url) {
    console.log(`Loaded ${url}!`)
    NProgress.done()
    if (isPoppingState) {
      isPoppingState = false
    } else {
      window.scrollTo(0, 0)
    }
    gtag.pageview(url)
  }

  routeChangeError() {
    NProgress.done()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    Router.events.on('routeChangeStart', this.routeChangeStart)
    Router.beforePopState(({ url, as, options }) => {
      isPoppingState = true
      return true
    })
    Router.events.on('routeChangeComplete', this.routeChangeComplete)
    Router.events.on('routeChangeError', this.routeChangeError)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.routeChangeStart)
    Router.events.off('routeChangeComplete', this.routeChangeComplete)
    Router.events.off('routeChangeError', this.routeChangeError)
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })

      Sentry.captureException(error)
    })

    super.componentDidCatch(error, errorInfo)
  }

  render() {
    const { Component, layoutProps, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* <CssBaseline /> */}
        <GlobalStyle />
        <UserProvider>
          <AuthModalProvider>
            <SearchProvider>
              <Component layoutProps={layoutProps} {...pageProps} />
            </SearchProvider>
          </AuthModalProvider>
        </UserProvider>
      </ThemeProvider>
    )
  }
}

/* Enable pwd page protection while in development */
// export default withBasicAuth(MyApp)

export default MyApp
