// react
import React        from 'react'
import NProgress    from 'nprogress'
import * as Sentry  from '@sentry/node'

// next
import App    from 'next/app'
import Router from 'next/router'

// app
import Layout       from '../components/layout/Layout'
import GlobalStyle  from '~/styles'

// providers
import { AuthModalProvider }  from '../contexts/AuthModalContext'
import { SearchProvider }     from '../contexts/SearchContext'
import { ThemeProvider }      from 'styled-components'
import { UserProvider }       from '../contexts/UserContext'
import * as gtag              from '~/lib/gtag'

// import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '~/theme';
// import withBasicAuth from '~/basic-auth'

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})

Router.events.on('routeChangeComplete', url => {
  NProgress.done()
  window.scrollTo(0, 0)
  gtag.pageview(url)
})

Router.events.on('routeChangeError', _ => NProgress.done())

Sentry.init({ dsn: process.env.SENTRY_DSN })

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

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
            scope.setExtra(key, errorInfo[key])
        })

        Sentry.captureException(error)
    });

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
