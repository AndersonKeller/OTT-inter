import Button from '../../button'
import ReactSVG from 'react-svg'

const SocialButtons = ({ socialLogin }) => {
  return (
    <div className="social-btns">
      <Button className="social facebook" type="button" onClick={socialLogin}>
        <ReactSVG className="icon" src="/static/icons/facebook.svg" />
        Facebook
      </Button>
      <Button className="social google" type="button" onClick={socialLogin}>
        <ReactSVG className="icon" src="/static/icons/google.svg" />
        Google
      </Button>
      <style jsx>{`
        .social-btns {
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </div>
  )
}

export default SocialButtons
