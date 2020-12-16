// app imports
import FormGroup from './layout/AuthModal/FormGroup'
import { memo, useEffect, useState } from 'react'
import withApi from '~/components/withApi'

// packages component
const Packages = ({
  error,
  packages,
  items,
  pack,
  loading,
  onChange,
  package_id,
  validationError,
  readOnly,
  discount_id,
  setBlockDiscountFields,
  api
}) => {

  const [discounts, setDiscounts] = useState([])

  const [...rest] = items;

  /* get discounts */
  // useEffect(_ => {
  //   (async _ => {
  //     setBlockDiscountFields(true)
  //     const { data } = discount_id ? await api.get(`discounts/${discount_id}/packages`) : []
  //     setDiscounts(data)
  //     setBlockDiscountFields(false)
  //   })()
  // }, [discount_id])


  // error handling
  if (error) {
    return <div>No se pueden cargar paquetes</div>
  }

  // return
  return (
    <section className="packages">
      <div className="row gutter-15 packages__list">
        {rest && rest.map((item, key) => {
          let discount = discounts ? discounts.find(disc => disc.id == item.id) : null

          return <div className="col" {...{ key }}>
            <FormGroup>
              <PackageRadio {...{ onChange, readOnly, discount, package_id, plan: item }} />
            </FormGroup>
          </div>
        })}
      </div>
      {validationError && (
        <div className="invalid-feedback">{validationError}</div>
      )}
      <style jsx>{`
        .packages {
          margin-bottom: 15px;
        }
        .packages__list {
          margin-bottom: -15px;
        }
      ` }</style>
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
  buttonLabel
}) => {

  // plan.amount_with_discount = discount ? Math.round(plan.amount * (1 - discount.pivot.percent)) : 0

  return (
    <label className={'text-center' + (readOnly ? ' readonly' : '')}>
      <input
        checked={plan.id == package_id}
        name="package_id"
        onChange={onChange}
        type="radio"
        value={plan.id}
        {...{ readOnly }}
      />

      <span className="fake-input">

        <div className="suscripcion">{plan.id === 1 ? "Suscripción" : "Premium"}</div>
        {/* name */}
        <div className="d-block name">{plan.name}</div>

        {/* value */}
        {(plan.amount !== plan.amount_with_discount ||
          plan.amount === "$0" && !discount) && (
            <div className={discount ? 'discount-value' : 'value'}>
              {plan.amount}
            </div>
          )}

        {/* discount */}
        {discount && (
          <div className="value">
            {plan.amount_with_discount}
          </div>
        )}

        <div className={"btn-suscribir"}>{buttonLabel ? buttonLabel : "Suscribir"}</div>

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
          display: block;
          padding: 15px;
          transition: border-color .3s;
          background-color: #282828;
          color: #FFF;
        }
        input:checked + .fake-input {
          //border-color: var(--primary);
          //border-width: 2px;
          padding: 14px;
          background-color: var(--primary);

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
          margin-top: 1.4em;
          font-weight: bold;
        }

        .btn-suscribir {
          margin-top: 1.3em;
          background-color: transparent !important;
          border: 1px solid #FFF !important;
          font-weight: normal;
          border-radius: 4.6px;
          color: #FFF;
          padding: 0.8em 1em;
          font-size: 0.8em;
        }
        .suscripcion {
          margin: 0 0 1.4em 0;
          font-weight: bold;
        }

      ` }</style>
    </label>
  )
}

// export packages
export default withApi(memo(Packages))
