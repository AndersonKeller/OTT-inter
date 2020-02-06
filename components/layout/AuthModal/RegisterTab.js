import Router from 'next/router'
import {useState, useContext} from 'react'
import UserContext from '../../../contexts/UserContext'
import { CLIENT_ID, CLIENT_SECRET } from '../../../constants/constants'
import { setAccessToken } from '../../../services/auth'
import api from '../../../services/api'
import { AuthModalContext } from '../../../contexts/AuthModalContext'
import FormGroup from './FormGroup'
import Input from './Input'
import Button from '../../button'
import { CONFIG } from '../../../config'
import ReactSVG from 'react-svg'

const RegisterTab = ({ changeTab, setLoading, facebookLogin })  => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useContext(UserContext)
  const { closeAuthModal, packageId } = useContext(AuthModalContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    document.activeElement.blur()
    try {
      const tokenResponse = await api().post('register', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        email,
        name,
        package_id_intention: packageId,
        password,
      })
      const { access_token, } = tokenResponse.data
      setAccessToken(access_token)
      const userResponse = await api().get('user')
      signIn(userResponse.data, tokenResponse.data)
      closeAuthModal()
      Router.push('/register/complete')
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError('An error has occurred!')
        console.log('error', error)
      }
    }
    setLoading(false)
  }

  function goToLogin(e) {
    e.preventDefault()
    changeTab('login')
  }

  return (
    <>
      <div className="intro-text">
        <p>Una sola cuenta para todos los productos <span className="text-uppercase">{CONFIG.clubName}</span></p>
      </div>
      <form method="post" onSubmit={handleSubmit}>

        {error && <div className="invalid-feedback">{error.message}</div>}

        <FormGroup>
          <Input
            id="name"
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            required
            value={name}
          />
          {error && error.errors && (<div className="invalid-feedback">{error.errors.name}</div>)}
        </FormGroup>

        <FormGroup>
          <Input
            id="reg_email"
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            type="email"
            value={email}
          />
          {error && error.errors && (<div className="invalid-feedback">{error.errors.email}</div>)}
        </FormGroup>

        <FormGroup>
          <Input
            id="reg_password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Clave"
            required
            type="password"
            value={password}
          />
          {error && error.errors &&  (
            <div className="invalid-feedback">{error.errors.password}</div>
          )}
        </FormGroup>

        {/* <FormGroup>
          <Label hmtlFor="password_confirmation">Confirmación de Clave</Label>
          <Input id="password_confirmation" type="password" />
        </FormGroup> */}

        <Button block className="enter-btn" size="sm" type="submit">Registrar</Button>
        <div className="already-subscriptor">
          <span>¿Ya eres suscriptor?</span>
          &nbsp;
          <a className="bold text-uppercase" href="#" onClick={goToLogin}>Ház Login</a>
        </div>
        <div className="or-enter-with">o entrá con</div>
        <Button className="social facebook" type="button" onClick={facebookLogin}>
          <ReactSVG className="icon" src="/static/icons/facebook.svg" />
          Facebook
        </Button>
        {/*<Button className="social google" onClick={toggleAuth} type="button">
          <ReactSVG className="icon" src="/static/icons/google.svg" />
          Google
        </Button> */}
      </form>

      {/* <style jsx>{`
        .label-radio {
          padding-right: 5px;
        }
      `}</style> */}
    </>
  )
}

export default RegisterTab
