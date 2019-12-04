import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheets} from '@material-ui/styles'
import theme from '../styles/theme'

class MyDocument extends Document {

  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        <React.Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>,
      ],
    }
  };

  render() {
    return (
      <html lang="en">
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"/>
        <meta name="theme-color" content={theme.palette.primary.main}/>
        <script src="https://cdn.jsdelivr.net/npm/ractive"></script>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    )
  }
}

export default MyDocument;
