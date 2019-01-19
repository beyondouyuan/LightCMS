/*
 * @Author: beyondouyuan
 * @Date:   2018-08-20 10:58:40
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-01-12 13:17:50
 */


import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import Mongo from 'connect-mongo'
import {
  Nuxt,
  Builder
} from 'nuxt'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

// Import and Set Nuxt.js options
import config from '../nuxt.config'
import siteConf from '../config/site'

import { log } from '../utils/util'
import logUtil from '../utils/logUtil'

import webAPI from './api/web'
import adminAPI from './api/admin'

const app = express()
const host = process.env.HOST || siteConf.host
const port = process.env.PORT || siteConf.port



const MongoStore = Mongo(session)

mongoose.Promise = global.Promise
const db = mongoose.connection




app.set('port', port)


config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // mongodb
  if (siteConf.dev) {
    console.log('is dev')
    mongoose.connect(siteConf.TEST_DB_URL, {
      useNewUrlParser:true
    })
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', () => {
      log('mongodb test database opend!')
    })
  } else {
    mongoose.connect(siteConf.PROD_DB_URL, {
      authdb: 'irving_database'
    })
    db.on('error', console.error.bind(console, 'connection error: '))
    db.once('open', () => {
      log('mongodb prod database opend!')
    })
  }
  logUtil.initPath()
  // bodyParser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())

  // create session
  app.use(session({
    secret: siteConf.secret,
    resave: siteConf.resave,
    saveUninitialized: siteConf.saveUninitialized,
    cookie: {
      maxAge: siteConf.maxAge,
      secure: false,
      httpOnly: true
    },
    store: new MongoStore({
      mongooseConnection: db
    })
  }))

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // CORS解决跨域问题
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
      res.send(200);
      /让options请求快速返回/
    } else {
      next();
    }
  })
  app.use(`/web/${siteConf.APIVersionURL}`, webAPI)
  app.use(`/admin/${siteConf.APIVersionURL}`, adminAPI)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log(`Server listening on ===>>>> http://${host}:${port}`) // eslint-disable-line no-console
}
start()
