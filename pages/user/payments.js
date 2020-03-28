import Head from 'next/head'
import Link   from 'next/link'

import { useEffect } from 'react'
import { Accordion, Card, Button, Table } from 'react-bootstrap'

import { PackageRadio } from '~/components/Packages'
import { CONFIG }       from '~/config'
import withAuth         from '~/components/withAuth'
import Layout           from '~/components/layout/Layout'
// import api              from '~/services/api'

const PaymentsPage = ({ layoutProps, user, api, ...props }) => {

  useEffect(() => {
    (async _ => {
      try{
        const subs = await api.get('subscriptions');
        console.table(subs);
        return { subs }
      }catch(error){
        console.log(error);
        return { error }
      }
    })()
  }, [])

  return (
    <Layout { ...layoutProps }>
        <Head>
           <title>Pagos &lt; {CONFIG.appName} </title>
        </Head>
        <div className="faqs-wrapper">
            <div className="container">
            <div className="row">
            <div className="col-12">
              <h3 className="title">Pagos</h3>
              <Card bg="dark" text="white">
                <Card.Body>
                <Card.Title>Tu plan</Card.Title>
                <Card.Text>Todo el contenido de River+ por 6 meses.</Card.Text>
                  <div className="col-5 col-md-2 text-center" style={{fontSize: '13px', lineHeight: '0.7rem', padding: 0}}>
                    <PackageRadio
                      readOnly
                      package_id="1"
                      plan={{
                        id: '1',
                        name:'6 meses',
                        currency: 'ars',
                        amount: '594'
                      }}
                    />
                  </div>
                </Card.Body>
                <Card.Footer style={{fontSize: '12px', lineHeight: 1}}>
                Próxima factura: 09 de Marzo de 2020.
                </Card.Footer>
              </Card>
              <div className="mobile-table">
                <div className="mobile-row">
                  <dl>
                    <dt>Fecha</dt>
                    <dd><Link href="receipt"><a>09/01/2020</a></Link></dd>
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
                    <dt>Total</dt>
                    <dd>$99,00</dd>
                  </dl>
                </div>
                <div className="mobile-row">
                  <dl>
                    <dt>Fecha</dt>
                    <dd><Link href="receipt"><a>09/01/2020</a></Link></dd>
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
                    <dt>Total</dt>
                    <dd>$99,00</dd>
                  </dl>
                </div>
              </div>
              <Table className="desktop-table" hover variant="dark" size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Periodo</th>
                    <th>Medio de Pago</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/01/2020—08/02/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/02/2020—08/03/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/03/2020—08/04/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/04/2020—08/05/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/05/2020—08/06/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td><Link href="receipt"><a>09/01/2020</a></Link></td>
                    <td>River+</td>
                    <td>09/06/2020—08/07/2020</td>
                    <td>VISA •••• •••• •••• 1627</td>
                    <td>$99,00</td>
                  </tr>
                </tbody>
              </Table>
            </div>
        </div>
        </div>
        </div>
       <style global jsx>{`
            td > a  {
              color: var(--gray);
              line-height: 1.5;
              text-decoration: underline;
            }
            dd > a {
              color: var(--primary);
            }
            td > a:hover {
              color: var(--primary-hover);
            }
            dd > a:hover {
              text-decoration: underline;
              color: var(--primary-hover);
            }

            h3 {
              margin-bottom: 25px;
            }
            .table {
              margin-top: 15px;
            }
            .table-dark {
              background: transparent;
            }
            .table-sm {
              font-size: 16px;
            }
            .card-text {
              font-size: 14px;
            }
            .table-dark.table-hover tbody tr:hover {
              background-color: rgba(255, 0, 0, 0.2);
            }
            .mobile-table {
              font-size: 16px;
              margin-top: 40px;
              margin-bottom: 20px;
              display: none;
            }
            .mobile-row {
              border-top: 1px solid white;
            }
            dl:first-child {
              margin-top: 15px;
            }
            dl {
              margin-bottom: 0.5rem;
            }
            dt, dd {
              font-weight: 300;
              display: inline;
            }
            dd {
              float:right;
            }
            @media only screen and (max-width: 767px) {
              .mobile-table {
                display: inherit;
              }
              .table {
                display: none;
              }
            }
        '`}</style>
    </Layout>
)}

// PaymentsPage.getInitialProps = async ctx => {
//   // try{
//     // console.table(subs);
//     // return { subs }
//   // }catch(error){
//   //   console.log(error);
//   //   return { error }
//   // }
// }

export default withAuth(PaymentsPage);
