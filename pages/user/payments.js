import Head from 'next/head'
import Link   from 'next/link'

import { useEffect } from 'react'
import { Accordion, Card, Button, Table } from 'react-bootstrap'

import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import { PackageRadio } from '../../components/Packages'
import withApi from '../../components/withApi/withApi'
import withAuth         from '../../components/withAuth/withAuth'

const PaymentsPage = ({ layoutProps, user, ...props }) => {

  // useEffect(() => {
  //   console.table(data);

  // }, [])

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
                  <div className="col-2" style={{fontSize: '13px', lineHeight: '0.7rem', padding: 0}}>
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

                <Table hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fecha</th>
                      <th>Descripción</th>
                      <th>Periodo</th>
                      <th>Medios de Pago</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
                      <td>River+</td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>$99,00</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
                      <td>River+</td>
                      <td>09/02/2020—08/03/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>$99,00</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
                      <td>River+</td>
                      <td>09/03/2020—08/04/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>$99,00</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
                      <td>River+</td>
                      <td>09/04/2020—08/05/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>$99,00</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
                      <td>River+</td>
                      <td>09/05/2020—08/06/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>$99,00</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td><Link href="#"><a>09/01/2020</a></Link></td>
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
            td > a {
              color: var(--gray);
              line-height: 1.5;
              text-decoration: underline;
            }
            td > a:hover {
              color: var(--primary-hover);
            }
            h3 {
              margin-bottom: 25px;
            }
            .table {
              margin-top: 15px;
            }
            .
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
              background-color: rgba(255, 0, 0, 0.3);
            }
        '`}</style>
    </Layout>
)}

// PaymentsPage.getInitialProps = async ctx => {
//   try{
//     const data = await api.get('subscriptions');
//     console.log(data);
//     return { data }
//   }catch(error){
//     console.log(error);
//     return { error }
//   }
// }

export default withAuth(PaymentsPage);
