import { useContext, useEffect } from 'react'
import nookies from 'nookies'
import { toast, ToastContainer } from 'react-toastify'
import Header from './Header'
import Footer from './Footer'
import loadMenus from '~/lib/load-menus'
import AuthModal from './AuthModal/AuthModal'
import CustomError from '~/pages/_error'
import withApi from '../withApi'
import Color from "color";
import { ThemeContext } from "styled-components";

const Layout = ({
  media,
  apiVersion,
  children,
  color: layoutColor = 'black',
  errorCode,
  header,
  menus,
  menusError,
  paddingTop = true,
  footer = '',
  customClass = ''
}, ) => {
  const theme = useContext(ThemeContext)
  const primaryColor
    = Color(theme.colors.primary).hsl().string()

  if (errorCode) {
    return <CustomError statusCode={errorCode} />
  }
  if (header === 'closed') {
    paddingTop = false
  }

  const { flash_message } = nookies.get({}, 'flash_message')

  useEffect(_ => {
    if (flash_message) {
      let messages = JSON.parse(flash_message)
      console.log(messages)

      if (messages.error)
        toast.error(messages.error, { delay: 500, autoClose: 5000 })

      if (messages.success)
        toast.success(messages.success, { delay: 500, autoClose: 4000 })

      if (messages.info)
        toast.info(messages.info, { delay: 500, autoClose: 4000 })

      nookies.destroy({}, 'flash_message', { path: '/' })
    }
  }, [flash_message])

  function renderHeader(media) {
    if (header !== 'hidden') {
      return <Header {...{
        closed: header === 'closed',
        layoutColor,
        menus: menusError ? null : menus,
        media
      }} />
    }
    paddingTop = false
    return null
  }

  function renderFooter() {
    if (footer !== 'hidden') {
      return <Footer apiVersion={apiVersion} layoutColor={layoutColor} />
    }
    return null
  }

  return (
    <div className={customClass}>
      <ToastContainer newestOnTop />

      {renderHeader(media)}

      <main className={!paddingTop ? 'no-padding' : ''}>
        {children}
      </main>

      {renderFooter()}

      <AuthModal />

      <style jsx global>{`

        :root {
          --color: var(--${ layoutColor === 'white' ? 'black' : 'white'});
        }
        body {
          ${ layoutColor === 'white' ? 'background-color: var(--white) !important;' : ''});
        }
        main {
          flex-grow: 1;
          padding-top: var(--padding-top);
        }
        main.no-padding {
          padding-top: 0;
        }
      ` }</style>
    </div>
  );
}

Layout.getInitialProps = async ctx => {
  const { api } = ctx
  try {
    const menus = await loadMenus(ctx)
    const { data } = await api.get('version')
    const { version: apiVersion } = data;
    const media = ctx.query;

    return { apiVersion, menus, media }
  } catch (error) {
    if (error.response) {
      console.log(`The request was made and the server responded with a status code
      that falls out of the range of 2xx`, error.response.status)
      // console.log(error.response.headers)
      // console.log(error.response.data)
    } else if (error.request) {
      console.log('The request was made but no response was received')
      // console.log(error.request)
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    return { errorCode: 503 }
  }
}

export default withApi(Layout)
