import withApi from '../../components/withApi/withApi'
import { STATIC_PATH } from '../../constants/constants'

const ReceiptPage = ({ api }) => {

  return (
    <div className="receipt-page">
      <div className="receipt">
        <header>
          <div className="logo">
            <img className="img-fluid" src={`${STATIC_PATH}/logos/app_black.svg`} />
          </div>
          <p className="details">
            <p> Entretenimento Brasil, Ltda.</p>
            <p>Alameda Xingu, 350 - 14° andar - Alphaville Industrial</p>
            <p>Barueri, CEP 06455-911 - SP - Brazil</p>
            <p>CNPJ: 13.590.585/0002-70</p>
          </p>
          <p className="email">breakearth@gmail.com</p>
          <div className="receipt-info">
            <dl>
              <dt>Receipt ID:</dt>
              <dd>JF83-FN43</dd>
            </dl>
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Periodo</th>
              <th>Total</th>
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
              <td colspan="3">TOTAL</td>
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
        .receipt-page {
          background: #f1f1f1;
          height: 100%;
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
        .logo img {
          max-width: 160px;
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
          max-width: 35px;
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
      `}</style>
    </div>
  )
}

export default withApi(ReceiptPage)
