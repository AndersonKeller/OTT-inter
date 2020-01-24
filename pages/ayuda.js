import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import api from '../services/api'
import { Accordion, Card, Button } from 'react-bootstrap'

const Help = ({ layoutProps, title, faqs, ...props }) => {
    return (
    <Layout { ...layoutProps }>
        <Head>
           <title>{ title } &lt; {CONFIG.appName} </title>
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

            .faqs-question{
              margin:0;
            }
            .faqs-title {
                color: white;
                font-size: 32px;
                font-weight: 700;
                line-height: 48px;
                padding-top: 10px;
            }
            .faqs-card {
              background-color: black;


              border: 1px solid white;
              border-radius:5px;
            }
            .card-body {
              padding:5px 20px;
            }
            .faqs-header {
                border: none;
                color: var(--gray);
                background-color: black;

            }
            .faqs-header:hover {
              color: white;
            }

            .faqs-wrapper {
                min-height: 500px;
            }
            .faqs-text {
                color: white;
                font-size: 18px;
            }
        '`}</style>
    </Layout>
)}

Help.getInitialProps = async ctx => {
    const response = await api(ctx).get('/help');
    const data = await response.data;
    const {faqs} = data
    const title = 'Ayuda';
    return { faqs: faqs, ...{title}  };
}

export default Help;
