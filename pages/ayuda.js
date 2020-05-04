import Color from 'color'
import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import { CONFIG } from '~/config'
import { WHITE } from '~/constants/colors'
import { Accordion, Card, Button } from 'react-bootstrap'
import withApi from '~/components/withApi'

const HelpPage = ({ layoutProps, title, faqs }) => {
  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>{title} &lt; {CONFIG.appName}</title>
      </Head>
      <div className="faqs-wrapper">
        <div className="container">
          <h3 className="faqs-title">Preguntas Frecuentes</h3>
          <Accordion>
            { faqs.map((item, key) => (
              <Card className="faqs-card">
                <Accordion.Toggle as={Card.Header} className="faqs-header" eventKey={key}>
                  <h5 className="faqs-question">{ item.question }</h5>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={key}>
                  <Card.Body>
                    <p className="faqs-text">{ item.answer }</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )) }
          </Accordion>
        </div>
      </div>
      <style global jsx>{`
        .faqs-wrapper {
          padding-bottom: 120px;
        }
        .faqs-question{
          margin: 0;
        }
        .faqs-title {
          font-size: 32px;
          font-weight: 700;
          line-height: 48px;
          padding-top: 10px;
        }
        .faqs-card {
          border: 1px solid var(--gray);
          border-radius: 3px;
        }
        .card-body {
          padding: 5px 20px;
        }
        .faqs-header {
          background-color: ${Color(WHITE).darken(.025).string()};
          cursor: pointer;
          transition: background-color .2s;
        }
        .faqs-header:hover {
          background-color: ${Color(WHITE).darken(.1).string()};
        }
        .faqs-text {
          font-size: 18px;
          white-space: pre-wrap;
        }
      `}</style>
    </Layout>
  )
}

HelpPage.getInitialProps = async ctx => {
  const { api } = ctx
  const { data } = await api.get('help')
  const { faqs } = data
  const title = 'Ayuda'
  return { faqs, title }
}

export default withApi(HelpPage)
