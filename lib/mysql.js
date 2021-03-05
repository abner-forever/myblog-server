var mysql = require('mysql');
var config = require('../config/default.js')
const logUtil = require('../utils/logUtil')

var pool = mysql.createPool({
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

let query = (sql, values) => {
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
let blog_comment =
    `create table if not exists blog_comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名称',
     content TEXT(0) NOT NULL COMMENT '评论内容',
     moment VARCHAR(40) NOT NULL COMMENT '评论时间',
     createTimeStamp VARCHAR(40) NOT NULL COMMENT '评论时间戳',
     postid VARCHAR(40) NOT NULL COMMENT '文章id',
     avator VARCHAR(100) NOT NULL COMMENT '用户头像',
     PRIMARY KEY(id) 
    );`
let createTable = (sql) => {
    return query(sql, [])
}

// 建表
createTable(blog_comment)

exports.insertData = (value) => {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return query(_sql, value)
}

//文章列表
exports.acticleList = (pageNum, pageSize) => {
    let _sql = `SELECT title,id,userName,createTime,updateTime,description
     FROM blog_users right join blog_article 
     on blog_users.userId = blog_article.userId 
    >= (
    SELECT id FROM blog_users right
    join blog_article on blog_users.userId = blog_article.userId
    ORDER BY id  LIMIT 0,1) ORDER BY id DESC LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
    return query(_sql, '')
}
//文章数量
exports.articleCount = () => {
    let _sql = `select count(*) as count from blog_article;`
    return query(_sql)
}
//文章数量
exports.addArticle = (value) => {
    let _sql = `INSERT INTO blog_article set ?`
    return query(_sql, value)
}
//获得评论
exports.getComments = (id) => {
    let _sql = `select * from blog_comment where postid=${id} order by moment desc`
    return query(_sql, id)
}

//获得评论
exports.getCommentById = (id) => {
    let _sql = `select * from blog_comment where id=${id}`
    return query(_sql, id)
}

//发表文章评论
exports.addComment = (value) => {
    let _sql = `insert into blog_comment set ?`
    return query(_sql, value)
}
//发表文章评论
exports.removeComment = (value) => {
    let _sql = `DELETE FROM blog_comment where blog_comment.id=?`
    return query(_sql, value)
}

exports.updateArticle = (value) => {
    let { title, description, contents, updateTime, id } = value
    let _sql = `UPDATE blog_article SET title='${title}',description='${description}', contents='${contents}', updateTime='${updateTime}'  WHERE id=${id}`
    return query(_sql, value)
}
exports.removeArticle = (value) => {
    let _sql = `DELETE FROM blog_article where blog_article.id=?`
    return query(_sql, value)
}

exports.geArticleById = (value) => {
    let _sql = `SELECT title,id,userName,createTime,updateTime,description,contents 
    FROM blog_users right join 
    blog_article on blog_users.userId = blog_article.userId 
    where blog_article.id=?`
    return query(_sql, value)
}
exports.geArticleByUserId = (value) => {
    let _sql = `SELECT title,id,userName,createTime,updateTime,description 
    FROM blog_users right join 
    blog_article on blog_users.userId = blog_article.userId 
    where blog_users.userId=?`
    return query(_sql, value)
}


exports.getUserById = (value) => {
    let _sql = `select userId,userName,avator,sex,phone from blog_users where blog_users.userId=?`
    return query(_sql, value)
}
// 发表评论
exports.insertComment = (value) => {
    let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"
    return query(_sql, value)
}
//检查用户名是否存在
exports.checkUserByusername = (value) => {
    let _sql = `SELECT * FROM blog_users where blog_users.userName =?`;
    return query(_sql, value)
}
//用户注册
exports.register = (value) => {
    let _sql = `INSERT INTO blog_users set ?`;
    return query(_sql, value)
}
//检查用户名是否存在
exports.getUserByUserName = (value) => {
    let _sql = `SELECT avator FROM blog_users where blog_users.userName =?`;
    return query(_sql, value)
}

exports.updateUserInfo = (value) => {
    let { userName, avator, id } = value
    let _sql = `UPDATE blog_users SET userName=${userName} avator=${avator} WHERE id=${id}`
    return query(_sql, value)
}