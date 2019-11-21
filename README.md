# node服务器连接mysql数据库

#### mysql相关操作
>1. 表查询 
>2. 连表查询

#### 接口列表
1.http://localhost:3000/api/article/articleList?pageNo=1&pageSize=10   文章列表

1.http://localhost:3000/api/article/getArticle?id=100022   根据获取某一篇文章

1.http://localhost:3000/api/article/getArticlebyUser?id=1   获取某一作者的所有右文章篇文章

2.http://localhost:3000/api/article/addArticle   添加文章

3.http://localhost:3000/api/article/upDateArticle   更新文章

4.http://localhost:3000/api/article/removeArticle   删除文章

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

#### 接口 code定义

1.接口有返回的情况，根据服务器返回的数据情况，定义相关code值
> A0000     有数据 
> E0001     无此数据
> E0002     数据异常