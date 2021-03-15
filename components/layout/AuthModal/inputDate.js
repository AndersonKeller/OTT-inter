import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { es } from "flatpickr/dist/l10n/es.js"

const InputDate = ({
  defaultValue,
  id,
  name,
  onChange,
  type = "date",
  value,
  readOnly,
  disabled,
  onKeyDown

}) => {


  let minDate = new Date().getFullYear() - 18;
  const [initialDate, setinitialDate] = useState(`${minDate}-12-31`);

  return <>

    <input
      max={initialDate}
      className={"form-control"}
      {...{
        defaultValue,
        id,
        name,
        onChange,
        type,
        value,
        readOnly,
        disabled,
        onKeyDown
      }}></input>
    <style jsx>{`
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
export default InputDate
