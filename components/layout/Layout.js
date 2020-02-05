import { useEffect } from 'react'
import nookies from 'nookies'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { IS_PRODUCTION } from '~/constants/constants'
import Header from './Header'
import Footer from './Footer'
import loadMenus from '~/lib/load-menus'
import AuthModal from './AuthModal/AuthModal'
import CustomError from '~/pages/_error'

// layout
const Layout = ({
  children,
  color: layoutColor = 'black',
  errorCode,
  header,
  menus,
  menusError,
  paddingTop = true,
}) => {

  if (errorCode) {
    return <CustomError statusCode={errorCode} />
  }

  if (header === 'closed') {
    paddingTop = false
  }

  /* external imports fallback */
  if ( ! IS_PRODUCTION) {
    import('bootstrap/dist/css/bootstrap.min.css')
    import('slick-carousel/slick/slick.css')
  }

  const { flash_message } = nookies.get({}, 'flash_message')

  useEffect(_ => {
    if (flash_message) {
      let messages = JSON.parse(flash_message)
      console.log(messages)

      if(messages.error)
        toast.error(messages.error, {delay: 500, autoClose: 5000})

      if(messages.success)
        toast.success(messages.success, {delay: 500, autoClose: 4000})

      if(messages.info)
        toast.info(messages.info, {delay: 500, autoClose: 4000})

      nookies.destroy({}, 'flash_message', { path: '/' })
    }
  }, [flash_message])

  return (
    <>
      <ToastContainer newestOnTop />

      <Header {...{
        closed: header === 'closed',
        layoutColor,
        menus: menusError ? null : menus,
      }} />

      <main className={ ! paddingTop ? 'no-padding' : ''}>
        {children}
      </main>

      <Footer {...{layoutColor}}/>

      <AuthModal />

      <style jsx global>{`
        :root {
          /* colors by job */
          --background: var(--${layoutColor === 'white' ? 'white' : 'black'});
          --color: var(--${layoutColor === 'white' ? 'black' : 'white'});
        }
        main {
          flex-grow: 1;
          padding-top: var(--padding-top);
        }
        main.no-padding {
          padding-top: 0;
        }
      `}</style>
    </>
  );
}

Layout.getInitialProps = async ctx => {
  try {
    const menus = await loadMenus(ctx)
    return { menus }
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

export default Layout
