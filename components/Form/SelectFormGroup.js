import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/Form/Label";
import Select from "~/components/Select/Select";
import InvalidFeedback from "~/components/Form/InvalidFeedback";

const SelectFormGroup = ({ error, label, list, listMapValue = null, loading, name, onChange, pluralLabel, requireds, value }) => {
  return (
    <FormGroup>
      <Label htmlFor={ name }>{ label }</Label>
      <Select
        id={ name }
        name={ name }
        onChange={ onChange }
        required={ requireds }
        value={ value }
      >
        { !list ? (
          <option disabled value="">Cargando...</option>
        ) : list.length ? <>
          <option disabled value="">Selecciona tu { label.toLowerCase() }</option>
          { list.map((item, key) => {
            const value = listMapValue ? item[listMapValue] : item
            const optionName = listMapValue ? item.name : item
            return (
              <option key={ key } value={ value }>{ optionName }</option>
            )
          }) }
        </> : (
          <option disabled value="">Incapaz de cargar { pluralLabel }</option>
        ) }
      </Select>
      <InvalidFeedback error={ error } loading={ loading } name={ name }/>
    </FormGroup>
  )
}

export default SelectFormGroup
