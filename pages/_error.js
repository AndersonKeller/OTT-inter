import Error from 'next/error'
import { STATIC_PATH } from '../constants/constants'

function CustomError({ statusCode }) {
  return (
    <div className="error">
      <Error
        statusCode={statusCode}
        title={ statusCode === 404 ? 'No se pudo encontrar esta página' :
          statusCode === 503 ? 'Servidor no disponible' :
          null }
      />
      <style global jsx>{`
        .error > div {
          background: #000 !important;
          color: #fff !important;
        }
        .error > div > div::after {
          content: url(${STATIC_PATH}/logos/app.svg);
          display: block;
          height: auto;
          margin-right: auto;
          margin-top: 15px;
          margin-left: auto;
          max-width: 100%;
          width: 150px;
        }
        .error > div h1 {
          border-right-color: rgba(255, 255, 255, .3) !important;
        }
      `}</style>
    </div>
  )
}

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default CustomError
