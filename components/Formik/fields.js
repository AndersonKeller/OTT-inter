import { useField } from 'formik'

import Select from '../Select/Select'
import Label from '../layout/AuthModal/Label'
import Input from '../layout/AuthModal/Input'
import InputDate from '../layout/AuthModal/inputDate'



// create formik input field
export const FkInput = ({ style, label, ...props }) => {
  const [field, meta] = useField(props)
  field.value = field.value || ''

  return (
    <>
      {props.type == 'hidden' ? '' : <Label htmlFor={props.id || props.name}>{label}</Label>}
      <Input style={{ color: 'black', ...style }}  {...field} {...props} />
      {meta.touched && meta.error ? (<div className="invalid-feedback">{meta.error}</div>) : null}
    </>
  )
}

// create formik select field
export const FkSelect = ({ style, label, list, ...props }) => {
  const [field, meta] = useField(props)
  field.value = field.value || ''

  let opts = list && list.length ? [{ id: 0, name: `Selecciona tu ${label}` }, ...list] : [{ id: 0, name: `Selecciona tu ${label}` }]

  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Select style={{ color: 'black', ...style }} {...field} {...props}>
        {list && list.length ?
          opts.map(
            (opt, key) => <option {...{ key }} value={opt.id}>{opt.name}</option>
          )
          :
          <option disabled value={0}>{`Incapaz de cargar ${label}`}</option>
        }
      </Select>
      {meta.touched && meta.error ? (<div className="invalid-feedback">{meta.error}</div>) : null}
    </>
  )
}

export const FkDate = ({ style, label, ...props }) => {
  const [field, meta] = useField(props)
  field.value = field.value || ''

  return (
    <>
      {props.type == 'hidden' ? '' : <Label htmlFor={props.id || props.name}>{label}</Label>}
      <InputDate  {...field} {...props} />

    </>
  )
}
