const express = require('express')
const boom = require('boom')
const userRouter = require('./users')
const Result = require('../models/Result')

const { CODE_ERROR } = require('../utils/constant')

// 注册路由
const router = express.Router()

router.get('/', (req, res) => {
  res.send('一个使用vue+element-ui开发的后台管理系统')
})

router.use('/users', userRouter)

/** 404请求处理
 * 需放到正常流程之后，不然会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
router.use((err, req, res, next) => {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    new Result(null, 'token认证失败', {
      error: err.status,
      errorMsg: err.message
    }).jwtError(res.status(err.status))
  } else {
    const msg = (err && err.message) || '系统错误，请联系管理员'
    const statusCode = (err.output && err.output.statusCode) || 500
    const message = (err.output && err.output.payload && err.output.payload.error) || err.message
    new Result(null, msg, {
      error: statusCode,
      errorMsg: message
    }).fail(res.status(statusCode))
  }
})
module.exports = router