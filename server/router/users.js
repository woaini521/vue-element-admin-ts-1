const express = require('express')
const Result = require('../models/Result')
const { login, findUser } = require('../service/user')
const { md5, decode } = require('../utils')
const { PWD_SALT, JWT_EXPIRED, PRIVATE_KEY } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const jwtAuth = require('./jwt_auth')

const router = express.Router()

// token校验
router.use(jwtAuth)

router.post(
  '/login',
  [
    body('username').isString().withMessage('用户名必须为字符串'),
    body('password').isNumeric().withMessage('密码必须为数字')
  ],
  (req, res, next) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
      const [{ msg }] = err.errors
      next(boom.badRequest(msg))
    } else {
      let { username, password } = req.body

      password = md5(`${password}${PWD_SALT}`)

      login(username, password).then(user => {
        if (!user || user.length === 0) {
          new Result('用户名或密码错误，请重新登录').fail(res)
        } else {
          const token = jwt.sign(
            { username },
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
          )
          new Result({ token }, '登录成功').success(res)
        }
      })
    }
  }
)

router.post('/info', (req, res, next) => {
  const decodeInfo = decode(req) // token解析{ username: 'admin', iat: 1581928956, exp: 1581932556 }
  if (decodeInfo && decodeInfo.username) {
    findUser(decoded.username).then(user => {
      if (user) {
        user.roles = [user.role]
        new Result(user, '用户信息查询成功').success(res)
      } else {
        new Result('用户信息查询失败').fail(res)
      }
    })
  } else {
    new Result('用户信息解析失败').fail(res)
  }
})

module.exports = router