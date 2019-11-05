const mysql = require('../utils/mysqlConfig')
const moment = require('moment')
//获取文章列表
const articleList = async (req, res, next) => {
    let pageNo = req.query.pageNo
    let pageSize = req.query.pageSize
    pageNo = (pageNo - 1) * pageSize
    var sql = `SELECT * FROM users right join article on users.userId = article.userId ORDER BY articleId LIMIT ${pageNo}, ${pageSize}`;
    console.log(sql)
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.json({
            code: 200,
            msg: 'success',
            data: {
                hasMore: true,
                list: result
            }
        })
    });
}
//添加文章
const addArticle = async (req, res, next) => {
    var params = req.body
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.createTime = createTime
    var sql = `INSERT INTO article set ?`;
    mysql.query(sql, params, (err, result) => {
        if (!err) {
            res.json({
                code: 200,
                msg: 'success',
                createTime: createTime
            })
        } else {
            res.json({
                code: 500,
                data: err
            })
            console.log('[SELECT ERROR]:', err.message);
        }

    });
}
//获得某一篇文章
const getArticle = async (req, res, next) => {
    let articleId = req.query.articleId || '*'
    var sql = `SELECT * FROM users right join article on users.userId = article.userId where article.articleId=${articleId}`;
    console.log(sql)
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.json({
            code: 200,
            msg: 'success',
            data: result,
        })
    });
}

const updateArticle = async (req, res, next) => {
    console.log(req.body)
    let articleId = req.body.articleId
    let title = req.body.title
    let contents = req.body.contents
    let updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    var sql = `UPDATE  article SET title=${title} contents=${contents} updateTime=${updateTime}  WHERE articleId = ${articleId}`;
    console.log(sql)
    mysql.query(sql, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: err.message
            })
            console.log('[SELECT ERROR]:', err.message);
        } else {
            res.json({
                code: 200,
                msg: 'success',
            })
        }
    });
}
module.exports = {
    articleList,
    addArticle,
    updateArticle,
    getArticle
}