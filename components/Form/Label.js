const Label = ({ children, htmlFor, className }) => {
  return (
    <>
      <label {...{htmlFor, className}}>{children}</label>
    </>
  )
}

export default Label
