const moment = require('moment')
const apiModel = require('../lib/mysql.js')

//获取文章列表
const articleList = async (req, res, next) => {
    let pageNo = req.query.pageNo || 1
    let pageSize = req.query.pageSize || 20
    let count = await apiModel.articleCount();
    count = count[0].count || 0
    let more = false;
    if (pageNo * pageSize < count) {
        more = true
    }
    apiModel.acticleList(pageNo, pageSize).then((result) => {
        res.json({
            code: 200,
            msg: 'success',
            data: {
                more: more,
                total: count,
                list: result
            }
        })
    }).catch(() => {
        res.json({
            code: 500,
            msg: '数据查询失败fail',
        })
    })


}
//添加文章
const addArticle = async (req, res, next) => {
    var params = req.body
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.createTime = createTime
    apiModel.addArticle(params).then(()=>{
        res.json({
            code: 200,
            msg: 'add article success',
        })
    }).catch(()=>{
        res.json({
            code: 500,
            msg: 'add article fail',
        })
    })
}
//获得某一篇文章
const getArticle = async (req, res, next) => {
    let id = req.query.id || ''
    apiModel.geArticleById(id).then((result) => {
        if (result.length > 0) {
            res.json({
                code: 200,
                msg: 'success',
                data: result[0],
            })
        } else {
            res.json({
                code: 'E0001',
                msg: '没有这篇文章',
            })
        }
    }).catch(() => {
        res.json({
            code: 500,
            msg: '文章查询失败',
        })
    })
}
//更新文章
const updateArticle = async (req, res, next) => {
    var params = req.body
    let updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.updateTime = updateTime
    apiModel.updateArticle(params).then(() => {
        res.json({
            code: 200,
            msg: 'update article success',
        })
    }).catch((err) => {
        res.json({
            code: 500,
            msg: 'update fail',
        })
    })
}
module.exports = {
    articleList,
    addArticle,
    updateArticle,
    getArticle
}