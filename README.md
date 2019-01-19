# LightCMS

[仓库](https://github.com/beyondouyuan/LightCMS.git)


## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## webpack3.x升级webpacl4.x小记

- 卸载全局webpack webpack-dev-server
- npm uninstall webpack webpack-dev-server -g
- 重新安装webpack webpack-dev-server
- npm link webpack [将项目对webpack的引用指向全局的webpack(以防项目依赖的webpack不是4.x版本，当然也可以在项目中npm install webpack重新安装最新版本的webpack)]
- webpack4.x对babel的引入方式已经升级修改 所以需要删除项目依赖的babel-core babel-loader
- npm uninstall bable-core babel-loader(注：本项目的babel是backpack中引用，并未写在package.json中)
- 重新安装babel-core babel-loader
- npm install babel-core babel-loader
- npm run dev 由此可启动成功
