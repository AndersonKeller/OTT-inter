import Error from 'next/error'

function CustomError({ statusCode }) {
  return (
    <div className="error">
      <Error
        statusCode={statusCode}
        title={statusCode === 404 ? 'No se pudo encontrar esta página' : null}
      />
      <style global jsx>{`
        .error div {
          background: #000 !important;
          color: #fff !important;
        }
        .error div h1 {
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
