import Error from 'next/error'
import { STATIC_PATH } from '../constants/constants'
import * as Sentry from '@sentry/node'
import Color from 'color'
import { useContext } from 'react'
import { ThemeContext } from 'styled-components'

function CustomError({ statusCode }) {
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background).hsl().string()
  const title = statusCode === 503 ? 'Servidor no disponible' : null
  return (
    <div className="error">
      <Error
        statusCode={statusCode}
        title={title}
      />
      <style global jsx>{`
        .error > div {
          background: ${backgroundColor} !important;
          color: #fff !important;
        }
        .error > div > div::after {
          content: url(${STATIC_PATH}/logos/app.svg);
          display: block;
          height: auto;
          margin-right: auto;
          margin-top: 15px;
          margin-left: auto;
          max-width: 100%;
          width: 150px;
        }
        .error > div h1 {
          border-right-color: rgba(255, 255, 255, .3) !important;
        }
      `}</style>
    </div>
  )
}

CustomError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await Error.getInitialProps({ res, err })

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    Sentry.captureException(err)

    return errorInitialProps
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  )

  return errorInitialProps
}

export default CustomError
