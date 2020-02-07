import React, { useState } from 'react'
import nookies from 'nookies'
import Head from 'next/head'

const withBasicAuth = WrappedComponent => {

  const WithBasicAuth = ({ basicAuthUser: basicAuthUserFromSSR, ...pageProps }) => {
    const [ password, setPassword ] = useState()
    const { basicAuthUser } = nookies.get({ }, 'basicAuthUser')
    const [ user, setUser ] = useState(basicAuthUserFromSSR || basicAuthUser)
    const [ error, setError ] = useState()
    const handleSubmit = e => {
      e.preventDefault()
      if (password === 'Rivermas2020Somosgad_') {
        setUser(password)
        nookies.set({ }, 'basicAuthUser', password, {
          maxAge: 60 * 60,
          sameSite: 'Strict',
          path: '/'
        })
      } else {
        setError('Contraseña incorrecta')
      }
    }
    return ! user ? (
      <>
        <Head>
          <title>Protegido</title>
        </Head>
        <form method="post" onSubmit={e => handleSubmit(e)}>
          <label for="password">Contraseña</label>
          <input id="password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
          <button type="submit">Entrar</button>
          {error && <div className="error">{error}</div>}
        </form>
        <style jsx>{`
          :global(html) {
            height: 100%;
          }
          :global(body) {
            height: 100%;
          }
          :global(#__next) {
            height: 100%;
          }
          form {
            background: #000;
            color: #fff;
            align-items: center;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            min-height: 100%;
            text-align: center;
          }
          input {
            margin-bottom: 15px;
          }
          button {
            margin-bottom: 10px;
          }
          .error {
            color: red;
          }
        `}</style>
      </>
    ) : <WrappedComponent {...pageProps} />
  }

  WithBasicAuth.getInitialProps = async ctx => {
    const { basicAuthUser } = nookies.get(ctx, 'basicAuthUser')
    const pageProps = WrappedComponent.getInitialProps ?
      await WrappedComponent.getInitialProps(ctx) : null
    return { basicAuthUser, ...pageProps }
  }

  WithBasicAuth.displayName = `WithBasicAuth(${getDisplayName(WrappedComponent)})`;

  return WithBasicAuth
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withBasicAuth
