const jwtAuth = require('express-jwt')
const { PRIVATE_KEY } = require('../utils/constant')

module.exports = jwtAuth({
  secret: PRIVATE_KEY,
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: [ // token校验白名单
    '/',
    '/users/login'
  ]
})