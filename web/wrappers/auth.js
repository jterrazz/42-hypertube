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

    let redirectTo = null
    if (hasToken && !state.auth.user.profileCompleted && ctx.pathname !== '/profile') {
      redirectTo = '/profile'
    } else if (mustRedirect) {
      if (isRequired) {
        redirectTo = '/login';
      } else {
        redirectTo = '/';
      }
    }

    if (ctx.req && redirectTo) {
      ctx.res.writeHead(302, {Location: redirectTo});
      ctx.res.end()
    } else if (redirectTo) {
      Router.push(redirectTo);
    }

    if (redirectTo) {
      return {
        namespacesRequired: ['common']
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return {...componentProps}
  };

  return Wrapper
};
