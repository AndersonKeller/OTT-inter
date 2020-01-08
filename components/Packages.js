// app imports
import FormGroup from './layout/AuthModal/FormGroup'

// packages component
const Packages = ({ error, items, loading, onChange, package_id, validationError }) => {
  // error handling
  if (error) {
    return <div>No se pueden cargar paquetes</div>
  }
  // return
  return (
    <section className="packages">
      <h3 className="h3">Selecciona tu plan</h3>
      <div className="row gutter-15 packages__list">
        { items && items.map((item, key) => (
          <div className="col-6 col-md-3" {...{key}}>
            <FormGroup>
              <PackageRadio {...{onChange, package_id, plan: item}} />
            </FormGroup>
          </div>
        )) }
      </div>
      { validationError && (
        <div className="invalid-feedback">{validationError}</div>
      ) }
      <style jsx>{`
        .packages {
          margin-bottom: 15px;
        }
        .packages__list {
          margin-bottom: -15px;
        }
      `}</style>
    </section>
  )
}

// radio component
const PackageRadio = ({ onChange, package_id, plan }) => {
  return (
    <label className="text-center">
      <input
        checked={plan.id == package_id}
        name="package_id"
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

// export packages
export default Packages
