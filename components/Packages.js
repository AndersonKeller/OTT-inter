// react imports
import { useContext, useEffect, useState } from 'react'

// app imports
import FormGroup from './layout/AuthModal/FormGroup'

// component
const Packages = ({ error, id_intention, items }) => {

  // const [ items, setItems ] = useState(items)
  const [ package_id, setPackageId ] = useState(id_intention)

  // useEffect(_ => {
  //   setItems(items)
  // }, [items])

  function handlePackage(e) {
    setPackageId(e.target.value)
  }

  if (error) {
    return <div>No se pueden cargar paquetes</div>
  }

  return (
    <section className="packages">
      <h3 className="h3">Selecciona tu plan</h3>
      <div className="row gutter-15">
        { items && items.map((item, key) => (
          <div className="col-6 col-md-3" {...{key}}>
            <FormGroup>
              <PackageRadio {...{onChange: handlePackage, package_id, plan: item}} />
            </FormGroup>
          </div>
        )) }
      </div>
    </section>
  )
}

const PackageRadio = ({ onChange, package_id, plan }) => {
  return (
    <label className="text-center">
      <input
        checked={plan.id == package_id}
        name="package"
        onChange={onChange}
        type="radio"
        value={plan.id}
      />
      <span className="fake-input">
        <span className="d-block name">{ plan.name }</span>
        <span className="value">{ (plan.currency === 'ars' ? '$' : '') + plan.amount }</span>
      </span>
      <style jsx>{`
        label {
          cursor: pointer;
          display: block;
          margin-bottom: 15px;
          overflow: hidden;
          position: relative;
        }
        input {
          opacity: 0;
          position: absolute;
        }
        .fake-input {
          border: 1px solid lightgray;
          border-radius: 4px;
          display: block;
          padding: 15px;
          transition: border-color .3s;
        }
        input:checked + .fake-input {
          border-color: var(--primary);
        }
        .name {
          font-size: 1.33em;
          margin-bottom: 5px;
        }
      `}</style>
    </label>
  )
}

export default Packages
