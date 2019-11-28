const Label = ({ children, htmlFor }) => {
  return (
    <>
      <label htmlFor={htmlFor}>{children}</label>
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

export default Label
