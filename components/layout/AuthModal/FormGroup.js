const FormGroup = ({children}) => {
  return (
    <div className="form-group">
      {children}
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

export default FormGroup
