import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta charSet="utf-8" />
                    <meta name="keywords" key="keywords" content="4VUniverse" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>

                <footer className='footer'>
                    <a
                        href="https://www.aegona.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <img src="/vercel.svg" alt="Vercel Logo" className='logo' />
                    </a>
                </footer>
            </Html>
        )
    }
}

export default MyDocument