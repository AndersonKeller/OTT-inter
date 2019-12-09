
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import VideoPlayer from '../../components/video-player'

const Page = ({ layoutProps, ...props }) => (
  <Layout {...layoutProps}>
    <Head>
      <title>Videos Sample &lt; {CONFIG.appName}</title>
    </Head>
    <div className="container">
      <VideoPlayer
        link='//dale.out.s3.amazonaws.com/campanha/campanha.mpd'
        poster="https://d2tkjr0gw68yth.cloudfront.net/fit-in/300x200/images/movies/posters/poster_1573496673inside-cover.png" />
      <VideoPlayer
        link='//dalecampeon.teste.s3.amazonaws.com/Campanha_de_Alistamento_Servico_Militar.mp4'
        poster="https://d2tkjr0gw68yth.cloudfront.net/fit-in/300x200/images/movies/posters/poster_1573496673inside-cover.png" />
    </div>
  </Layout>
);

export default Page
