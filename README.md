# 我的博客后端服务
> node + mysql
## 启动
1. 开发调试
yarn dev --env 数据库密码

1. pm2启动
pm2 start blog_api --watch

- 配置文件
    ecosystem.config.js
- 配置文件启动
    yarn run pm2 数据库密码

## mysql相关操作
>1. 表查询 
>2. 连表查询

## 接口列表

### 1.文章
  1. /api/article/articleList?pageNo=1&pageSize=10   文章列表
      ```json
      [
         {
              "articleId":"1",
              "title":"标题",
              "createTime":"",
              "updateTime":"",
              "description":"文章描述",
              "contents":"文章内容"
          } 
      ]
      ```
  2. /api/article/getArticle?id=100022   根据获取某一篇文章
      ```json
      /api/article/articleList
      params:{
          "pageNo":1,//页码,
          "pageSize":10,//
      }
      1.文章列表：
      data:[
          {
              "userName":"abner",
              "articleId":"10027",
              "title":"标题",
              "createTime":"",
              "updateTime":"",
              "description":"文章描述",
              "contents":"文章内容"
          }
      ]
      ```
  3. /api/article/getArticlebyUser?id=1   获取某一作者的所有右文章篇文章
  4. /api/article/addArticle   添加文章
  5. /api/article/upDateArticle   更新文章
  6. /api/article/removeArticle   删除文章
  
### 2. 用户信息
  1. /api/users/userinfo?id=
      ```json
        data:{
        "userId": 123,  //用户id
        "userName": "Abner",    //用户名
        "sex": 1,               //性别
        "phone": "123123123123",    //电话
        "id": 100001,           
        "contents": "文章内容"
        },
      ```

## 接口 code定义

1.接口有返回的情况，根据服务器返回的数据情况 业务code
> 0     数据获取成功 
> 500   数据获取异常
