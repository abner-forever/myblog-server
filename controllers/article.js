const mysql = require('../utils/mysqlConfig')

const articleList = async (req, res, next) => {
    var sql = `SELECT * FROM users right join article on users.userId = article.userId`;
    console.log(sql)
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.json({
            code: 200,
            data: result
        })
    });
}

const addArticle = async (req, res, next) => {
    var params = {
        id: null,
        userName: '张三',
        contents: '文章内容'
    }
    var sql = `INSERT INTO article set ?`;
    mysql.query(sql, params, (err, result) => {
        if (!err) {
            res.json({
                code: 200,
                data: result
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
module.exports = {
    articleList,
    addArticle
}