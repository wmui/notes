# HTTP协议

## 常用状态码

200 请求成功并返回所需资源
301 资源永久重定向，浏览器会缓存资源的新地址
302 资源临时重定向，浏览器不会缓存新的资源地址，每次都会执行一次跳转
400 客户端请求有语法错误
401 未授权的请求
403 服务端收到请求，但是拒绝提供服务
404 资源不存在
500 服务端发生错误
503 服务端无法处理当前请求，可能过段时间会正常

[更多状态码](https://www.zhihu.com/question/58686782/answer/159603453)

## RESTful

[理解RESTful架构](https://www.ruanyifeng.com/blog/2011/09/restful.html)

[RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)

## URI

URI(Uniform Resource Identifier)称为统一资源标识符，它有两个主要的子集URL和URN构成。

### URL

统一资源定位符（URL），它指定了所标识资源的可用位置和检索机制。URL 不一定是 `HTTP URL(http://)`，也可以以`ftp://`或`smb://` 开头，指定用于获取资源的协议。

```js
URL: ftp://ftp.is.co.za/rfc/rfc1808.txt
URL: http://www.ietf.org/rfc/rfc2396.txt
URL: mailto:John.Doe@example.com
URL: telnet://192.0.2.16:80/
```

URL由以下几部分组成

```html
<scheme>://<user>:<password>@<host>:<port>/<path>:<params>?<query>#<frag>
<!-- 示例 -->
ftp://root:asdf@example.com:3000/test
```

### URN

统一资源名称(URN) ，它只是标识了资源的名称，对于资源的可用性和位置是不知道的。格式为`urn: <NID> : <NSS>`，其中`<NID>`是命名空间标识符，而`<NSS>`是命名空间特定字符串。一个常见的例子是书籍的ISBN号

```js
urn:isbn:0-486-27557-4
urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66
```


## CSRF

CSRF跨站请求伪造

**原理：** 已登录的用户在进行form表单提交时，即使跨域了也会自动携带cookie。利用这一点，黑客可以通过邮件发送一个自定义的表单让用户点击，表单提交地址为原网站某个接口地址，进而实现跨站请求。

**解决方法：** 后端渲染表单时在表单上加一个由算法生成的token，表单提交到后端后，验证这个token，伪造的表单是无法伪造token的。

## CORS

CORS(Cross-Origin Resource Sharing)跨源资源共享，定义了在访问跨源资源时，浏览器与服务器应该如何沟通。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

浏览器将CORS请求分成两类：简单请求(simple request)和非简单请求(not-so-simple request)

### 简单请求

简单请求其实就是传统的表单提交，不会触发预检请求，满足以下两个条件的就是简单请求：

1. 请求方式是`GET、POST、HEAD`中的一种
2. Content-Type是`application/x-www-form-urlencoded、multipart/form-data、text/plain`中的一种，并且不能包含自定义头部


### 非简单请求

不满足上面条件的都是非简单请求，非简单请求在发出前浏览器会先发送预检请求，预检请求头部信息中会额外附加一个origin字段，其中包含请求页面的源信息(协议、域名和端口)，以便服务器根据这个头部信息来决定是否给予响应。

服务器通过设置`Access-Control-Allow-Origin`头部决定是否响应请求，如果包含请求的源，表示接受请求（如果允许任何源来请求，可以设置为`*` ），如果中不包含请求的源，浏览器会抛出错误被XMLHttpRequest的onerror回调函数捕获。

### 预检请求

预检请求是浏览器在跨域请求资源时，自动发送的`options`请求，发送这个请求后，服务器可以决定是否允许这种类型的请求。

```js
Access-Control-Allow-Origin:与请求Origin相同，表示允许

Access-Control-Allow-Methods:允许的方法，多个方法以逗号分隔

Access-Control-Allow-Headers:允许的头部，多个头部以逗号分隔

Access-Control-Max-Age:应该将这个预见请求缓存多长时间(以秒表示)
```

### 带凭证请求

默认情况下，跨源请求不提供凭据`cookie`，但是通过将`withCredentials`属性设置为true，指定某个请求应该发送凭据，

```js
// 服务端设置
Access-Control-Allow-Credentials: true

// 客户端设置
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

**注意：**如果要发送`Cookie`，`Access-Control-Allow-Origin`就不能设为`*`，必须指定明确的、与请求网页一致的域名，且`cookie`遵循同源策略。

## CSP

CSP（Content-Security-Policy）内容安全策略，主要用于预防常见的Web攻击，通过设置`Content-Security-Policy`，控制浏览器可以为该页面获取哪些资源。它就像一个白名单，只有白名单上写的资源才会加载。


**方式一：**在HTTP响应报文中设置`Content-Security-Policy`

```js
Content-Security-Policy: script-src 'self' 'unsafe-inline'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:
```

**方式二：**使用`meta`标签

```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
```

[查看CSP文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 缓存

缓存是性能优化的重要手段，合理使用缓存，不仅能够节省服务器资源，更能为用户提供好的浏览体验

### Cache-Control

```js
public: 允许HTTP请求经过的任何地方缓存

private： 只允许发起请求的浏览器进行缓存

no-cache：允许使用本地和代理服务器缓存，但要求在返回缓存的版本之前将请求提交到源头服务器进行验证

no-store: 不允许本地和代理服务器缓存，必须要到源服务器请求最新资源（即使本地或代理服务器有缓存）

no-transform: 不允许缓存服务器对资源进行转换（比如压缩）

max-age=：表示允许浏览器缓存多少秒，指定时间内不向服务器发送资源请求

s-maxage=：表示允许代理服务器缓存多少秒。如果同时设置了max-age和s-maxage，浏览器会根据max-age进行缓存，代理服务器会根据s-maxage进行缓存

must-revalidate：如果缓存过期了，浏览器必须要到源服务器发送请求

proxy-revalidate：如果缓存过期了，缓存服务器必须要到源服务器发送请求
```

```js
// 浏览器和代理服务器对资源缓存一年，并且每次请求都到服务器器去验证
Cache-Control: max-age=31536000, no-cache
```


### Etag

服务端在返回资源时先基于某种算法计算出资源的唯一值（比如hash），然后设置到ETag里，下次请求时浏览器会自动带上`If-None-Match: <ETag-value>`，服务器通过判断Etag值决定是否返回新的资源，过期了的话就返回 200 带上新的内容，否则返回 304，让浏览器拿缓存。


## 网页渲染流程

当在地址栏输入url后，发生了什么？资源从请求发出到渲染结束的整个过程如下：

1. 根据域名，找到DNS服务器，找到DNS上记录的域名IP
2. 浏览器和服务器建立`TCP/IP`链接（三次握手）
3. 浏览器向服务器发送HTTP请求
4. 服务器处理请求并返回资源
5. 浏览器接收资源并渲染页面
6. 服务器发送完资源，请求断开链接（四次挥手）

三次握手建立链接：
 - 浏览器发送请求建立链接（发送SYN）
 - 服务器收到请求，也请求与浏览器建立链接（接收SYN，发送ACK）
 - 浏览器收到请求，链接建立成功（接收ACK）

四次挥手断开链接：
 - 服务器发送完资源后，请求断开链接（发送FIN）
 - 浏览器收到请求后，表示我知道了（此时浏览器可能还没接收完数据，发送ACK）
 - 浏览器接收完数据，表示可以断开了（发送FIN）
 - 服务器端收到请求，表示我断开了（发送ACK）


## OSI网络模型

标准的OSI网络模型是七层，实际使用通常是五层模型。

```
应用层
    - 软件的层面，浏览器 服务器都属于应用层
传输层
    - 负责对数据进行拆分，把大数据拆分为一个一个小包
网络层
    - 负责给数据包，添加信息
数据链路层
    - 传输信息
物理层
    - 把电脑连接起来的物理手段，如光缆、电缆、双绞线、无线电波等
```
