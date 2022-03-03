const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.99.40.56:6999',
        // target: 'https://business.pre.buff8.com',
        // target: 'http://47.97.206.161:6999',
        // 海涛
        // target: 'http://192.168.4.108:6999',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({
        resolvers: [ElementPlusResolver()]
      }),
      require('unplugin-vue-components/webpack')({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '汇智互娱智能'
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('~', resolve('types'))
      .set('@api', resolve('src/api'))
      .set('@http', resolve('src/http'))
      .set('@img', resolve('src/assets/img'))
      .set('@styl', resolve('src/assets/styl'))
      .set('@js', resolve('src/assets/js'))
      .set('@ts', resolve('src/assets/ts'))
      .set('@fonts', resolve('src/assets/fonts'))
      .set('@libs', resolve('src/libs'))
      .set('@cp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@plugins', resolve('src/plugins'))
      .end()
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      })
      .end()
  }
}
