import Head from 'next/head'
import Link   from 'next/link'

import { useEffect } from 'react'
import { Accordion, Card, Button, Table } from 'react-bootstrap'

import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import { PackageRadio } from '../../components/Packages'
import withApi from '../../components/withApi/withApi'
import withAuth         from '../../components/withAuth/withAuth'

const Help = ({ layoutProps, user, ...props }) => {

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
                <Card.Text>Todo el contenido de Dale Campeón por 3 meses.</Card.Text>
                  <div className="col-2" style={{fontSize: '13px', lineHeight: '0.7rem', padding: 0}}>
                    <PackageRadio
                      readOnly
                      package_id="1"
                      plan={{
                        id: '1',
                        name:'3 meses',
                        currency: 'ars',
                        amount: '99'
                      }}
                    />
                  </div>
                </Card.Body>
                <Card.Footer style={{fontSize: '12px', lineHeight: 1}}>
                Proxima fatura: 1 de fevereiro de 2020.
                </Card.Footer>
              </Card>

                <Table hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Período</th>
                      <th>Forma de Pagamento</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td><Link href="#"><a>20/08/1989</a></Link></td>
                      <td>Dale Campeon </td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>R$32,90</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td><Link href="#"><a>20/08/1989</a></Link></td>
                      <td>Dale Campeon </td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>R$32,90</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td><Link href="#"><a>20/08/1989</a></Link></td>
                      <td>Dale Campeon </td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>R$32,90</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td><Link href="#"><a>20/08/1989</a></Link></td>
                      <td>Dale Campeon </td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>R$32,90</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td><Link href="#"><a>20/08/1989</a></Link></td>
                      <td>Dale Campeon </td>
                      <td>09/01/2020—08/02/2020</td>
                      <td>VISA •••• •••• •••• 1627</td>
                      <td>R$32,90</td>
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

Help.getInitialProps = async ctx => {
  // try{
  //   const data = await ctx.api.get('subscriptions');
  //   return { data }
  // }catch(error){
  //   console.table(error);
  //   return { error }

  // }
}

export default withAuth(withApi(Help));
