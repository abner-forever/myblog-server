const moment = require('moment')
const apiModel = require('../lib/mysql.js')
const { handleData } = require('../utils')
const { base64toStr } = require('../utils/base64.js')

//获取文章列表
const articleList = async (req, res, next) => {
    let pageNo = req.query.pageNo || 1
    let pageSize = req.query.pageSize || 20
    let count = await apiModel.articleCount();
    count = count[0] || count[0].count || 0
    let more = false;
    if (pageNo * pageSize < count) {
        more = true
    }
    apiModel.acticleList(pageNo, pageSize).then((result) => {
        result.map((item) => {
            item.description = base64toStr(item.description)
            return item
        })
        handleData({
            res,
            data: {
                list: result,
                more: more,
                total: count,
                count: pageSize
            }
        })
    }).catch((error) => {
        handleData({ res, error })
    })
}

//添加文章
const addArticle = async (req, res, next) => {
    var params = req.body;
    const { title } = params;
    if (!title) {
        res.json({
            code: 500,
            message: '文章标题不能为空',
        })
        return false;
    }
    let result = await apiModel.checkArticleByTitle(title)
    if (result && result.length > 0) {
        apiModel.updateArticle(params).then(() => {
            res.json({
                code: 200,
                message: '文章更新成功',
            })
        }).catch((error) => {
            res.json({
                code: 500,
                message: `update fail: ${error.message}`,
            })
        })
        return;
    }
    apiModel.addArticle(params).then((_res) => {
        res.json({
            code: 200,
            message: '文章添加成功',
        })
    }).catch(() => {
        res.json({
            code: 500,
            message: '文章添加失败',
        })
    })
}

//根据文章id获取文章
const getArticle = async (req, res, next) => {
    let id = req.query.id || ''
    apiModel.geArticleById(id).then((result) => {
        const content = result[0] && base64toStr(result[0].content);
        if (result.length > 0) {
            handleData({
                res,
                data: {
                    ...result[0],
                    content
                }
            })
        } else {
            handleData({ res, error: '文章不见了' })
        }
    }).catch((error) => {
        handleData({ res, error })
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
            message: '文章更新成功',
        })
    }).catch((error) => {
        res.json({
            code: 500,
            message: `update fail: ${error.message}`,
        })
    })
}
// 我的文章列表
const myarticleList = async (req, res, next) => {
    let userId = req.query.userId || ""
    apiModel.geArticleByUserId(userId).then(result => {
        result.map((item) => {
            item.description = base64toStr(item.description)
            return item
        })
        res.json({
            code: 200,
            message: 'ok',
            data: result
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: `fail: ${err.message}`
        })
    })

}
// 删除文章列表
const removeArticle = async (req, res, next) => {
    var params = req.body.id
    apiModel.removeArticle(params).then(() => {
        res.json({
            code: 200,
            message: 'remove article success',
        })
    }).catch((err) => {
        res.json({
            code: 500,
            message: 'remove fail',
        })
    })
}


//获取文章评论
const getArticleComments = async (req, res, next) => {
    let param = req.query.id;
    apiModel.getComments(param).then((result) => {
        res.json({
            code: 200,
            message: 'success',
            data: result,
        })
    })
}
//发表评论
const addComment = async (req, res, next) => {
    let params = req.body;
    if (params.content == '') {
        res.json({
            code: 500,
            message: '内容不能为空',
        })
    }
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.moment = createTime;
    params.createTimeStamp = Date.now();

    apiModel.getUserById(params.userId || '').then((result) => {
        params.avator = result[0].avator || ''
        params.userName = result[0].userName || ''
        apiModel.addComment(params).then((_res) => {
            console.log('res', _res);
            res.json({
                code: 200,
                message: 'success',
            })
        }).catch((err) => {
            res.json({
                code: 500,
                message: `评论失败: ${err.message}`,
            })
        })
    }).catch((err) => {
        res.json({
            code: 500,
            message: err.message,
        })
    })

}
//发表评论
const removeComment = async (req, res, next) => {
    let params = req.body.id;
    apiModel.removeComment(params).then(() => {
        res.json({
            code: 200,
            message: 'success',
        })
    }).catch((err) => {
        console.log('err', err);
        res.json({
            code: 500,
            message: '删除失败',
        })
    })
}

module.exports = {
    articleList,
    addArticle,
    updateArticle,
    getArticle,
    myarticleList,
    removeArticle,
    getArticleComments,
    addComment,
    removeComment
}