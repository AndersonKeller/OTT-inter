import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { Card, Table } from 'react-bootstrap'
import { ThemeContext } from 'styled-components'
import { PackageRadio } from '~/components/Packages'
import withAuth from '~/components/withAuth'
import Layout from '~/components/layout/Layout'
import { CONFIG } from '~/config'
import { StylePayment } from '~/components/layout/Payments/index'
import CardLogoHeader from '~/components/CardLogoHeader/index'

const PaymentsPage = ({ api, layoutProps, packages, user }) => {

  const [plan, setPlan] = useState({})
  const [subscription, setSubscription] = useState({})
  const [orders, setOrders] = useState([])

  useEffect(_ => {
    (async _ => {
      try {
        const { data: { package_id, ...data } } = await api.get('subscription')
        console.log(data)
        setSubscription(data)

        if (package_id) {
          setPlan(packages.items.find(item => item.id == package_id))
        } else {
          setPlan(packages.items.find(item => item.amount == 0))
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(_ => {
    (async _ => {
      try {
        const { data } = await api.get('cash-orders')
        setOrders(data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const theme = useContext(ThemeContext)
  const backgroundColor = theme.colors.backgroundContrast


  let packageSection;

  if (plan) {
    packageSection = <div className="painel">
      <div className="detail-compra">
        <Card.Title>Tu plan</Card.Title>
        <Card.Text>Todo el contenido de {CONFIG.appName} por {plan.name}.</Card.Text>
      </div>
      <div className="col-5 col-md-2 text-center" style={{ fontSize: '13px', lineHeight: '0.7rem', padding: 0 }}>
        <PackageRadio
          readOnly
          package_id={plan.id}
          plan={plan}
          buttonLabel={"Cambiar Plan"}
        />
      </div>
    </div>
  }

  return (
    <Layout {...layoutProps}>
      <CardLogoHeader>
        <StylePayment>
          <Head>
            <title>Pagos &lt; {CONFIG.appName} </title>
          </Head>
          {/* <div className="payments-wrapper">
            <div className="container"> */}

          <h1 className="h2">Detalles de la compra</h1>
          {packageSection}
          {/* <Card bg="dark" text="white"> */}


          <Card.Footer style={{ fontSize: '12px', lineHeight: 1 }}>
            Próxima factura: {subscription.ends_at && subscription.ends_at.split(' ')[0]}
          </Card.Footer>
          {/* </Card> */}
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
          {/* </div>
          </div> */}
        </StylePayment>
      </CardLogoHeader >
    </Layout >
  )
}

PaymentsPage.getInitialProps = async ({ api, user }) => {
  let packages
  try {
    const { data } = await api.get('packages')
    packages = { items: data }
  } catch (error) {
    packages = { error }
  }
  return { packages, user }
}

export default withAuth(PaymentsPage);
