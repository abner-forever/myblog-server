const mysql = require('mysql');
const config = require('../config')
const logUtil = require('../utils/logUtil')
const tables = require('./tables')

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT,
    options: {
        dialect: "mysql",
        dialectOptions: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            supportBigNumbers: true,
            bigNumberStrings: true
        }
    }
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                logUtil.log(err.message)
                reject(err.message)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        logUtil.log(err.message)
                        reject(err.message)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

const createTable = (sql) => {
    return query(sql, [])
}

// 建表
tables.forEach((item)=>{
    createTable(item);
})

exports.insertData = (value) => {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return query(_sql, value)
}

//文章列表
exports.acticleList = (pageNum, pageSize) => {
    let _sql = `SELECT title,id, userName as author,createTime,updateTime,description
     FROM user right join article 
     on user.userId = article.userId 
    >= (
    SELECT id FROM user right
    join article on user.userId = article.userId
    ORDER BY id  LIMIT 0,1) ORDER BY id DESC LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
    return query(_sql, '')
}
//文章数量
exports.articleCount = () => {
    let _sql = `select count(*) as count from article;`
    return query(_sql)
}
// 添加文章
exports.addArticle = (value) => {
    let _sql = `INSERT INTO article set ?`
    return query(_sql, value)
}
// 检查文章标题是否存在
exports.checkArticleByTitle = (value) => {
    let _sql = `SELECT title FROM article where article.title =?`
    return query(_sql, value)
}
//获得评论
exports.getComments = (id) => {
    let _sql = `select * from article_comment where postid=${id} order by moment desc`
    return query(_sql, id)
}

//获得评论
exports.getCommentById = (id) => {
    let _sql = `select * from article_comment where id=${id}`
    return query(_sql, id)
}

//发表文章评论
exports.addComment = (value) => {
    let _sql = `insert into article_comment set ?`
    return query(_sql, value)
}
//发表文章评论
exports.removeComment = (value) => {
    let _sql = `DELETE FROM article_comment where article_comment.id=?`
    return query(_sql, value)
}

exports.updateArticle = (value) => {
    let { title, description, content, updateTime, id } = value
    let _sql = `UPDATE article SET title='${title}',description='${description}', content='${content}', updateTime='${updateTime}'  WHERE id=${id}`
    return query(_sql, value)
}
exports.removeArticle = (value) => {
    let _sql = `DELETE FROM article where article.id=?`
    return query(_sql, value)
}

exports.geArticleById = (value) => {
    let _sql = `SELECT title,id,userName,createTime,updateTime,description,content
    FROM user right join 
    article on user.userId = article.userId 
    where article.id=?`
    return query(_sql, value)
}
exports.geArticleByUserId = (value) => {
    let _sql = `SELECT title,id,userName,createTime,updateTime,description 
    FROM user right join 
    article on user.userId = article.userId 
    where user.userId=?`
    return query(_sql, value)
}


exports.getUserById = (value) => {
    let _sql = `select userId,userName,avator,sex,phone from user where user.userId=?`
    return query(_sql, value)
}
// 发表评论
exports.insertComment = (value) => {
    let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"
    return query(_sql, value)
}
//检查用户名是否存在
exports.checkUserByusername = (value) => {
    let _sql = `SELECT * FROM user where user.userName =?`;
    return query(_sql, value)
}
//用户注册
exports.register = (value) => {
    let _sql = `INSERT INTO user set ?`;
    return query(_sql, value)
}
//检查用户名是否存在
exports.getUserByUserName = (value) => {
    let _sql = `SELECT avator FROM user where user.userName =?`;
    return query(_sql, value)
}

exports.updateUserInfo = (value) => {
    let { userName, avator, id } = value
    let _sql = `UPDATE user SET userName=${userName} avator=${avator} WHERE id=${id}`
    return query(_sql, value)
}