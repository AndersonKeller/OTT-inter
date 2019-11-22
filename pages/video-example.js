
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import VideoPlayer from '../components/video-player' 

const TermsAndPolitics = ({ layoutProps, ...props }) => (
    <div>
        <Layout {...layoutProps}>
            <Head>
                <title>{props.title} &lt; {CONFIG.appName}</title>
            </Head>
            <div className="container">
                <VideoPlayer 
                    link='http://dale.out.s3.amazonaws.com/campanha/campanha.mpd' 
                    poster="https://d2tkjr0gw68yth.cloudfront.net/fit-in/300x200/images/movies/posters/poster_1573496673inside-cover.png" /> 

                <VideoPlayer 
                    link='http://dale.out.s3.amazonaws.com/srv/stevie.mpd' 
                    poster="https://d2tkjr0gw68yth.cloudfront.net/fit-in/300x200/images/movies/posters/poster_1573496673inside-cover.png" /> 
            </div>
        </Layout>
    </div>
);

export default TermsAndPolitics 