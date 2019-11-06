import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

export default class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    const script = document.createElement("script");
    script.src =
        "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>HyperTube</title>
          <link rel="icon" href="../static/favicons.png" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <I18nextProvider i18n={i18n}>
            <Component {...pageProps} />
          </I18nextProvider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}
