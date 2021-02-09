const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //引入包
const fs = require('fs')
const path = require('path')
var apiModel = require('../lib/mysql.js')

const userInfo = (req, res, next) => {
    let userId = req.query.userId
    apiModel.getUserById(userId).then((data) => {
        if (data.length > 0) {
            res.json({
                code: 200,
                data: data[0]
            })
        } else {
            res.json({
                code: 500,
                msg: '无此用户信息'
            })
        }
    }).catch(() => {
        res.json({
            code: 500,
            msg: '无此用户信息'
        })
    })
}

const register = async (req, res, next) => {
    let userName = req.body.userName || ''
    let result = await apiModel.checkUserByusername(userName)
    if (result.length > 0) {
        res.json({
            code: 500,
            msg: '用户名已存在'
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
        password: hash,
        avator: req.body.avator
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
    apiModel.checkUserByusername(username).then((result) => {
        if (result.length == 0) {
            res.json({
                code: 500,
                msg: '用户不存在',
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
                    userId: result[0].userId,
                    userName: result[0].userName
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
const head = async (req, res, next) => {
    res.json({
        code: 200,
        url: req.body.head
    })
}
const updateUserHead = async (req, res, next) => {
    
}
module.exports = {
    register,
    userInfo,
    login,
    head,
    updateUserHead
}