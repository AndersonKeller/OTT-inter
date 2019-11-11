import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import { api } from '../services/api'
import { Accordion, Card } from 'react-bootstrap'

const Help = ({ layoutProps, title, faqs, ...props }) => {
    return (
    <Layout { ...layoutProps }>
        <Head>
           <title>{ title } &lt; {CONFIG.appName} </title>
        </Head>
        <div className="faqs-wrapper">
            <div className="container">
                <h3 className="faqs-title">Preguntas Frecuentes</h3>
                { faqs.map(item => (
                    <Accordion>
                       <Card className="faqs-card">
                          <Accordion.Toggle as={Card.Header} className="faqs-header" eventKey="0">
                                <h5 className="faqs-question">{ item.question }</h5>
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                <p className="faqs-text">{ item.answer }</p>
                              </Card.Body>
                          </Accordion.Collapse>
                       </Card>
                   </Accordion>
                )) }
            </div>
        </div>
       <style global jsx>{`
            .accordeon {
                border-bottom: 1;
            }
            .accordion>.card:last-of-type {
                border-bottom: 1px solid black;
            }
            .faqs-title {
                color: black;
                font-size: 32px;
                font-weight: 700;
                line-height: 48px;
                padding-top: 10px;
            }
            .faqs-card {
                border: 1px solid #000;
                margin-bottom: 4px;
            }
            .faqs-header {
                background-color: white;
                border: none;
            }
            .faqs-question {
                color: black;
                font-weight: 700;
            }
            .faqs-wrapper {
                background-color: white;
                min-height: 500px;         
            }
            .faqs-text {
                color: black;
            }
        '`}</style>
    </Layout>
)}

Help.getInitialProps = async function () {
    const response = await api.get('/help');
    const data = await response.data;
    const {faqs} = data
    const title = 'Ayuda';
    return { faqs: faqs, ...{title}  };
}

export default Help;