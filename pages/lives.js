import Head from "next/head";
import Router from "next/router";
import React, { Component, useState, useEffect } from "react";
import Layout from "~/components/layout/Layout";
import MediaDescription from "~/components/media-description";
import BlockedPlayer from "~/components/Player/BlockedPlayer";
import Loading from '../components/Loading/Loading'

import { CONFIG } from "~/config";
import api from "~/services/api";
import moment from 'moment';



const Lives = ({ media, sub, errorCode, layoutProps, execute }) => {
  let { appName } = CONFIG;
  let { title: mediaTitle } = media;
  let pageTitle = `${mediaTitle} < ${appName}`;
  const [valid, setValid] = useState(execute)



  useEffect(_ => {

    async function lives() {


      let now = new Date();

      let response = await api().get(`/live`)
      now = moment(now).format("YYYY-MM-DD HH:mm:ss");
      let inicio = moment(response.data.transmission_date).format("YYYY-MM-DD HH:mm:ss");
      let running = response.data.running;
      if (now >= inicio && running == 1) {
        setValid(true)
        console.log('rodar live')

      } else {
        setValid(false)
        console.log('Não rodar live')

      }


    }
    // this.setState({ valid: next })

    setInterval(lives, 8000)


  }, [])


  return (
    <Layout errorCode={errorCode} {...layoutProps}>
      <Head>
        <title>{pageTitle}</title>
      </Head>



      {valid && (<div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-12">

            <BlockedPlayer
              image={media.poster_url}
              media={media}
              sub={sub}
            />

            <div className="play-description-mobile">
              <MediaDescription {...{ media: media }} />
            </div>

          </div>
        </div>
        <div className="row media-desktop">
          <div className="col-lg-8">
            <MediaDescription {...{ media: media }} />

          </div>
        </div>
      </div>)
      }
      <style jsx>{`
          .play-description-mobile {
          display: none;
          }
          .media-desktop {
          display: block;
          }
          .row:first-child {
            margin-bottom: 15px;
          }
          .icons-row {
            margin-bottom: 25px;
          }
          @media (min-width: 1200px) {
            .container-fluid {
              padding-right: 4%;
              padding-left: 4%;
            }
            .row:first-child {
              margin-bottom: 30px;
            }
          }

          @media (max-width: 1024px) {
            .play-description-mobile {
              display: block;
              padding-top: 20px;
            }
            .media-desktop {
            display: none;
            }
          }
        ` }</style>
    </Layout >
  );
}
Lives.getInitialProps = async ctx => {

  try {
    const response = await api(ctx).get(
      `/live`
    );
    let execute;
    let now = new Date();
    now = moment(now).format("YYYY-MM-DD HH:mm:ss");
    let inicio = moment(response.data.transmission_date).format("YYYY-MM-DD HH:mm:ss");
    let running = response.data.running;
    if (now >= inicio && running == 1) {
      execute = true;

    } else {
      execute = false

    }

    let subscription = null;
    try {
      subscription = await api(ctx).get(`subscription`);
    } catch (e) {
      console.log(e);
    }


    const data = response.data;

    return { media: data, sub: subscription?.data, execute: execute };
  } catch (error) {
    const errorCode = 404;
    return { errorCode };
  }
}
export default Lives


