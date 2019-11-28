import { useContext, useState } from 'react'
import UserContext from '../../UserContext'
import api, { baseURL } from '../../../services/api'
import { CLIENT_ID, CLIENT_SECRET } from '../../../constants/constants'
import { setAccessToken } from '../../../services/auth'
import { CONFIG } from '../../../config'
import FormGroup from './FormGroup'
import Input from './Input'
import FormText from './FormText'
import Button from '../../button'
import { AuthModalContext } from '../../../contexts/AuthModalContext'

const LoginTab = ({ changeTab, setLoading }) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')
  const { signIn } = useContext(UserContext)
  const { closeAuthModal } = useContext(AuthModalContext)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    document.activeElement.blur()
    try {
      const tokenResponse = await api.post(`${baseURL}/oauth/token`, {
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: email,
        password,
        scope: '',
      })
      const { access_token, } = tokenResponse.data
      setAccessToken(access_token)
      const userResponse = await api.get('/user')
      signIn(userResponse.data, tokenResponse.data)
      closeAuthModal()
    } catch (error) {
      console.table(error.response.status)
      if (error.response) {
        const { data, status } = error.response
        data.message =
          status == 400 ? 'Correo electrónico o contraseña incorrectos. Inténtalo de nuevo' :
          status == 403 ? 'Tu dirección de correo electrónico no está verificada' : data.message
        setError(data.message)
        // const { message } = error.response.data
        // setError(message)
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
    changeTab('register')
  }

  return (
    <div>
      <div className="intro-text">
        <p>Una sola cuenta para todos los productos <span className="text-uppercase">{CONFIG.clubName}</span></p>
      </div>
      <form method="post"onSubmit={handleSubmit}>
      {error && <div className="invalid-feedback">{error}</div>}
        <FormGroup>
          {/* <Label hmtlFor="email">E-mail</Label> */}
          <Input id="email" autoComplete="username" placeholder="E-mail" onChange={e => setEmail(e.target.value)} required type="email" value={email} />
        </FormGroup>
        <FormGroup>
          {/* <Label hmtlFor="clave">Clave</Label> */}
          <Input id="clave" autoComplete="current-password" placeholder="Clave" onChange={e => setPassword(e.target.value)} required type="password" value={password} />
          <FormText>
            <a href="#" onClick={goToPasswordRecovery}>¿Olvidó su clave?</a>
          </FormText>
        </FormGroup>
        <Button block className="enter-btn" size="sm" type="submit">Entrar</Button>
        <div className="already-subscriptor">
          <span>¿No es suscriptor?</span>
          &nbsp;
          <a className="bold text-uppercase" href="#" onClick={goToRegister}>Regístrate!</a>
        </div>
        {/* <div className="or-enter-with">o entre con</div>
        <Button className="social facebook" onClick={toggleAuth} type="button">
          <ReactSVG className="icon" src="/static/icons/facebook.svg" />
          Facebook
        </Button>
        <Button className="social google" onClick={toggleAuth} type="button">
          <ReactSVG className="icon" src="/static/icons/google.svg" />
          Google
        </Button> */}
      </form>
    </div>
  )
}

export default LoginTab
