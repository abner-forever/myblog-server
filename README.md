# node服务器连接mysql数据库

#### mysql相关操作
>1. 表查询 
>2. 连表查询

#### 接口列表
1.http://localhost:3000/api/article/articleList   文章列表
1.http://localhost:3000/api/article/addArticle   添加文章
1.http://localhost:3000/api/article/upDateArticle   更新文章
1.http://localhost:3000/api/article/removeArticle   删除文章

```
"data": [
{
"userId": 123,  //用户id
"userName": "Abner",    //用户名
"sex": 1,               //性别
"phone": "123123123123",    //电话
"id": 100001,           
"contents": "文章内容"
},
```