import {useState} from 'react'
import api from '../../../services/api'
import FormGroup from './FormGroup'
import Input from './Input'
import Button from '../../button'

const PasswordTab = ({setLoading}) => {

  const [email,setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try{
      let { data } = await api.post('/forgot', {
        email
      })
      console.table(data)
      setEmailSent(true)
      setMessage(data.message)
    }catch(error){
      console.table(error)
      if (error.response) {
        const { data, status } = error.response
        if(data) setError(data)
      } else {
        setError({message: 'An error has occurred!'})
        console.log('error', error)
      }
    }
    setLoading(false)
  }

  return (
    <>
      {emailSent ?
        <p>
          {message}
          {/* Acceda al correo electrónico registrado para para recuperar tu clave. */}
        </p>
      :
        <div>
          <div className="intro-text" style={{ marginBottom: 15 }}>
            <p>¿Olvidó su clave?</p>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                autoFocus
                id="email_recover"
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                type="email"
                value={email}
              />
              {error && <div className="invalid-feedback">{error.message}</div>}
            </FormGroup>
            <Button block className="enter-btn" size="sm" type="submit">Enviar Recuperación</Button>
          </form>
        </div>
      }
    </>
  )
}

export default PasswordTab
