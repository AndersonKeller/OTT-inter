import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { IS_PRODUCTION } from '~/constants/constants'
import theme from '~/theme'
import * as Sentry from '@sentry/browser'
import { GA_TRACKING_ID } from '~/lib/gtag'

process.on('unhandledRejection', (err) => {
  Sentry.captureException(err);
});

process.on('uncaughtException', (err) => {
  Sentry.captureException(err);
});

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App { ...props } />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            { initialProps.styles }
            { sheet.getStyleElement() }
          </>
        ),
      }
      // return {
      //   ...initialProps,
      //   // Styles fragment is rendered after the app and page rendering finish.
      //   styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
      // };
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>

          <script
            dangerouslySetInnerHTML={ {
              __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W62Q65V');
          `
            } }></script>

          <meta charSet="utf-8"/>
          <meta name="viewport" content="initial-scale=1, shrink-to-fit=yes, width=device-width, viewport-fit=cover"/>

          {/* PWA primary color */ }
          <meta name="theme-color" content={ theme.colors.primary }/>

          {/* Global Site Tag (gtag.js) - Google Analytics */ }
          <script
            async
            src={ `https://www.googletagmanager.com/gtag/js?id=${ GA_TRACKING_ID }` }
          />

          <script
            dangerouslySetInnerHTML={ {
              __html: ` !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '397493668062436');
          fbq('track', 'PageView');
          `
            } }></script>

          <script
            dangerouslySetInnerHTML={ {
              __html: `
              (function() {
                window.__Insp = window.__Insp || [];
                __insp.Push(['wid', 1793852315]);
                var ldinsp = function() {
                    if (typeof window.__inspld != "undefined") return;
                    window.__inspld = 1;
                    var insp = document.createElement('script');
                    insp.type = 'text / javascript';
                    insp.assíncrono = verdadeiro;
                    insp.id = "inspsync";
                    insp.src = ('https:' == documento.localização.protocolo ? 'https' : 'http') + ': //cdn.inspectlet.com/inspectlet.js? wid = 1793852315 & r =' + Math.floor(new Date().getTime() / 3600000);
                    var x = documento.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(insp, x);
                };
                setTimeout(ldinsp, 0);
          })();`}}></script>

          <noscript dangerouslySetInnerHTML={ {
            __html: `<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=397493668062436&ev=PageView&noscript=1" />`
          } }
          />

          <script
            dangerouslySetInnerHTML={ {
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ GA_TRACKING_ID }', {
              page_path: window.location.pathname,
            });
          `,
            } }
          />

          {/* styles */ }
          { IS_PRODUCTION ? <>
            {/* bootstrap */ }
            <link
              crossOrigin="anonymous"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
              integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
              rel="stylesheet"
            />
            {/* slick */ }
            <link
              charSet="utf-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
              rel="stylesheet"
              type="text/css"
            />
            {/* roboto & roboto condensed */ }
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Condensed:700&amp;display=swap"
              rel="stylesheet"
            />
          </> : <>
            {/* bootstrap */ }
            <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
            {/* slick */ }
            <link rel="stylesheet" href="/static/css/slick.css"/>
            <link rel="stylesheet" href="/static/css/slick-theme.css"/>
            {/* roboto & roboto condensed */ }
            <link rel="stylesheet" href="/static/fonts/roboto/stylesheet.css"/>
          </> }

          {/* bebas */ }
          <link rel="stylesheet" href="/static/fonts/bebas-neue/stylesheet.css"/>

        </Head>
        <body>
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W62Q65V"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }}
        />

        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
