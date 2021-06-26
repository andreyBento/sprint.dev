import Document, {Html, Head, Main, NextScript} from "next/document";

import React from "react";

export default class SprintdevDocument extends Document {

    render() {
        return (
            <Html lang="pt-br">
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.png" />
                    <link rel="apple-touch-icon" href="/favicon/icon-180x180.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/favicon/icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/favicon/icon-167x167.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/icon-180x180.png" />
                    <meta name="google-signin-client_id" content="302072904653-rc1olciu9gikr98lcmqfn26g0rkaotu4.apps.googleusercontent.com.apps.googleusercontent.com" />
                    <script src="https://apis.google.com/js/platform.js" async defer/>
                </Head>
                <body>
                <Main />
                <NextScript/>
                </body>
            </Html>
        )
    }
}