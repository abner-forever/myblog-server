const mysql = require('../utils/mysqlConfig')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //引入包
const fs = require('fs')
const path = require('path')
const user_model = require('../models/user')
var apiModel = require('../lib/mysql.js')

const userInfo = (req, res, next) => {
    let userId = req.query.userId || '*'
    user_model.getUserInfoById(userId, (data) => {
        if (data) {
            res.json({
                code: 200,
                data: data
            })
        } else {
            res.json({
                code: 500,
                msg: '登录超时,token验证失败'
            })
        }

    })

}

const register = async (req, res, next) => {
    let userName = req.body.userName || ''
    let result = await apiModel.checkUserByusername(userName)
    if (result) {
        res.json({
            code: 500,
            msg: '用户名存在'
        })
        return
    }
    var salt = bcrypt.genSaltSync(10)   //设置加密等级  默认最高为10
    let password = req.body.password
    var hash = bcrypt.hashSync(password, salt)
    var params = {
        userId: null,
        userName: req.body.userName,
        sex: req.body.sex || '男',
        phone: req.body.phone || '19920181234',
        password: hash
    }
    apiModel.register(params).then(() => {
        res.json({
            code: 200,
            msg: '注册成功'
        })
    }).catch(() => {
        res.json({
            code: 500,
            data: '注册失败，稍后再试试'
        })
    })
}
const login = async (req, res, next) => {
    const username = req.body.userName || ''
    const password = req.body.password || ''
    if (!username || !password) {
        res.json({
            code: 500,
            msg: '用户名或者密码不能为空',
        })
        return
    }
    apiModel.checkUserByusername(userName).then((result) => {
        if (result.length == 0) {
            res.json({
                code: 500,
                msg: '用户名输入有误',
            })
        }
        if (bcrypt.compareSync(password, result[0].password)) {
            let private_key = fs.readFileSync(path.join(__dirname, '../key/private_key.pem'))
            var token = jwt.sign({ username, password }, private_key, { algorithm: 'RS256' });
            res.json({
                code: 200,
                msg: 'login success',
                data: {
                    token: token,
                    userId: result[0].userId
                }
            })
        } else {
            res.json({
                code: 500,
                msg: '密码错误',
            })
        }

    }).catch(() => {
        res.json({
            code: 500,
            msg: 'login fail',
        })
    })
}
module.exports = {
    register,
    userInfo,
    login
}