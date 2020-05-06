import ClubLogo from '~/components/ClubLogo'
import withApi from '~/components/withApi'

const ReceiptPage = () => {
  return (
    <div className="receipt-page">
      <div className="receipt">
        <header>
          <div className="logo">
            <ClubLogo style={{ maxWidth: 80 }} />
          </div>
          <p className="details">
            <p>Somosgad S.A.S</p>
            <p>SERVICIOS DE CONSULTORES EN TECNOLOGÍA DE LA INFORMACIÓN</p>
            <p>POLA 107 - 3B - Villa Luro - Caba</p>
            <p>Buenos Aires</p>
          </p>
          <p className="email">breakearth@gmail.com</p>
          <dl className="payment">
            <dt>Receipt ID:</dt>
            <dd>JF83-FN43</dd>
          </dl>
        </header>
        <div className="mobile-table">
          <div className="mobile-row">
            <dl>
              <dt>Fecha</dt>
              <dd>09/01/2020</dd>
            </dl>
            <dl>
              <dt>Descripción</dt>
              <dd>River+</dd>
            </dl>
            <dl>
              <dt>Periodo</dt>
              <dd>09/01/2020—08/02/2020</dd>
            </dl>
            <dl>
              <dt>Medio de Pago</dt>
              <dd>VISA •••• •••• •••• 1627</dd>
            </dl>
            <dl>
              <dt>Subtotal</dt>
              <dd>$99,00</dd>
            </dl>
          </div>
          <div className="mobile-row">
            <dl>
              <dt>Fecha</dt>
              <dd>09/01/2020</dd>
            </dl>
            <dl>
              <dt>Descripción</dt>
              <dd>River+</dd>
            </dl>
            <dl>
              <dt>Periodo</dt>
              <dd>09/01/2020—08/02/2020</dd>
            </dl>
            <dl>
              <dt>Medio de Pago</dt>
              <dd>VISA •••• •••• •••• 1627</dd>
            </dl>
            <dl>
              <dt>Subtotal</dt>
              <dd>$99,00</dd>
            </dl>
          </div>
          <div className="mobile-row">
            <dl>
              <dt>Total</dt>
              <dd>$99,00</dd>
            </dl>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Periodo</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09/01/2020</td>
              <td>Servicio de transmisión de video</td>
              <td>09/01/2020—08/02/2020</td>
              <td>$99,00</td>
            </tr>
            <tr>
              <td colSpan="3">TOTAL</td>
              <td>$99,00</td>
            </tr>
          </tbody>
        </table>
        <dl className="payment">
          <dt>Medio de Pago:</dt>
          <dd>VISA •••• •••• •••• 1627</dd>
        </dl>
      </div>
      <style jsx>{`
        :global(body) {
          background: #f1f1f1 !important;
        }
        .receipt {
          font-size: 14px;
          margin: 10px;
          padding: 10px;
          max-width: 1024px;
        }
        .logo {
          margin-bottom: 25px;
        }
        .details {
          font-size: 12px;
        }
        .details p {
          margin: 0;
          line-height: 1.4;
        }
        .email {
          margin: 35px 0px;
        }
        table {
          min-height: 250px;
          width: 100%;
        }
        tbody, thead {
          border: 1px solid lightgrey;
        }
        tbody {
          vertical-align: top;
        }
        tr, td, th {
          padding: 10px;
        }
        tbody > tr:last-of-type {
          vertical-align: bottom;
          font-weight: bold;
          text-align: right;
          border-top: 1px solid lightgrey;
          height: 40px;
        }
        td:last-of-type, th:last-of-type {

          text-align: right;
        }
        tr:last-of-type > td {
          border-left: 1px solid lightgrey;
        }
        .payment {
          margin-top: 40px;
          margin-bottom: 20px;
        }
        dt, dd {
          font-weight: 300;
          display: inline;
        }
        dd {
          margin-left: 40px;
        }
        .mobile-table {
          font-size: 16px;
          margin-top: 40px;
          margin-bottom: 20px;
          display: none;
        }
        .mobile-row {
          border-top: 1px solid;
          margin-top: 20px;
          padding-top: 10px;
        }
        .mobile-row dt, .mobile-row dd {
          display: inline;
        }
        .mobile-row dd {
          float:right;
        }
        .mobile-row dl {
          margin-bottom: 0.5rem;
        }
        .mobile-row:last-of-type dt, .mobile-row:last-of-type dd {
          font-weight: bold;
        }
        @media only screen and (max-width: 767px) {
          .mobile-table {
            display: block;
          }
          table {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default withApi(ReceiptPage)
