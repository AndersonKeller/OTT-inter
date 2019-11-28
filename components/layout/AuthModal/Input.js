import { useRef, useEffect } from "react";

const Input = ({ autoFocus, id, onChange, required, type, value, placeholder, autoComplete }) => {
  // autofocus is bugging if has states/onChanges
  const inputRef = useRef()
  useEffect(_ => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  })
  return (
    <>
      <input
        autoFocus={autoFocus && "true"}
        className="form-control"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        ref={inputRef}
        required={required}
        type={type}
        value={value}
        autoComplete={autoComplete}
      />
      <style jsx>{`
        .form-control {
          border-color: rgba(var(--gray2-rgb), .55);
          border-width: 2px;
          color: inherit;
        }
      `}</style>
    </>
  )
}

export default Input
