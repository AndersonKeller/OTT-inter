import { useContext, useState, useEffect } from 'react'
import UserContext from '../../../contexts/UserContext'
import api, { baseURL } from '../../../services/api'
import { CLIENT_ID, CLIENT_SECRET } from '../../../constants/constants'
import { setAccessToken } from '../../../services/auth'
import FormGroup from './FormGroup'
import Input from './Input'
import FormText from './FormText'
import Button from '../../button'
import { AuthModalContext } from '../../../contexts/AuthModalContext'
import nookies from 'nookies'
import SocialButtons from './SocialButtons'
import { CONFIG } from '~/config'
import OrEnterWith from './OrEnterWith'
import { useRouter } from "next/router";
// import Router from "next/router";

const LoginTab = ({ changeTab, setLoading, socialLogin }) => {
  const router = useRouter()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const { signIn } = useContext(UserContext)
  const { closeAuthModal, code, socialProvider } = useContext(AuthModalContext)

  const providerLogin = async _ => {
    try{
        setLoading(true);
        const { pkg_int_id: package_id_intention } = nookies.get({}, 'pkg_int_id')
        const tokenResponse = await api().post(`auth/${socialProvider}/callback`, {
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          package_id_intention
        })

        const { access_token } = tokenResponse.data
        setAccessToken(access_token)
        const userResponse = await api().get('/user')
        setLoading(false)
        signIn(userResponse.data, tokenResponse.data)
        closeAuthModal()
    } catch(error){
      console.table(error);
      setError('An error has occurred!')
      setLoading(false)
    }
  }

  useEffect(() => { if(code && socialProvider) providerLogin() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    document.activeElement.blur()
    try {
      const tokenResponse = await api().post(`${baseURL}/oauth/token`, {
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: email,
        password,
        scope: '',
      })
      const { access_token, } = tokenResponse.data
      setAccessToken(access_token)
      const userResponse = await api().get('/user')
      signIn(userResponse.data, tokenResponse.data)
      closeAuthModal()
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response
        const message =
          status === 400 ? 'Correo electrónico o contraseña incorrectos. Inténtalo de nuevo' :
          status === 403 ? 'Tu dirección de correo electrónico no está verificada' :
          status === 500 ? 'Servidor, base de datos o conexión no disponible' : data.message
        setError(message)
      } else {
        setError('An error has occurred!')
        console.log('error', error)
      }
    }
    setLoading(false)
  }

  function goToPasswordRecovery(e) {
    e.preventDefault()
    changeTab('password')
  }

  function goToRegister(e) {
    e.preventDefault()
    router.push({
      pathname: '/signup',
    }, '/signup')
  }

  const notRegistered = CONFIG.lang === 'es-CL' ? '¿No estás suscrito?' : '¿No es suscriptor?'

  return (
    <div>
      <div className="intro-text">
        <p>¡Bienvenidos!</p>
      </div>
      <form method="post"onSubmit={handleSubmit}>
      {error && <div className="invalid-feedback">{error}</div>}
        <FormGroup>
          <Input id="email" autoComplete="username" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required type="email" value={email} />
        </FormGroup>
        <FormGroup>
          <Input id="clave" autoComplete="current-password" placeholder="Clave" onChange={e => setPassword(e.target.value)} required type="password" value={password} />
          <FormText>
            <a href="#" onClick={goToPasswordRecovery}>¿Olvidaste tu clave?</a>
          </FormText>
        </FormGroup>
        <Button block className="enter-btn" size="sm" type="submit">Entrar</Button>
        <div className="already-subscriptor">
          <span>{notRegistered}</span>
          {' '}
          <a className="bold text-uppercase" href="/signup">Regístrate!</a>
        </div>

        <OrEnterWith />

        <SocialButtons socialLogin={socialLogin} />

      </form>
    </div>
  )
}

export default LoginTab
