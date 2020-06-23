const Label = ({ children, htmlFor }) => {
  return (
    <>
      <label {...{htmlFor}}>{children}</label>
    </>
  )
}

export default Label
