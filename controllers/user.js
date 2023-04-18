const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var apiModel = require('../lib/mysql')
const { handleData, bcryptHashSync } = require('../utils')
const { PRIVATE_KEY } = require('../config')

const userInfo = (req, res, next) => {
  let userId = req.headers['user-id'] || req.query.userId;
  if (!userId) {
    handleData({ res, error: '用户id为空' });
    return;
  }
  apiModel.getUserById(userId).then((data) => {
    if (data.length > 0) {
      res.json({
        code: 200,
        data: data[0]
      })
    } else {
      handleData({ res, error: '无此用户信息' });
    }
  }).catch(() => {
    handleData({ res, error: '用户信息查询失败' });
  })
}

const register = async (req, res, next) => {
  let userName = req.body.userName || ''
  let result = await apiModel.checkUserByusername(userName)
  if (result && result.length > 0) {
    res.json({
      code: 500,
      message: '用户名已存在'
    })
    return
  }

  let password = req.body.password;
  let params = {
    userId: null,
    userName: req.body.userName,
    sex: req.body.sex||2,
    phone: req.body.phone,
    password: bcryptHashSync(password, 10),
    avator: req.body.avator
  }
  apiModel.register(params).then(() => {
    res.json({
      code: 200,
      message: '注册成功'
    })
  }).catch(() => {
    res.json({
      code: 500,
      data: '注册失败，稍后再试试'
    })
  })
}

/**
 * 登录
 * 用户不存在登录即注册 
 * @returns 
 */
const login = async (req, res, next) => {
  const username = req.body.userName || ''
  const password = req.body.password || ''
  if (!username || !password) {
    return handleData({ res, error: '用户名或者密码不能为空' });
  }
  const phone = Number(username);
  let userInfo = null;
  try {
    if (!Object.is(phone, NaN)) {
      if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)) {
        return handleData({ res, error: '请输入正确的手机号' });
      }
      let result = await apiModel.checkUserByPhone(phone);
      userInfo = result.length && result[0];
    } else {
      let result = await apiModel.checkUserByusername(username);
      userInfo = result.length && result[0]
    }
    if (!userInfo) {
      let params = {
        userId: null,
        userName: req.body.userName,
        sex: null,
        phone: null,
        password: bcryptHashSync(password, 10),
        avator: null
      }
      apiModel.register(params).then(() => {
        let token = jwt.sign({ username, password }, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: 60 });
        apiModel.checkUserByusername(username).then((_result) => {
          if (_result && _result.length == 1) {
            res.json({
              code: 200,
              message: '登录成功',
              data: {
                token: token,
                userId: _result[0].id,
                register: 1
              }
            })
          } else {
            res.json({
              code: 500,
              data: '登录失败，稍后再试试'
            })
          }
        })

      }).catch(() => {
        return handleData({ res, error: '登录失败，稍后再试' });
      })
      return;
    } else {
      if(!userInfo.password){
        return handleData({ res, error: '用户名密码为空' });
      }
      if (bcrypt.compareSync(password, userInfo.password)) {
        let token = jwt.sign({ username, password }, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '30d' });
        res.json({
          code: 200,
          message: '登录成功',
          data: {
            token: token,
            userId: userInfo.id,
            register: 0
          }
        })
      } else {
        res.json({
          code: 500,
          message: '用户名或密码错误',
        })
      }
    }
  } catch (error) {
    res.json({
      code: 500,
      message: `登录失败: ${error.message}`,
    })
  }
}

const head = async (req, res, next) => {
  res.json({
    code: 200,
    url: req.body.head
  })
}
const updateUserInfo = async (req, res, next) => {

}
module.exports = {
  register,
  userInfo,
  login,
  head,
  updateUserInfo
}