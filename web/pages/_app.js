import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import {ThemeProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";
import makeStore from '../store'
import {fetchUserIfNeeded} from '../store/actions/auth'
import {MatchaAPI} from '../services/matcha-api'
import nextCookie from 'next-cookies';
import { appWithTranslation } from '../utils/i18n'
import Router from 'next/router'
import config from '../config'

function redirect(ctx, route) {
  if (ctx.req) {
    ctx.res.writeHead(302, {Location: route});
    ctx.res.end()
  } else {
    Router.push(route)
  }
}

class MyApp extends App {

  static async getInitialProps({Component, ctx}) {
    const oldGetInitialProps = Component.getInitialProps

    Component.getInitialProps = async (ctx) => {
      const matchaClient = new MatchaAPI(nextCookie(ctx), config.INTERNAL_ROOT_URL)

      try {
        if (ctx.pathname != '/apidown')
          await ctx.store.dispatch(fetchUserIfNeeded(matchaClient, false))
      } catch (e) {
        if (e.code == 'ECONNREFUSED') {
          redirect(ctx, '/apidown')
          return {
            namespacesRequired: ['common']
          }
        }

      }
      ctx.matchaClient = matchaClient
      if (oldGetInitialProps)
        return await oldGetInitialProps(ctx);
    }

    return {
      pageProps: await Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
    };
  }

  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>HyperTube</title>
          <link rel="icon" href="../static/images/favicons.png"/>
        </Head>
        <ThemeProvider theme={theme}>
          <noscript>
            <div style={{paddingTop: 40, backgroudColor: 'orange', width: '100%'}}>
              <p>Please activate javascript</p>
            </div>
          </noscript>
          <CssBaseline/>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default withRedux(makeStore)(appWithTranslation(MyApp));
