
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import VideoPlayer from '../../components/video-player'
import { IS_PRODUCTION } from '../../constants/constants';

const Page = ({ errorCode, layoutProps }) => (
  <Layout errorCode={errorCode} {...layoutProps}>
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

Page.getInitialProps = _ => {
  if (IS_PRODUCTION) {
    const errorCode = 404
    return { errorCode }
  }
}

export default Page
