import React from 'react';
import 'styles/globals.css'
import 'styles/sass/global.scss'
import 'styles/antd.less'
import { IntlProvider } from "react-intl";
import { wrapper } from 'src/redux/store';
import App from 'next/app'
import { END } from 'redux-saga'
import { connect } from 'react-redux';

// function MyApp({ Component, pageProps }) {

//   const currentAppLocale = AppLocale.vi;

//   return (
//     // <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
//     <Component {...pageProps} />
//     // </IntlProvider>
//   )
// }

class WrappedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    debugger;
    // 1. Wait for all page actions to dispatch
    // const pageProps = {
    //   ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    //   // ...(Component.getServerSideProps ? await Component.getServerSideProps(ctx) : {}),
    //   // ...(Component.getStaticProps ? await Component.getStaticProps(ctx) : {}),
    // };
    let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    pageProps = {
      ...pageProps,
      ...(Component.getStaticProps ? await Component.getStaticProps(ctx) : {}),
    };
    pageProps = {
      ...pageProps,
      ...(Component.getServerSideProps ? await Component.getServerSideProps(ctx) : {})
    };

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise()
    }
    // 3. Return props
    return { pageProps };
  };

  render() {
    const { language } = this.props;
    const { Component, pageProps } = this.props;

    return (
      <IntlProvider locale={language.locale} messages={language.messages}>
        <Component {...pageProps} />
      </IntlProvider>
    )
  }
}

const mapState = state => {
  const { language } = state.Language;
  return { language }
}

export default wrapper.withRedux(
  connect(mapState)(WrappedApp)
);