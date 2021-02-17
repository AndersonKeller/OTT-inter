import Head from "next/head";
import Router from "next/router";
import React, { Component } from "react";
import Layout from "~/components/layout/Layout";
import MediaDescription from "~/components/media-description";
import BlockedPlayer from "~/components/Player/BlockedPlayer";
import { CONFIG } from "~/config";
import api from "~/services/api";


export default class WatchPage extends Component {
  constructor(props) {
    super(props);
    Router.events.on("routeChangeComplete", _ => {
      this.setState({ player: null });
      this.setState({
        player: (
          <BlockedPlayer
            image={ this.props.media.thumbnail2_url }
            media={ this.props.media }
            sub={ this.props.sub }
          />
        )
      });
    });
  }

  state = {
    player: (
      <BlockedPlayer
        image={ this.props.media?.thumbnail2_url }
        media={ this.props?.media }
        sub={ this.props.sub }
      />
    )
  };

  static async getInitialProps(ctx) {
    try {
      const response = await api(ctx).get(
        `/live`
      );

      let subscription = null;
      try {
        subscription = await api(ctx).get(`subscription`);
      } catch (e) {
        console.log(e);
      }


      const data = response.data;

      return {media: data, sub: subscription?.data };
    } catch (error) {
      const errorCode = 404;
      return { errorCode };
    }
  }

  render() {
    let { appName } = CONFIG;
    let { title: mediaTitle } = this.props.media;
    let pageTitle = `${ mediaTitle } < ${ appName }`;

    return (
      <Layout errorCode={ this.props.errorCode } { ...this.props.layoutProps }>
        <Head>
          <title>{ pageTitle }</title>
        </Head>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-lg-12">
              { this.state.player }

              <div className="play-description-mobile">
                <MediaDescription { ...{ media: this.props.media } } />
              </div>

            </div>
          </div>
          <div className="row media-desktop">
            <div className="col-lg-8">
              <MediaDescription { ...{ media: this.props.media } } />
            </div>
          </div>
        </div>

        <style jsx>{ `
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
      </Layout>
    );
  }
}
