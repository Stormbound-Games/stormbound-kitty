import Document, { Html, Head, Main, NextScript } from 'next/document'
import { renderToNodeList } from 'react-fela'
import createFelaRenderer from '~/helpers/createFelaRenderer'
import renderRootStyles from '~/helpers/renderRootStyles'

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const renderer = createFelaRenderer()
    const originalRenderPage = context.renderPage

    renderRootStyles(renderer)

    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App =>
          function EnhancedApp(props) {
            return <App {...props} renderer={renderer} />
          },
      })

    const initialProps = await Document.getInitialProps(context)
    const styles = [...initialProps.styles, ...renderToNodeList(renderer)]

    return { ...initialProps, styles }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='application-name' content='Stormbound-Kitty' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content='Stormbound-Kitty' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='notification-root' role='status' aria-live='polite'></div>
        </body>
      </Html>
    )
  }
}
