const { querySQL, queryOne } = require('../db/index')

function login(username, password) {
  const sql = `select * from admin_user where username='${username}' and password='${password}'`
  return querySQL(sql)
}

function findUser(username) {
  const sql = `select id, username, role, avatar from admin_user where username='${username}'`
  return queryOne(sql)
}

module.exports = {
  login,
  findUser
}