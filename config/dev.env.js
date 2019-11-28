'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://localhost:8085"', // 本地
  // API_ROOT: '"http://partner.elongai.com/"', // 易龙外网
  // API_ROOT: '"http://h5.bandins.com/"', // 邦德外网
  API_ROOT: '"http://localhost:8092/"', // 测试环境
  // API_ROOT: '"http://localhost:8092"',
  // API_ROOT: '"http://dev-apis.bandins.cn"', // 本地
  DIR_NAME: '"/"',
})
