import { useContext } from "react";
import { ThemeContext } from "styled-components";

const InputRadio = ({ label, name, onChange, state, value }) => {
  const theme = useContext(ThemeContext)
  const radioColor = theme.colors.background
  return (
    <label>
      <input checked={ state === value } type="radio" { ...{ name, onChange, value } } />
      <span className="fake-input">
        <span className="fake-radio"></span>
        <span>{ label }</span>
      </span>
      <style jsx>{ `
        label {
          display: block;
          margin-bottom: 5px;
          overflow: hidden;
          position: relative;
        }
        input {
          opacity: 0;
          position: absolute;
        }
        .fake-input {
          border: 2px solid var(--primary);
          border-radius: 4px;
          display: block;
          font-size: 1rem;
          line-height: 1.4;
          padding: .375rem .75rem;
          transition: background-color .3s, border-color .3s, color .3s;
        }
        .fake-radio {
          background-color: var(--white);
          border: 1px solid var(--gray2);
          border-radius: 50%;
          display: inline-block;
          height: 15px;
          margin-right: 7.5px;
          padding: 1px;
          vertical-align: -2px;
          width: 15px;
        }
        .fake-radio::before {
          background-color: ${ radioColor };
          border-radius: 50%;
          content: '';
          display: block;
          opacity: 0;
          height: 100%;
          transition: opacity .3s;
          width: 100%;
        }
        input:checked + .fake-input {
          background-color: var(--primary);
          color: white;
        }
        input:checked + .fake-input .fake-radio::before {
          opacity: 1;
        }
        {/* input:focus + .fake-input {
          border-color: var(--white);
        } */}
      ` }</style>
    </label>
  )
}

export default InputRadio
