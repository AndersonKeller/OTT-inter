const InvalidFeedback = ({error, loading, name}) => {
  return (
    <div class={"col-12"}>
      { ! loading && error && error.errors && error.errors[name] && (
        <div className="invalid-feedback">{error.errors[name]}</div>
      )}
    </div>
  )
}

export default InvalidFeedback
