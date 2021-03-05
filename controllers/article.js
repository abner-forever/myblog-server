const moment = require('moment')
const apiModel = require('../lib/mysql.js')
const { handleData } = require('../utils')
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
        handleData(res, {
            more: more,
            total: count,
            count:pageSize,
            list: result
        })
    }).catch((err) => {
        handleData(res)
    })


}
//添加文章
const addArticle = async (req, res, next) => {
    var params = req.body
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.createTime = createTime
    apiModel.addArticle(params).then(() => {
        res.json({
            code: 200,
            msg: 'add article success',
        })
    }).catch(() => {
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
const myarticleList = async (req, res, next) => {
    let userId = req.query.userId || ""
    apiModel.geArticleByUserId(userId).then(result => {
        res.json({
            code: 200,
            msg: 'ok',
            data: result
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: 'fail'
        })
    })

}
const removeArticle = async (req, res, next) => {
    var params = req.body.id
    apiModel.removeArticle(params).then(() => {
        res.json({
            code: 200,
            msg: 'remove article success',
        })
    }).catch((err) => {
        res.json({
            code: 500,
            msg: 'remove fail',
        })
    })
}


//获取文章评论
const getArticleComments = async (req, res, next) => {
    let param = req.query.id;
    apiModel.getComments(param).then((result) => {
        res.json({
            code: 200,
            msg: 'success',
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
            msg: '内容不能为空',
        })
    }
    let createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    params.moment = createTime;
    params.createTimeStamp = Date.now();

    apiModel.getUserByUserName(params.name||'').then((avator) => {
        params.avator = avator[0].avator
        apiModel.addComment(params).then((result, p) => {
            res.json({
                code: 200,
                msg: 'success',
            })
        }).catch((err) => {
            res.json({
                code: 500,
                msg: '评论失败',
            })
        })
    }).catch((err)=>{
        res.json({
            code: 500,
            msg: err.message,
        })
    })

}
//发表评论
const removeComment = async (req, res, next) => {
    let params = req.body.id;
    apiModel.removeComment(params).then(() => {
        res.json({
            code: 200,
            msg: 'success',
        })
    }).catch((err) => {
        console.log('err', err);
        res.json({
            code: 500,
            msg: '删除失败',
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