import { useRef, useEffect } from "react";

const Input = ({
  autoComplete,
  autoFocus,
  id,
  name,
  onChange,
  onFocus,
  placeholder,
  required,
  style,
  type = "text",
  value,
}) => {
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
        ref={inputRef}
        {...{autoComplete, id, name, onChange, onFocus, placeholder, required, style, type, value}}
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
