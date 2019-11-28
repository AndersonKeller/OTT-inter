const FormText = ({children}) => {
  return (
    <div className="form-text text-center">
      {children}
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

export default FormText
