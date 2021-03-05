import Head from "next/head";
import Router from "next/router";
import styled from 'styled-components'
import React, { Component, useState, useEffect } from "react";
import Layout from "~/components/layout/Layout";
import MediaDescription from "~/components/media-description";
import BlockedPlayer from "~/components/Player/BlockedPlayer";
import Carousel from '../components/carousel'
import H2 from '../components/h2'
import MediaCard from '../components/MediaCard/MediaCard'


import { CONFIG } from "~/config";
import api from "~/services/api";
import moment from 'moment';



const Lives = ({ media, sub, errorCode, layoutProps, execute, recordings }) => {

  let { appName } = CONFIG;
  let { title: mediaTitle } = media;
  let message = `No hay transmisión en este momento!!`
  let pageTitle = `${mediaTitle ? mediaTitle : 'Live'} < ${appName}`;
  const [valid, setValid] = useState(execute)
  const [livesRecordings, setLivesRecordings] = useState(recordings)
  const [additional, setAdditional] = useState({ is_horizontal: 1 })
  let titleStreaming = `Mira lo que te perdiste`



  useEffect(_ => {

    async function lives() {


      let now = new Date();

      let response = await api().get(`/live`)
      now = moment(now).format("YYYY-MM-DD HH:mm:ss");
      let inicio = moment(response.data.transmission_date).format("YYYY-MM-DD HH:mm:ss");
      let final = moment(response.data.final_date).format("YYYY-MM-DD HH:mm:ss");
      let running = response.data.running;
      if (now >= inicio && running == 1 && now <= final) {
        setValid(true)

      } else {
        setValid(false)
      }
    }

    setInterval(lives, 8000)

  }, [])



  function ree() {
    if (livesRecordings && livesRecordings.length) {
      return <Carousel color='background'
        additional={additional}>
        {livesRecordings.map((media, key) => (
          <MediaCard category={additional} key={key} media={media} />
        ))}
      </Carousel>
    } else {
      <div className="error-message">{emptyMessage}</div>
    }

  }

  return (
    <StylePageLive>
      <Layout errorCode={errorCode} {...layoutProps}>
        <Head>
          <title>{pageTitle}</title>
        </Head>

        <div className="index__contents">

          <div className="carousel-section">
            <div className="container-fluid">
              <H2 className={`carousel-section-title`}>
                <p > {titleStreaming}</p>
              </H2>
            </div>
          </div>

          {ree()}
          <div class="container-player">
            {valid ? (
              <div className="container-fluid">
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
              </div>
            ) : (
                <div className="text-center">
                  {message}
                </div>
              )
            }
          </div>
        </div>

      </Layout >
    </StylePageLive>
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
    let final = moment(response.data.final_date).format("YYYY-MM-DD HH:mm:ss");

    let running = response.data.running;
    if (now >= inicio && running == 1 && now <= final) {
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

    const response_recordings = await api(ctx).get(`/recordings`);
    const recordings = response_recordings.data


    const data = response.data;

    return { media: data, sub: subscription?.data, execute: execute, recordings };
  } catch (error) {
    const errorCode = 404;
    return { errorCode };
  }
}

const StylePageLive = styled.div`
        .carousel-section :global(.carousel-section-title),
        .carousel-section .error-message {
          margin-left: 4%;
        }
           .index__contents {
          position: relative;
          z-index: 2;
          padding-bottom: 5em;
          padding-top: 2em;
        }
        .container-player{
          padding-top:5%;
        }

        .home-carousel-section:first-child {
          padding: 3.5em 0;
        }
        @media (min-width: 768px) {
          .index {
            margin-bottom: 30px;
          }
        }
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

`


export default Lives


