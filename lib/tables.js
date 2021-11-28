
// 用户信息表
const user = `
    create table if not exists user(
    userId INT NOT NULL AUTO_INCREMENT,
    sex INT NOT NULL  COMMENT '性别',
    userName VARCHAR(29) NOT NULL COMMENT '用户名',
    password VARCHAR(200) NOT NULL COMMENT '密码',
    avator VARCHAR(200) COMMENT '用户头像',
    registerTime VARCHAR(56) NOT NULL COMMENT '注册时间',
    phone VARCHAR(20) COMMENT '手机号',
    PRIMARY KEY(userId)
);`
// title,id,userName,createTime,updateTime,description
// 文章
const article = `
    create table if not exists article(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL COMMENT '文章标题',
    author VARCHAR(29) NOT NULL COMMENT '作者', 
    userId INT NOT NULL COMMENT '作者用户id',
    description VARCHAR(200) NOT NULL COMMENT '文章描述',
    createTime VARCHAR(56) NOT NULL COMMENT '创建时间',
    updateTime VARCHAR(56) NOT NULL COMMENT '修改时间',
    content TEXT(0) NOT NULL COMMENT '文章内容', 
    type VARCHAR(40) NOT NULL COMMENT '标签',
    viewCount INT NOT NULL COMMENT '浏览量',
    likeCount INT NOT NULL COMMENT '点赞量',
    hot INT NOT NULL COMMENT '热度',
    PRIMARY KEY(id)
);`

// 文章评论
const article_comment =
    `create table if not exists article_comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名称',
     content TEXT(0) NOT NULL COMMENT '评论内容',
     moment VARCHAR(40) NOT NULL COMMENT '评论时间',
     createTimeStamp VARCHAR(40) NOT NULL COMMENT '评论时间戳',
     postid VARCHAR(40) NOT NULL COMMENT '文章id',
     avator VARCHAR(100) NOT NULL COMMENT '用户头像',
     PRIMARY KEY(id) 
    );`

//数据表
const tables = [
    article_comment,
    user,
    article
]

module.exports = tables;