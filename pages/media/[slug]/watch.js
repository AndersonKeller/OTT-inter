import Head from "next/head";
import Router from "next/router";
import React, { Component, Fragment } from "react";
import Layout from "~/components/layout/Layout";
import MediaDescription from "~/components/media-description";
import MediaLink from "~/components/MediaLink/MediaLink";
import MoreContentCarousel from "~/components/more-content-carousel";
import BlockedPlayer from "~/components/Player/BlockedPlayer";
import { CONFIG } from "~/config";
import api from "~/services/api";

function Related({ category, medias }) {
  return (
    <Fragment>
      <div className={"related-videos"} style={{ "display": "flex", "flexFlow": "row wrap" }}>
        {medias.map((media, key) => (
          <RelatedVideo {...{ category, media, key }} />
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 1024px) {

          .related-videos {
            padding-top: 25px;
          }
        }
      `}</style>
    </Fragment>
  );
}

function RelatedVideo({ category = null, media }) {
  return (
    <div className="more-card">
      <MediaLink {...{ category, media }} watch>
        <a>
          <div className="row align-items-center gutter-15">
            <div className="col-md-7 card-img">
              <img
                className="img-fluid"
                height="123"
                src={
                  media.thumbnail2_url
                    ? media.thumbnail2_url
                    : "//placehold.jp/220x123.png"
                }
                width="220"
              />
            </div>
            <div className="col-md-4 card-title">
              <p>
                <strong>{media.title}</strong>
              </p>
            </div>
          </div>
        </a>
      </MediaLink>
      <style jsx>{`
        .more-card {
          font-size: 11px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        .more-card a {
          display: block;
          text-decoration: none;
        }
        .more-card a:focus,
        .more-card a:hover {
          color: var(--white);
        }
        .more-card p {
          margin-bottom: 0;
        }
        @media (min-width: 768px) {
          .more-card {
            line-height: 1.75;
            margin-bottom: 0;
            padding-top: 15px;
            padding-bottom: 15px;
          }
        }

        @media (max-width: 1024px) {

        .related-videos {
          padding-top: 25px;
        }
          .more-card {
            width: 100%;
            padding: 5px 10px;
          }

          .more-card a .row {
            display: flex;
            flex-direction: column;
          }

          .more-card > .card-img {

          }
          .more-card  .card-title {
            text-align: center;
            font-size: 1rem;
            padding-top: 20px;
          }
        }

      `}</style>
    </div>
  );
}

export default class WatchPage extends Component {
  constructor(props) {
    super(props);
    Router.events.on("routeChangeComplete", _ => {
      this.setState({ player: null });
      this.setState({
        player: (
          <BlockedPlayer
            image={this.props.media.thumbnail2_url}
            media={this.props.media}
            sub={this.props.sub}
          />
        )
      });
    });
  }

  state = {
    player: (
      <BlockedPlayer
        image={this.props.media?.thumbnail2_url}
        media={this.props?.media}
        sub={this.props.sub}
      />
    )
  };

  static async getInitialProps(ctx) {
    const { slug, category: categorySlug } = ctx.query;
    try {

      const response = await api(ctx).get(
        `/movie/${slug}/category/${categorySlug}`
      );

      let subscription = null;
      try {
        subscription = await api(ctx).get(`subscription`);
      } catch (e) {
        console.log(e);
      }

      console.log(subscription)

      const { category, movie, related } = response.data;

      return { category, media: movie, related, sub: subscription?.data };
    } catch (error) {
      const errorCode = 404;
      return { errorCode };
    }
  }

  render() {
    let { appName } = CONFIG;
    let { title: mediaTitle } = this.props.media;
    let pageTitle = `${mediaTitle} < ${appName}`;

    return (
      <Layout errorCode={this.props.errorCode} {...this.props.layoutProps}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-lg-9">
              {this.state.player}

              <div className="play-description-mobile">
                <MediaDescription {...{ media: this.props.media }} />
              </div>

            </div>
            {this.props.related && (
              <div className="col-12 col-lg-3 d-none d-md-block">
                <Related
                  {...{
                    category: this.props.category,
                    medias: this.props.related
                  }}
                />
              </div>
            )}
          </div>
          <div className="row media-desktop">
            <div className="col-lg-8">
              <MediaDescription {...{ media: this.props.media }} />
            </div>
          </div>

          {this.props.related && (
            <div className="d-md-none">
              <Related
                {...{
                  category: this.props.category,
                  medias: this.props.related
                }}
              />
              {/* <Related {...{category, medias: related}} /> */}
            </div>
          )}
        </div>

        {this.props.category && (
          <MoreContentCarousel category={this.props.category} />
        )}

        {/* <CommentSection /> */}

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
        `}</style>
      </Layout>
    );
  }
}
