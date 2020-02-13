import withApi from '../../components/withApi/withApi'
import { STATIC_PATH } from '../../constants/constants'


const ReceiptPage = ({ api }) => {

  return (

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
      <style jsx>{`
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
          height: 45px;
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

    // <div id="appMountPoint">
    //   <div lang="pt-BR" class="accountLayout" dir="ltr">
    //     <div class="bd">
    //       <div class="responsive-account-container">
    //         <div class="invoiceContainer">
    //           <div class="logo icon-logoUpdate"></div>
    //           <div id="" class="invoiceAddress" data-uia="invoice-address">
    //             Netflix Entretenimento Brasil, Ltda.<br />Alameda Xingu, 350 -
    //             14° andar - Alphaville Industrial<br />Barueri, CEP 06455-911 -
    //             SP - Brazil
    //           </div>
    //           <div
    //             class="invoiceTaxNumber"
    //             data-uia="invoice-address-tax-number"
    //           >
    //             CNPJ: 13.590.585/0002-70
    //           </div>
    //           <dl class="invoiceInfo invoiceEmail" data-uia="invoiceInfo">
    //             <div>breakearth@gmail.com</div>
    //           </dl>
    //           <div class="invoiceNumberContainer">
    //             <dl class="invoiceInfo" data-uia="invoiceNumber">
    //               <dt>No. da fatura</dt>
    //               <dd data-uia="invoice-id">2A2F4-1BD06-2A490-299FC</dd>
    //             </dl>
    //           </div>
    //           <div class="invoice-table">
    //             <section class="desktop-content">
    //               <table>
    //                 <thead>
    //                   <tr>
    //                     <th>Data</th>
    //                     <th>Descrição</th>
    //                     <th>Período de serviço</th>
    //                     <th class="align-right">Valor</th>
    //                     <th
    //                       data-uia="invoice-tax-rate-header"
    //                       class="align-right"
    //                     >
    //                       Tributos%
    //                     </th>
    //                     <th
    //                       data-uia="invoice-tax-amount-header"
    //                       class="align-right"
    //                     >
    //                       Tributos
    //                     </th>
    //                     <th class="align-right">Subtotal</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   <tr class="data-row">
    //                     <td data-uia="invoice-date-0">09/02/2020</td>
    //                     <td data-uia="invoice-description-0">
    //                       Serviço de transmissão online
    //                     </td>
    //                     <td data-uia="invoice-period-0">
    //                       09/02/2020—08/03/2020
    //                     </td>
    //                     <td
    //                       data-uia="invoice-amount-before-tax-0"
    //                       class="align-right"
    //                     >
    //                       R$29,20
    //                     </td>
    //                     <td data-uia="invoice-tax-rate-0" class="align-right">
    //                       11,25%
    //                     </td>
    //                     <td data-uia="invoice-tax-amount-0" class="align-right">
    //                       R$3,70
    //                     </td>
    //                     <td data-uia="invoice-subtotal-0" class="align-right">
    //                       R$32,90
    //                     </td>
    //                   </tr>
    //                 </tbody>
    //               </table>
    //             </section>
    //             <section class="mobile-content">
    //               <div class="mobile-invoice-item">
    //                 <dl>
    //                   <dt>Data</dt>
    //                   <dd data-uia="invoice-mobile-date-0">09/02/2020</dd>
    //                 </dl>
    //                 <dl>
    //                   <dt>Descrição</dt>
    //                   <dd data-uia="invoice-mobile-description-0">
    //                     Serviço de transmissão online
    //                   </dd>
    //                 </dl>
    //                 <dl>
    //                   <dt>Período de serviço</dt>
    //                   <dd data-uia="invoice-mobile-period-0">
    //                     09/02/2020—08/03/2020
    //                   </dd>
    //                 </dl>
    //                 <dl>
    //                   <dt>Valor</dt>
    //                   <dd data-uia="invoice-mobile-amount-before-tax-0">
    //                     R$29,20
    //                   </dd>
    //                 </dl>
    //                 <dl>
    //                   <dt>Tributos (11,25%)</dt>
    //                   <dd data-uia="invoice-mobile-tax-0_0">R$3,70</dd>
    //                 </dl>
    //                 <dl>
    //                   <dt>Subtotal</dt>
    //                   <dd data-uia="invoice-mobile-subtotal-0">R$32,90</dd>
    //                 </dl>
    //               </div>
    //             </section>
    //           </div>
    //           <dl class="invoiceFooter">
    //             <dt>TOTAL</dt>
    //             <dd>R$32,90</dd>
    //           </dl>
    //           <dl class="invoicePayment" data-uia="invoicePayment">
    //             <dt>Forma de pagamento:</dt>
    //             <dd>
    //               <span class="icon-payment icon-payment-visa"
    //                 ><span class="text-payment">VISA</span>
    //               </span>
    //               <span id="" class="mopType" data-uia="">
    //                 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;
    //                 &bull;&bull;&bull;&bull; 1627
    //               </span>
    //             </dd>
    //           </dl>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )

}

export default withApi(ReceiptPage)
