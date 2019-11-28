// other imports
import Head from 'next/head'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'

// page
export default function RegisterConfirmPage({ layoutProps }) {
  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>Confirm &lt; Register &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <p>Acceda al correo electrónico registrado para confirmar su cuenta.</p>
      </div>

      {/* <FormGroup>
        <Label hmtlFor="lastname">Apellido</Label>
        <Input id="lastname" type="text" />
      </FormGroup> */}

      {/*<FormGroup>
        <Label hmtlFor="address">Dirección</Label>
        <Input id="address" type="text" />
      </FormGroup>
      <FormGroup>
        <Label hmtlFor="city">Ciudad</Label>
        <Input id="city" type="text" />
      </FormGroup>
      <FormGroup>
        <Label hmtlFor="country">País</Label>
        <Input id="country" type="text" />
      </FormGroup>
      <FormGroup>
        <Label hmtlFor="document">Documento</Label>
        <Input id="document" type="text" />
      </FormGroup> */}

      {/* <FormGroup>
        <Form.Label className="radio-label" as="legend" style={{paddingRight:'25px'}}>Género</Form.Label>
        <Form.Check type="radio" label="Hombre" name="genre" inline />
        <Form.Check type="radio" label="Mujer" name="genre" inline />
      </FormGroup> */}

    {/* <FormGroup>
        <Label hmtlFor="payment">Meios de Pagamento</Label>
        <Input id="payment" type="text" />
      </FormGroup> */}

      <style jsx>{`
      `}</style>
    </Layout>
  );
}
