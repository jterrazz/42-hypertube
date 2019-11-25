import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';
import {NonScript} from "../components/atoms/NoScript";

import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import makeStore from '../store'
import { fetchUserIfNeeded  } from '../store/actions/auth'
import { MatchaAPI } from '../services/matcha-api'
import nextCookie from 'next-cookies';

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {
    const oldGetter = Component.getInitialProps

    // TODO Set cookies
    const cookies = nextCookie(ctx);
    const matchaClient = new MatchaAPI(cookies)

    // Dispatch store actions for the entire app
    Component.getInitialProps = async (ctx) => {
      ctx.store.dispatch(fetchUserIfNeeded)
      ctx.matchaClient = matchaClient
      return oldGetter(ctx)
    }
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {pageProps};
  }

  // TODO Try adding this only on the signup page and then delete it
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

  // TODO Maybe put noscript in body
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>HyperTube</title>
          <link rel="icon" href="../static/favicons.png" />
          <NonScript />
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <I18nextProvider i18n={i18n}>
              <Component {...pageProps} />
            </I18nextProvider>
          </ThemeProvider>
        </Provider>
      </React.Fragment>
    )
  }
}

export default withRedux(makeStore)(MyApp);
