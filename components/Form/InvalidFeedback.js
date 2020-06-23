const InvalidFeedback = ({error, loading, name}) => {
  return (
    <>
      { ! loading && error && error.errors && error.errors[name] && (
        <div className="invalid-feedback">{error.errors[name]}</div>
      )}
    </>
  )
}

export default InvalidFeedback
