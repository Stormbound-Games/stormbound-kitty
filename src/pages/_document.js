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
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
