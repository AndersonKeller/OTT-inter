import Head from 'next/head'
import Link   from 'next/link'
import { useEffect, useState } from 'react'
import { Accordion, Card, Button, Table } from 'react-bootstrap'
import { PackageRadio } from '~/components/Packages'
import withAuth         from '~/components/withAuth'
import Layout           from '~/components/layout/Layout'
import { CONFIG }       from '~/config'

const PaymentsPage = ({ api, layoutProps, packages, user }) => {

  const [ plan, setPlan ] = useState({})
  const [ subscription, setSubscription ] = useState({})
  const [ orders, setOrders ] = useState([])

  useEffect(_ => {
    (async _ => {
      try{
        const { data: {package_id, ...data} } = await api.get('subscription')
        console.log(data)
        setSubscription(data)

        if(package_id){
          setPlan(packages.items.find(item => item.id == package_id))
        }else{
          setPlan(packages.items.find(item => item.amount == 0))
        }
      }catch(error){
        console.log(error)
      }
    })()
  }, [])

  useEffect(_ => {
    (async _ => {
      try{
        const { data } = await api.get('cash-orders')
        setOrders(data)
      }catch(error){
        console.log(error)
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
                <Card.Text>Todo el contenido de {CONFIG.appName} por {plan.name}.</Card.Text>
                  <div className="col-5 col-md-2 text-center" style={{fontSize: '13px', lineHeight: '0.7rem', padding: 0}}>
                    <PackageRadio
                      readOnly
                      package_id={plan.id}
                      plan={plan}
                    />
                  </div>
                </Card.Body>
                <Card.Footer style={{fontSize: '12px', lineHeight: 1}}>
                Próxima factura: {subscription.ends_at && subscription.ends_at.split(' ')[0]}
                </Card.Footer>
              </Card>
              <div className="mobile-table">
                {orders.map(order =>
                  <div className="mobile-row" key={order.id}>
                    <dl>
                      <dt>Fecha</dt>
                      <dd><Link href="receipt"><a target="_blank">{order.paid_at && order.paid_at.split(' ')[0]}</a></Link></dd>
                    </dl>
                    <dl>
                      <dt>Descripción</dt>
                      <dd>{CONFIG.appName}</dd>
                    </dl>
                    <dl>
                      <dt>Periodo</dt>
                      <dd>{order.paid_at && order.paid_at.split(' ')[0]}-</dd>
                    </dl>
                    <dl>
                      <dt>Medio de Pago</dt>
                      <dd><Link href="receipt"><a target="_blank">{order.download_link}</a></Link></dd>
                    </dl>
                    <dl>
                      <dt>Total</dt>
                      <dd>{order.value}</dd>
                    </dl>
                  </div>
                )}
                {/* <div className="mobile-row">
                  <dl>
                    <dt>Fecha</dt>
                    <dd><Link href="receipt"><a target="_blank">09/01/2020</a></Link></dd>
                  </dl>
                  <dl>
                    <dt>Descripción</dt>
                    <dd>{CONFIG.appName}</dd>
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
                </div> */}
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
                  {orders.map(order =>
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td><Link href="receipt"><a target="_blank">{order.paid_at && order.paid_at.split(' ')[0]}</a></Link></td>
                      <td>{CONFIG.appName}</td>
                      <td>{order.paid_at && order.paid_at.split(' ')[0]}-</td>
                      <td><Link href="receipt"><a target="_blank">{order.download_link}</a></Link></td>
                      <td>{order.value}</td>
                    </tr>
                  )}
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
          background-color: var(--primary-alpha);
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

PaymentsPage.getInitialProps = async ctx => {

  const {api, user} = ctx

  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch(error) {
    packages = { error }
  }

  return { packages, user }
}

export default withAuth(PaymentsPage);
