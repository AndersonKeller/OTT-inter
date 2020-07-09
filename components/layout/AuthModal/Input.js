import { useEffect, useRef } from "react";

const Input = ({
                 autoComplete,
                 autoFocus,
                 defaultValue,
                 id,
                 maxLength,
                 name,
                 onChange,
                 onFocus,
                 placeholder,
                 required,
                 style,
                 type = "text",
                 value,
                 readOnly,
                 disabled,

                 onKeyDown
               }) => {

  // autofocus is bugging if has states/onChanges
  const inputRef = useRef()
  useEffect(_ => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  })

  return <>
    <input
      autoFocus={ autoFocus }
      className="form-control"
      ref={ inputRef }
      { ...{
        autoComplete,
        defaultValue,
        id,
        maxLength,
        name,
        onChange,
        onFocus,
        placeholder,
        required,
        style,
        type,
        value,
        readOnly,
        disabled,
        onKeyDown,
      } }
    />
    <style jsx>{ `
      .form-control {
        border-color: rgba(var(--gray2-rgb), .55);
        border-width: 2px;
        color: var(--black);
      }
      .form-control[disabled] {
        background-color: var(--gray);
      }
    ` }</style>
  </>
}

export default Input
