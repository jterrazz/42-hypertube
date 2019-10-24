import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const login = ({ koa }) => {
  // cookie.set('token', token, { expires: 1 });
  Router.push('/home')
};

export const auth = ctx => {
  const { koa } = nextCookie(ctx);
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !koa) {
    ctx.res.writeHead(302, { Location: '/index' });
    ctx.res.end()
  }

  // We already checked for server. This should only happen on client.
  if (!koa) {
    Router.push('/index')
  }

  // if (token && ctx.pathname === '/') {
  //   Router.push('/home');
  // }

  return koa
};

export const logout = () => {
  cookie.remove('koa');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
  Router.push('/index')
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/index')
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout')
      }
    }, [null]);

    return <WrappedComponent {...props} />
  };

  Wrapper.getInitialProps = async ctx => {
    const koa = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, koa }
  };

  return Wrapper
};