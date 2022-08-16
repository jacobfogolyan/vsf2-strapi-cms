import path from 'path'

// eslint-disable-next-line
export default function strapi(moduleOptions) {
  const { strapi } = this.options
  const options = {
    ...strapi,
    ...moduleOptions,
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options,
  })
}
