import Button from '../../button'
import ReactSVG from 'react-svg'

const SocialButtons = ({ socialLogin }) => {
  return (
    <div className="social-btns">
      <Button className="social facebook" type="button" onClick={socialLogin}>
        <ReactSVG className="icon" src="/static/icons/facebook-icon.svg" />
        Facebook
      </Button>
      <Button className="social google" type="button" onClick={socialLogin}>
        <ReactSVG className="icon" src="/static/icons/google-icon.svg " />
        Google
      </Button>
      <style jsx global>{`
        .social-btns {
          display: flex;
          justify-content: space-around;
        }
        .btn.social {
          background-color: #FFF !important;
          color: #666 !important;
          font-weight: normal !important;
          display: flex; 
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          font-size: 0.8em;
          box-shadow: 0 0 3px #909090;
          border-radius: 0;
          padding: 10px 45px;
        }
        
        .btn > .icon {
          margin-right: 0.2em;
        }
        
        .btn.social:hover {
          background-color: #FFF !important;
        }
        .btn.social:active, .btn.social:visited, .btn.social:focus {
        background-color: #d4d4d4 !important;
        border: none !important;
        box-shadow: none;
        }
      `}</style>
    </div>
  )
}

export default SocialButtons
