# API接口文档 v1.0

## 1、 公共参数

公共参数（Header）是用于标识产品及接口鉴权的参数，每次请求均需要携带这些参数：

参数名称				|类型		|出现要求	|描述  
:----				|:---		|:------	|:---	
Token				|string		|R			|用户登录后token，没有登录则为空字符串
Version				|string		|R			|接口版本号
SystemId			|int		|R			|机构号，请求的系统Id
Timestamp			|long		|R			|当前UNIX时间戳

请求示例：

```
{
    "Header":{
        "Token":"2366CF921FAD44CCBB07FF9CD02FC90E",
        "Version":"3.2.0",
        "SystemId":1001,
        "Timestamp":1502870664
    }
}

```

## 2、 密码登录
- **接口说明：** 密码登录
- **接口地址：** /login
- **请求方式：** post

### 1.1 请求参数
  
参数名称				 |类型		  |出现要求	 |描述  
:----				    |:---		|:------	|:---	
username				|string		|R			|登录名
password				|string		|R			|密码


请求示例：

```
{
    "username":"18520322032",
    "password":"acb000000"
}

```
返回示例：

```
{
    "code":200,
    "msg":"登录成功",
    "data":{
        "userId":"7D916C7283434955A235C17DD9B71C64"
    }
}
```

## 3、 个人信息获取
- **接口说明：** 个人信息获取
- **接口地址：** /user/detail
- **请求方式：** get

### 1.1 请求参数
  
参数名称				 |类型		  |出现要求	 |描述  
:----				    |:---		|:------	|:---	
无


返回示例：

```
{
    "code":200,
    "msg":"请求成功",
    "data":{
        "username":"name"
        "roles":"1"
        ""
    }
}
```
