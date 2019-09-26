import Modal from 'react-bootstrap/Modal'
import Button from '../button'

const FormGroup = (props) => {
  return (
    <div className="form-group">
      {props.children}
      <style jsx>{`
        .form-group {
          font-size: 16px;
          line-height: 1;
          text-align: left;
        }
      `}</style>
    </div>
  )
}

const Label = (props) => {
  return (
    <>
      <label for={props.for}>{props.children}</label>
      <style jsx>{`
        label {
          cursor: pointer;
          margin-bottom: 5px;
          margin-left: 30px;
        }
      `}</style>
    </>
  )
}

const Input = (props) => {
  return (
    <>
      <input className="form-control" id={props.id} type={props.type} />
      <style jsx>{`
        .form-control {
          border-color: rgba(var(--gray2-rgb), .55);
          border-width: 2px;
          color: inherit;
        }
      `}</style>
    </>
  )
}

const FormText = (props) => {
  return (
    <div className="form-text text-center">
      {props.children}
      <style jsx>{`
        .form-text {
          font-size: 14px;
        }
        .form-text :global(a) {
          color: inherit;
        }
      `}</style>
    </div>
  )
}

export default (props) => {
  const show = true || props.show
  return (
    <Modal show={show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>
          <button className="close" type="button">
            <img alt="Cerrar" height="23" src="/static/icons/close.svg" width="23" />
          </button>
          <img alt="Dale Campeón" height="64" src="/static/logo.svg" width="131" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="intro-text">
          <p>Una sola cuenta para todos los productos RIVER PLATE</p>
        </div>
        <form method="post">
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input id="email" type="email" />
            <FormText>
              <a href="#">¿Olvidó su nombre de usuario?</a>
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="clave">Clave</Label>
            <Input id="clave" type="password" />
            <FormText>
              <a href="#">¿Olvidó su clave?</a>
            </FormText>
          </FormGroup>
          <Button block className="enter-btn" onClick={props.toogleAuth} size="sm">Entrar</Button>
          <div className="already-subscriptor">¿Ya es suscriptor? <a className="bold text-uppercase" href="#" onClick={props.toogleAuth}>Haga Login</a></div>
          <div className="or-enter-with">o entre con</div>
          <Button onClick={props.toogleAuth}>Facebook</Button>
          <Button onClick={props.toogleAuth}>Google</Button>
        </form>
      </Modal.Body>
      <style jsx>{`
        :global(.modal-backdrop.show) {
          opacity: .68;
        }
        :global(.modal) {
          align-items: center;
          color: var(--gray4);
          padding-top: .5rem;
          padding-bottom: .5rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          :global(.modal) {
            padding-top: 1.75rem;
            padding-bottom: 1.75rem;
          }
        }
        :global(.modal-open) :global(.modal) {
          display: flex !important;
        }
        :global(.modal-dialog) {
          box-shadow: 0 2px 6px var(--black);
          margin-top: auto;
          margin-bottom: auto;
          max-width: 325px;
        }
        :global(.modal-content) {
          border: 0;
          border-radius: 0;
        }
        :global(.modal-header) {
          background-color: var(--dark-gray3);
          border-radius: 0;
          justify-content: center;
          padding: 10px;
          position: relative;
        }
        :global(.modal-header) .close {
          margin: 0;
          outline: 0;
          padding: 15px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        :global(.modal-header) .close img {
          display: block;
        }
        :global(.modal-body) {
          padding: 15px 25px 20px;
        }
        .intro-text {
          font-size: 18px;
          line-height: 1.2;
          margin-bottom: 5px;
          padding: 0 15%;
        }
        .intro-text *:last-child {
          margin-bottom: 0;
        }
        :global(.enter-btn) {
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .already-subscriptor {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .already-subscriptor a {
          color: inherit;
        }
        .or-enter-with {
          align-items: center;
          display: flex;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .or-enter-with::before,
        .or-enter-with::after {
          border-top: 2px solid rgba(var(--gray2-rgb), .55);
          content: '';
          display: block;
          margin-right: -5px;
          margin-left: -5px;
          flex-grow: 1;
        }
        .or-enter-with::before {
          margin-right: 15px;
        }
        .or-enter-with::after {
          margin-left: 15px;
        }
      `}</style>
    </Modal>
  )
}
