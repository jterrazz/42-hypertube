import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import {ThemeProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import { I18nextProvider } from 'react-i18next';
import { i18n } from '../utils/i18n';
import {NonScript} from "../components/atoms/NoScript";
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import makeStore from '../store'
import {fetchUserIfNeeded} from '../store/actions/auth'
import {MatchaAPI} from '../services/matcha-api'
import nextCookie from 'next-cookies';

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {
    const oldGetInitialProps = Component.getInitialProps

    Component.getInitialProps = async (ctx) => {
      const matchaClient = new MatchaAPI(nextCookie(ctx))

      await ctx.store.dispatch(fetchUserIfNeeded(matchaClient, false))
      ctx.matchaClient = matchaClient
      if (oldGetInitialProps)
        return await oldGetInitialProps(ctx);
    }

    return {
      pageProps: await Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    };
  }

  // TODO Maybe put noscript in body
  // TODO Google in register only
  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>HyperTube</title>
          <link rel="icon" href="../static/favicons.png"/>
          <script src="https://www.google.com/recaptcha/api.js" async defer/>
          <NonScript/>
        </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <I18nextProvider i18n={i18n}>
              <Provider store={store}>
               <Component {...pageProps} />
              </Provider>
            </I18nextProvider>
          </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withRedux(makeStore)(MyApp);
