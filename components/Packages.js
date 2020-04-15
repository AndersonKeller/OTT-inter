// app imports
import FormGroup from './layout/AuthModal/FormGroup'
import { useEffect, useState } from 'react'
import withApi from '~/components/withApi'

// packages component
const Packages = ({
  error,
  items,
  loading,
  onChange,
  package_id,
  validationError,
  readOnly,
  discount_id,
  api
}) => {

  const [discounts, setDiscounts] = useState(false)

  /* get discounts */
  useEffect(_ => {
    (async _ => {
      const { data } = discount_id ? await api.get(`discounts/${discount_id}/packages`) : {}
      setDiscounts(data)
    })()
  }, [discount_id])


  // error handling
  if (error) {
    return <div>No se pueden cargar paquetes</div>
  }

  // return
  return (
    <section className="packages">
      <h3 className="h3">Selecciona tu plan</h3>
      <div className="row gutter-15 packages__list">
        { items && items.map((item, key) => {
          let discount = discounts ? discounts.find(disc => disc.id == item.id) : null

          return <div className="col-6 col-md" {...{key}}>
            <FormGroup>
              <PackageRadio {...{onChange, readOnly, discount, package_id, plan: item} } />
            </FormGroup>
          </div>
        }) }
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
export const PackageRadio = ({
  onChange,
  package_id,
  plan,
  readOnly,
  discount,
}) => {

  plan.amount_with_discount = discount ? Math.round(plan.amount * ( 1 - discount.pivot.percent)) : 0

  return (
    <label className={'text-center' + (readOnly?' readonly':'') }>
      <input
        checked={plan.id == package_id}
        name="package_id"
        onChange={onChange}
        type="radio"
        value={plan.id}
        {...{readOnly}}
      />

      <span className="fake-input">

        {/* name */}
        <span className="d-block name">{ plan.name }</span>

        {/* value */}
        { (plan.amount !== plan.amount_with_discount ||
          plan.amount === 0 && !discount ) && (
          <span className={ discount ? 'discount-value' : 'value'}>
            { (plan.currency === 'ars' ? '$' : '') + plan.amount }
          </span>
        ) }

        {/* discount */}
        {  discount && (
          <span className="value">
            { (plan.currency === 'ars' ? '$' : '') + plan.amount_with_discount }
          </span>
        )}

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
          border-width: 2px;
          padding: 14px;
        }
        .name {
          font-size: 1.33em;
          margin-bottom: 5px;
        }
        .discount-value {
          text-decoration: line-through;
          margin-right: 5px;
          color: red;
        }
        .readonly {
          cursor: default;
        }
        .value {
        }
      `}</style>
    </label>
  )
}

// export packages
export default withApi(Packages)
