import Router from "next/router";

/*
 * Require a user to be logged or not be logged
 */

export const authentified = isRequired => WrappedComponent => {
  const Wrapper = props => (<WrappedComponent {...props} />)

  Wrapper.getInitialProps = async ctx => {
    const state = ctx.store.getState();
    const hasToken = state.auth.user;
    const mustRedirect = (isRequired && !hasToken) || (!isRequired && hasToken);

    let redirectTo = '/';
    if (hasToken && !state.auth.user.profileCompleted) {
      redirectTo = '/profile' // TODO Maybe use the already made profile page
    } else if (isRequired) {
      redirectTo = '/login';
    }

    if (ctx.req && mustRedirect) {
      ctx.res.writeHead(302, {Location: redirectTo});
      return ctx.res.end()
    }

    if (mustRedirect || (hasToken && !state.auth.user.profileCompleted && ctx.pathname !== '/profile')) {
      if(ctx.isServer)
        return ctx.res.redirect(redirectTo);
      else
        return Router.push(redirectTo);
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return {...componentProps}
  };

  return Wrapper
};
