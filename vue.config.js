// vue.config.js
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.plugin('copy')
          .tap(args => {
            args[0].push({
              from: path.resolve(__dirname, 'src/assets/speech'),
              to: path.resolve(__dirname, 'dist/speech'),
              toType: 'dir'
            })
            return args
          })
  }
}