// next imports
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

// react imports
import { useState } from 'react'
import { Form } from 'react-bootstrap'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import api from '../../services/api'
import Button from '../../components/button'

const ResetPassword = ({layoutProps}) => {

  const [notice, setNotice] = useState(false)
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const apiurl = decodeURI(router.query.apiurl)
  const resetURL = new URL(apiurl)
  const [ email, setEmail ] = useState(resetURL.searchParams.get('email'))
  const [ token, setToken ] = useState(resetURL.searchParams.get('token'))

  const success = res => {
    setError(false)
    setNotice(res.data)
    setTimeout(() => Router.push('/login'), 3000)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/reset',{
        token: token,
        password: password,
        password_confirmation: passwordConfirmation,
        email: email
      })

      console.table(response)
      success(response)
      setLoading(false)
    } catch (error) {
      if(error.response)
        setError(error.response.data)

      console.table(error)
      setLoading(false)
    }
  }

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Restabelecer la contraseña &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="h4">Restabelecer la contraseña</h1>
            <form method="post" onSubmit={handleSubmit}>

                {/* <Toast
                  show={successMsg}
                  onClose={toggleSuccessMsg}
                  style={{position: 'absolute', top: '50%', right: '50%', backgroundColor: 'light-green' }}
                >
                  <Toast.Header></Toast.Header>
                  <Toast.Body>
                    {notice.message}
                  </Toast.Body>
                </Toast> */}

              <Form.Group>
                {notice && <div className="valid-feedback">{notice.message}</div>}
                {error && <div className="invalid-feedback">{error.message}</div>}
                <Form.Control id="email" type="email" placeholder="Correo electronico"  onChange={e => setEmail(e.target.value)} value={email} />
                {error && error.errors &&  (<div className="invalid-feedback">{error.errors.email}</div>)}
              </Form.Group>
              <Form.Group>
                <Form.Control id="password_reset" type="password" placeholder="Nueva contraseña"  onChange={e => setPassword(e.target.value)} value={password} />
                {error && error.errors &&  (<div className="invalid-feedback">{error.errors.password[0]}</div>)}
              </Form.Group>
              <Form.Group>
                <Form.Control id="password_confirmation" type="password" placeholder="Confirmar nueva contraseña"  onChange={e => setPasswordConfirmation(e.target.value)} value={passwordConfirmation} />
                {error && error.errors &&  (<div className="invalid-feedback">{error.errors.password[1]}</div>)}
              </Form.Group>
              {/* <Form.Group style={{textAlign: 'center'}}>
                <Button variant='danger' style={{backgroundColor:'#ff0000'}} size="lg" type="submit" disabled={isLoading}>{isLoading ? 'Loading…' : 'Restabelecer'}</Button>
              </Form.Group> */}
              <Form.Group style={{textAlign: '-webkit-center'}}>
                <Button block style={{minWidth: '145px', maxWidth: '50%', boxShadow: 'none'}} className="enter-btn" size="sm" type="submit" disabled={isLoading}>{isLoading ? 'Loading…' : 'Restabelecer'}</Button>
              </Form.Group>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        header {
          padding-top: 15px;
        }
        .h2 {
          margin-bottom: 30px;
        }
        @media (min-width: 768px) {
          header {
            padding-top: 30px;
          }
        }
        .row {
          padding: 0 25%;
        }
      `}</style>
    </Layout>
  );
}

export default ResetPassword
