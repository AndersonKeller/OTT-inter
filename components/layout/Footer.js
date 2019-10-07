import Link from 'next/link'
import { APP_NAME } from '../../constants/constants'

export default _ => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className="row">
              <div className="col-12 col-md-9 text-md-left">
                <p>{APP_NAME} @ 2019 <a href="//www.somosgad.com/" target="_blank">GAD_</a> - Todos los direichos reservados - <Link href="/politica-de-privacidad"><a>Política de Privacidad</a></Link></p>
              </div>
              <div className="col-12 col-md-3 text-md-right">
                <p><Link href="/terminos-y-politicas"><a>Términos y políticas</a></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          font-size: 13px;
          padding-top: 20px;
          padding-bottom: 20px;
          text-align: center;
        }
        .footer a {
          color: inherit;
          display: inline-block;
          text-decoration: none;
        }
        .footer a::after {
          border-bottom: 1px solid var(--white);
          content: '';
          display: block;
          opacity: 0;
          transition: opacity .2s, transform .2s;
          transform: translateY(-2px);
        }
        .footer a:focus::after,
        .footer a:hover::after {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .footer {
            padding-right: 5px;
            padding-left: 5px;
          }
          .footer p {
            margin-bottom: 0;
          }
        }
      `}</style>
    </footer>
  )
}
