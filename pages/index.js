import Layout from '../components/Layout';

const cards = [0, 1, 2, 3, 4, 5, 6, 7];

const Index = () => (
  <Layout>
    <div>
      <h1>Entrevista a nuestro "Napoléon" Marcelo Gallardo</h1>
      <a className="btn">Probar Gratis</a>
      <a className="btn">Ver más</a>
    </div>
    <h2>Platenences</h2>
    { cards.map(_ => {
      return (
        <div>Card</div>
      )
    }) }
  </Layout>
);

export default Index;
