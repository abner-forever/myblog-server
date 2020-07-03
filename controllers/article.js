const mysql = require('../utils/mysqlConfig')
const moment = require('moment')
const logUtil = require('../utils/logUtil')
//获取文章列表
const articleList = async (req, res, next) => {
    let pageNo = req.query.pageNo || 1
    let pageSize = req.query.pageSize || 20
    pageNo = (pageNo - 1) * pageSize
    var sql = `SELECT title,articleId,userName,createTime,updateTime,description FROM blog_users right join blog_article on blog_users.userId = blog_article.userId ORDER BY articleId >= (SELECT articleId FROM blog_users right join blog_article on blog_users.userId = blog_article.userId ORDER BY articleId LIMIT 0,1) LIMIT 10`
    mysql.query(sql, (err, result) => {
        logUtil.log(sql)
        if (err) {
            logUtil.handleError('[SELECT ERROR]:' + err.message)
        }
        let hasMore = false
        res.json({
            code: 'A0000',
            msg: 'success',
            data: {
                hasMore: hasMore,
                list: result,
            }
        })
    });
}
//添加文章
const addArticle = async (req, res, next) => {
    var params = req.body
    console.log('params', params);
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.createTime = createTime
    var sql = `INSERT INTO blog_article set ?`;
    mysql.query(sql, params, (err, result) => {
        if (!err) {
            res.json({
                code: 'A0000',
                msg: 'add article success',
                createTime: createTime
            })
        } else {
            res.json({
                code: 500,
                data: err
            })
            logUtil.log('[SELECT ERROR]:', err);
        }

    });
}
//获得某一篇文章
const getArticle = async (req, res, next) => {
    let articleId = req.query.id || ''
    if(!!!articleId){
        res.json({
            code: 'E0002',
            msg: '参数错误',
        })
        return false
    }
    var sql = `SELECT title,articleId,userName,createTime,updateTime,description,contents FROM blog_users right join blog_article on blog_users.userId = blog_article.userId where blog_article.articleId=${articleId}`;
    mysql.query(sql, (err, result) => {
     
        if (err) {
            logUtil.log('[SELECT ERROR]:', err.message);
        }
        if (result && result.length > 0) {
            logUtil.log('[select article success] article title: '+result[0].title);
            res.json({
                code: 'A0000',
                msg: 'success',
                data: result[0],
            })
        } else {
            res.json({
                code: 'E0001',
                msg: '没有这篇文章',
            })
        }
    });
}
//更新文章
const updateArticle = async (req, res, next) => {

    const { articleId,description, contents} = req.body
    let title =req.body.title || content.blocks[0].text
    let updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const sql = `UPDATE blog_article SET title='${title}',description='${description}', contents='${contents}', updateTime='${updateTime}' WHERE articleId = ${articleId}`;
    mysql.query(sql, (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: err.message
            })
            logUtil.log('[SELECT ERROR]:', err.message);
        } else {
            logUtil.log('文章更新成功');
            res.json({
                code: 'A0000',
                msg: 'update article success',
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