// import sleep from 'sleep-promise'
import FormGroup from '~/components/layout/AuthModal/FormGroup'
import Label from '~/components/Form/Label'
import Input from '~/components/layout/AuthModal/Input'
import { useEffect, useState } from 'react'
import withAuth from '~/components/withAuth'
import SelectFormGroup from "~/components/Form/SelectFormGroup";
import InvalidFeedback from "~/components/Form/InvalidFeedback";

const Address = ({
                   api,
                   error,
                   handleInputChange,
                   setValues,
                   loading,
                   requireds,
                   values,
                 }) => {

  // TODO: FIX hardcoded country configuration.
  const argCountryId = 11
  const braCountryId = 32
  const chlCountryId = 48

  const { country_id: countryId, address_1st_level, city, address_3rd_level, address } = values

  const [countries, setCountries] = useState()

  useEffect(_ => {
    (async _ => {
      const { data } = await api.get('countries')
      setCountries(data)
    })()
  }, [])

  const handleCountryChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
      address_1st_level: '',
    })
  }

  const firstLevelLabel = countryId == argCountryId ? 'Provincia' :
    countryId == braCountryId ? 'Estado' :
      countryId == chlCountryId ? 'Región' :
        'State'

  const firstLevelPluralLabel = countryId == argCountryId ? 'Provincias' :
    countryId == braCountryId ? 'Estados' :
      countryId == chlCountryId ? 'Regiones' :
        'States'

  const [firstLevelList, setFirstLevelList] = useState()

  useEffect(_ => {
    (async _ => {
      const parsedCountryId = parseInt(countryId)
      const { data: addresses } = [argCountryId, braCountryId, chlCountryId].includes(parsedCountryId) ?
        await api.get('address-1st-levels', {
          params: {
            country_id: countryId,
          },
        }) : { data: null }
      setFirstLevelList(addresses)
    })()
  }, [countryId])

  const cityLabel = countryId == braCountryId ? 'Cidade' :
    countryId == chlCountryId ? 'Provincia' :
      'Ciudad'

  const thirdLevelLabel = countryId == chlCountryId ? 'Ciudad / Comuna' : 'District'

  return (
    <div className="address">
      <h3 className="h3">Ubicación</h3>

      {/* country */ }
      <SelectFormGroup
        error={ error }
        label="País"
        loading={ loading }
        list={ countries }
        listMapValue="id"
        name="country_id"
        onChange={ handleCountryChange }
        pluralLabel="Países"
        requireds={ requireds }
        value={ countryId }
      />

      {/* 1st level */ }
      { [argCountryId, braCountryId, chlCountryId].map(id => id + '').includes(countryId) && (
        <SelectFormGroup
          error={ error }
          label={ firstLevelLabel }
          loading={ loading }
          list={ firstLevelList }
          listMapValue="id"
          name="address_1st_level"
          onChange={ handleInputChange }
          pluralLabel={ firstLevelPluralLabel }
          requireds={ requireds }
          value={ address_1st_level }
        />
      ) }

      {/* city */ }
      { [braCountryId, chlCountryId].map(id => id + '').includes(countryId) && (
        <FormGroup>
          <Label htmlFor="city">{ cityLabel }</Label>
          <Input
            id="city"
            name="city"
            onChange={ handleInputChange }
            required={ requireds }
            type="text"
            value={ city }
          />
          <InvalidFeedback error={ error } loading={ loading } name="city"/>
        </FormGroup>
      ) }

      {/* 3rd level */ }
      { [chlCountryId].map(id => id + '').includes(countryId) && (
        <FormGroup>
          <Label htmlFor="address_3rd_level">{ thirdLevelLabel }</Label>
          <Input
            id="address_3rd_level"
            name="address_3rd_level"
            onChange={ handleInputChange }
            required={ requireds }
            type="text"
            value={ address_3rd_level }
          />
          <InvalidFeedback error={ error } loading={ loading } name="address_3rd_level"/>
        </FormGroup>
      ) }

      <FormGroup>
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          name="address"
          onChange={ handleInputChange }
          required={ requireds }
          type="text"
          value={ address }
        />
        <InvalidFeedback error={ error } loading={ loading } name="address"/>
      </FormGroup>

    </div>
  )
}

export default withAuth(Address, true);
