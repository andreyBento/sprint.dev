import '../public/css/utilidades.scss';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
      <div>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#547DEF" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
          <meta name="description" content="Projeto de organização de Sprints."/>
          <meta name="keywords" content="Sprintdev, sprint, organização de sprints"/>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <title>Sprint.dev</title>
        </Head>
        <Component {...pageProps} />
      </div>
  );
}

export default MyApp
