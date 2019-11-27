import Router from "next/router";
import nextCookie from "next-cookies";

/*
 * Require a user to be logged or not be logged
 */

export const authentified = isRequired => WrappedComponent => {
  const Wrapper = props => (<WrappedComponent {...props} />)

  Wrapper.getInitialProps = async ctx => {
    const cookies = nextCookie(ctx);
    const hasToken = cookies['koa:sess'] && cookies['koa:sess.sig'];
    const mustRedirect = (isRequired && !hasToken) || (!isRequired && hasToken);
    const redirectTo = isRequired ? '/login' : '/'

    if (ctx.req && mustRedirect) {
      ctx.res.writeHead(302, {Location: redirectTo});
      return ctx.res.end()
    }

    if (mustRedirect) {
      return Router.push(redirectTo);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return {...componentProps}
  };

  return Wrapper
};
