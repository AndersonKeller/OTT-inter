import FormGroup from "~/components/layout/AuthModal/FormGroup";
import Label from "~/components/Form/Label";
import Input from "~/components/layout/AuthModal/Input";
import { useEffect, useState } from "react";
import withAuth from "~/components/withAuth";
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
  formData,
  setFormData
}) => {
  // TODO: FIX hardcoded country configuration.
  const argCountryId = 11;
  const braCountryId = 32;
  const chlCountryId = 48;

  // Isso NÂO É uma boa prática. Deve ser mudado. Porém a estrutura de estado do app impede outra implementação.
  // let formDataHasProperties = formData.hasOwnProperty("country_id")
  //                             && formData.hasOwnProperty("address_1st_level")
  //                             && formData.hasOwnProperty("city")
  //                             && formData.hasOwnProperty("address_3rd_level")
  //                             && formData.hasOwnProperty("address");

  // const {
  //   country_id: countryId,
  //   address_1st_level,
  //   city,
  //   address_3rd_level,
  //   address
  // } = formData;
  // } = formDataHasProperties ? formData : values;

  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(_ => {
    (async _ => {
      const { data } = await api.get("countries");
      setCountries(data);
    })();
  }, []);

  const handleCountryChange = e => {
    const { name, value } = e.target;
    // setValues({
    //   ...values,
    //   [name]: value,
    //   address_1st_level: ""
    // });
    setFormData({
      ...formData,
      [name]: value,
      address_1st_level: ""
    });

    onChangeCountry()

  };

  const firstLevelLabel = formData.country_id == argCountryId
    ? "Provincia"
    : formData.country_id == braCountryId
      ? "Estado"
      : formData.country_id == chlCountryId
        ? "Región"
        : "State";

  const firstLevelPluralLabel = formData.country_id == argCountryId
    ? "Provincias"
    : formData.country_id == braCountryId
      ? "Estados"
      : formData.country_id == chlCountryId
        ? "Regiones"
        : "States";

  const [firstLevelList, setFirstLevelList] = useState();

  useEffect(
    _ => {
      (async _ => {
        onChangeCountry();
      })();
    },
    []
  );

  let onChangeCountry = async () => {
    const parsedCountryId = parseInt(formData.country_id);
    const { data: addresses } = [
      argCountryId,
      braCountryId,
      chlCountryId
    ].includes(parsedCountryId)
      ? await api.get("address-1st-levels", {
        params: {
          country_id: formData.country_id
        }
      })
      : { data: null };
    setFirstLevelList(addresses);
  }

  const cityLabel = formData.country_id == braCountryId
    ? "Cidade"
    : formData.country_id == chlCountryId
      ? "Provincia"
      : "Ciudad";

  const thirdLevelLabel =
  formData.country_id == chlCountryId ? "Ciudad / Comuna" : "District";

  return (
    <div className="address">
      {/* country */}
      <SelectFormGroup
        error={error}
        label="País"
        loading={loading}
        list={countries}
        listMapValue="id"
        name="country_id"
        onChange={handleCountryChange}
        pluralLabel="Países"
        requireds={requireds}
        value={formData.country_id}
      />

      {/* 1st level */}
      {[argCountryId, braCountryId, chlCountryId]
        .map(id => id + "")
        .includes(formData.country_id) && (
        <SelectFormGroup
          error={error}
          label={firstLevelLabel}
          loading={loading}
          list={firstLevelList}
          listMapValue="id"
          name="address_1st_level"
          onChange={handleInputChange}
          pluralLabel={firstLevelPluralLabel}
          requireds={requireds}
          value={formData.address_1st_level}
        />
      )}

      {/* city */}
      {[braCountryId, chlCountryId].  map(id => id + "").includes(formData.country_id) && (
        <FormGroup>
          <Label htmlFor="city">{cityLabel}</Label>
          <Input
            id="city"
            name="city"
            onChange={handleInputChange}
            required={requireds}
            type="text"
            value={formData.city}
          />
          <InvalidFeedback error={error} loading={loading} name="city" />
        </FormGroup>
      )}

      {/* 3rd level */}
      {[chlCountryId].map(id => id + "").includes(formData.country_id) && (
        <FormGroup>
          <Label htmlFor="address_3rd_level">{thirdLevelLabel}</Label>
          <Input
            id="address_3rd_level"
            name="address_3rd_level"
            onChange={handleInputChange}
            required={requireds}
            type="text"
            value={formData.address_3rd_level}
          />
          <InvalidFeedback
            error={error}
            loading={loading}
            name="address_3rd_level"
          />
        </FormGroup>
      )}

      <FormGroup>
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          name="address"
          onChange={handleInputChange}
          required={requireds}
          type="text"
          value={formData.address}
        />
        <InvalidFeedback error={error} loading={loading} name="address" />
      </FormGroup>
    </div>
  );
};

export default withAuth(Address, true);
