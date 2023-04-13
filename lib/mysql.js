const mysql = require('mysql');
const config = require('../config');
const { strtoBase64 } = require('../utils/base64');
const logUtil = require('../utils/logUtil')
const tables = require('./tables')

let pool = null;
try {
    pool = mysql.createPool({
        host: config.database.HOST,
        user: config.database.USERNAME,
        password: config.database.PASSWORD,
        database: config.database.DATABASE,
        port: config.database.PORT,
        options: {
            dialect: "mysql",
            dialectOptions: {
                charset: "utf8mb4",
                // collate: "utf8mb4_general_ci",
                supportBigNumbers: true,
                bigNumberStrings: true,
                socketPath: "/tmp/mysql.sock"
            }
        }
    });
} catch (error) {

}

const query = async (sql, values) => {
    try {
        return await new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    logUtil.log(`pool.getConnection error${err.message}`);
                    reject(err.message);
                } else {
                    connection.query(sql, values, (err_1, rows) => {
                        if (err_1) {
                            logUtil.log(`connection.query error${err_1.message}`);
                            reject(err_1);
                        } else {
                            resolve(rows);
                        }
                        connection.release();
                    });
                }
            });
        });
    } catch (error) {
        console.error('sql query error', error);
    }
}

const createTable = (sql) => {
    return query(sql, [])
}

// 建表
tables.forEach((item) => {
    createTable(item);
})

exports.insertData = (value) => {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return query(_sql, value)
}

//文章列表
exports.acticleList = (pageNum, pageSize) => {
    let _sql = `SELECT 
    title,user.id as user_id, 
    article.id as id, 
    user.name as userName,
    unix_timestamp(create_time)*1000 as createTime, 
    unix_timestamp(update_time)*1000  as updateTime,
    description
     FROM user right join article 
     on user.id = article.user_id 
    >= (
    SELECT user.id FROM user right
    join article on user.id = article.user_id
    ORDER BY article.id  LIMIT 0,1) ORDER BY article.id DESC LIMIT ${(pageNum - 1) * pageSize},${pageSize}`
    return query(_sql, '')
}
//文章数量
exports.articleCount = () => {
    let _sql = `select count(*) as count from article;`
    return query(_sql)
}
// 添加文章
exports.addArticle = ({ title, description, content, userId }) => {
    const _content = strtoBase64(content)
    const _description = strtoBase64(description);
    let _sql = `INSERT INTO article (title, user_id, description, content, type, view_count, like_count, hot, create_time, update_time) VALUES ( '${title}', ${userId}, '${_description}', '${_content}', NULL, NULL,  NULL, NULL, NOW(), NOW());`
    return query(_sql, { title, description, content, userId })
}
// 检查文章标题是否存在
exports.checkArticleByTitle = (value) => {
    let _sql = `SELECT title FROM article where title =?`
    return query(_sql, value)
}

// 更新文章
exports.updateArticle = (value) => {
    let { title, description, content, id } = value
    const _content = strtoBase64(content);
    const _description = strtoBase64(description);
    let _sql = `UPDATE article SET title='${title}', description='${_description}', content='${_content}', update_time=NOW() WHERE id=${id}`
    return query(mysql.raw(_sql).toSqlString(), value)
}
exports.removeArticle = (value) => {
    let _sql = `DELETE FROM article where article.id=?`
    return query(_sql, value)
}

exports.geArticleById = (value) => {
    let _sql = `SELECT
	b.title,
	b.id,
	unix_timestamp(b.create_time)*1000 as createTime, 
    unix_timestamp(b.update_time)*1000 as updateTime,
	b.description,
	b.content,
    a.id as userId,
    a.name as author
FROM
	user a RIGHT JOIN article b ON a.id = b.user_id 
WHERE
	b.id=?`
    return query(_sql, value)
}
exports.geArticleByUserId = (value) => {
    let _sql = `
    SELECT
	b.title,
	b.id,
	a.id as userId,
	b.create_time as createTime,
	b.update_time as updateTime,
	b.description,
	b.content
FROM
	user a RIGHT JOIN article b ON a.id = b.user_id 
WHERE
	a.id=?`
    return query(_sql, value)
}

// 发表评论
exports.insertComment = (value) => {
    let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"
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

//添加文章评论
exports.addComment = (value) => {
    const { userId, content, moment, postid, avator, userName } = value;
    const _sql = `INSERT INTO article_comment (userId, content, moment, postid, avator,userName, createTimeStamp) VALUES ('${userId}', '${content}', '${moment}', '${postid}', '${avator}', '${userName}', NOW());`
    return query(_sql, value)
}
//删除文章评论
exports.removeComment = (value) => {
    let _sql = `DELETE FROM article_comment where article_comment.id=?`
    return query(_sql, value)
}

exports.getUserById = (userId) => {
    let _sql = `select id as userId, name as userName, avator, sex, phone from user where id=?`
    return query(_sql, userId)
}

//检查用户名是否存在
exports.checkUserByusername = (value) => {
    let _sql = `SELECT * FROM user where name =?`;
    return query(_sql, value)
}

//根据手机号检测用户是否存在
exports.checkUserByPhone = (value) => {
    let _sql = `SELECT * FROM user where phone =?`;
    console.log('_sql',_sql);
    return query(_sql, value)
}


//用户注册
exports.register = (value) => {
    const { userName: name, password, sex } = value
    let _sql = `INSERT INTO user (sex, name, password, avator, register_time, phone) VALUES (${sex}, '${name}', '${password}', NULL, NOW(), NULL);`;
    return query(_sql, value)
}
//检查用户名是否存在
exports.getUserByUserName = (username) => {
    let _sql = `SELECT avator FROM user where name =${username}`;
    return query(_sql, username)
}

exports.updateUserInfo = (value) => {
    let { name, avator, id } = value
    let _sql = `UPDATE user SET name=${name} avator=${avator} WHERE id=${id}`
    return query(_sql, value)
}