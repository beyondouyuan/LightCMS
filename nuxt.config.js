const pkg = require('./package')
module.exports = {
  // 是否为开发环境
  dev: (process.env.NODE_ENV !== 'production'),
  cache: false,
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }, {
      hid: 'keywords',
      name: 'keywords',
      content: pkg.keywords
    }, {
      hid: 'author',
      name: 'author',
      content: pkg.author
    }, {
      hid: 'version',
      name: 'version',
      content: pkg.version
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://cdn.bootcss.com/highlight.js/9.12.0/styles/vs2015.min.css'
    }]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.css',
    '~/assets/css/style.scss',
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    'mavon-editor/dist/css/index.css'
  ],
  plugins: [{
    src: '~plugins/element-ui',
    ssr: true
  }, {
    src: '~plugins/ga',
    ssr: false
  }, {
    src: '~plugins/mavon-editor',
    ssr: false
  }],
  /*
   ** Add axios globally
   */
  build: {
    vendor: ['axios', 'element-ui'],
    /*
     ** Run ESLINT on save
     */
    // extend (config, ctx) {
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  router: {
    middleware: ['auth', 'cookies']
  }
}
