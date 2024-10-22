# 正则表达式

## 基础

```js
正则表达式
    - 正则表达式用来定义一个规则
    - 通过这个规则计算机可以检查一个字符串是否符合规则
        或者将字符串中符合规则的内容提取出来
    - 正则表达式也是JS中的一个对象，
        所以要使用正则表达式，需要先创建正则表达式的对象
```

```js
// new RegExp() 可以接收两个参数（字符串） 1.正则表达式 2.匹配模式
// 通过构造函数来创建一个正则表达式的对象
let reg = new RegExp("a", "i") 

// 使用字面量来创建正则表达式：/正则/匹配模式
reg = /a/i
```


```js
// 转义字符
let reg = /\w/

// 对象形式的转义字符要用双反斜杠
// 这是因为在字符串中，反斜杠本身是一个特殊字符，比如：'\r'回车，'\n'换行
// 因此需要双重反斜杠来表示正则表达式中的单个反斜杠。
reg = new RegExp("\\w")
```

:::tip 
'\r'是回车，'\n'是换行，前者使光标到行首，后者使光标下移一格。 通常用的Enter 是两个加起来。 有的编辑器只认\r\n，有的编辑器则两个都认。 所以要想通用的话，最好用\r\n 换行
:::

## 语法

```js
1. 在正则表达式中大部分字符都可以直接写
2.| 在正则表达式中表示或
3.[] 表示或（字符集）
    [a-z] 任意的小写字母
    [A-Z] 任意的大写字母
    [a-zA-Z] 任意的字母
    [0-9]任意数字
4.[^] 表示除了
    [^x] 除了x
5. . 表示除了换行外的任意字符
6. 在正则表达式中使用\作为转义字符
7. 其他的字符集
    \w 任意的单词字符 [A-Za-z0-9_]
    \W 除了单词字符 [^A-Za-z0-9_]
    \d 任意数字 [0-9]
    \D 除了数字 [^0-9]
    \s 空格
    \S 除了空格
    \b 单词边界
    \B 除了单词边界
8. 开头和结尾
    ^ 表示字符串的开头
    $ 表示字符串的结尾
```

```js
let re = /abc|bcd/  // 匹配abc或bcd

re = /[a-z]/  // 匹配a-z中任意一个字符

re = /[A-Z]/  // 匹配A-Z中任意一个字符

re = /[A-Za-z]/  // 匹配任意一个大写小写字符

re = /[a-z]/i // 匹配模式i表示忽略大小写

re = /[^a-z]/ // 匹配包含小写字母以外内容的字符串

re = /./ // 匹配.字符

re = /\./  

re = /\w/

re = /^a/ // 匹配开始位置的a

re = /a$/ // 匹配结束位置的a

re = /^a$/ // 只匹配字母a，完全匹配，要求字符串必须和正则完全一致

re = /^abc$/


let result = re.test('aa')

console.log(result)
```

## 量词

```js
{m} 正好m个
{m,} 至少m个
{m,n} m-n个
+ 一个以上，相当于{1,}
* 任意数量，相等于{0,}
? 0-1次，相当于 {0,1}
```

```js
let re = /a{3}/

re = /^a{3}$/

re = /^(ab){3}$/

re = /^[a-z]{3}$/

re = /^[a-z]{1,}$/

re = /^[a-z]{1,3}$/

re = /^ba+$/

re = /^ba*$/

re = /^ba?$/

let result = re.test("baa")

console.log(result)
```

## test方法

判断正则表达式是否能匹配内容

## exec方法

获取字符串中符合正则表达式的内容，返回第一次匹配到内容，返回值是类数组对象。

可以通过循环获取到所有匹配的内容。

```js
let str = "abcaecafcacc"

// 提取出str中符合axc格式的内容，g表示全局匹配
let re = /a[a-z]c/ig
let result = re.exec(str)
while(result) {
  console.log(result)
  result = re.exec(str)
}
```

使用`()`可以进行组匹配，类数组对象中包含组匹配的内容

```js
let str = "abcaecafcacc"

let re = /a([a-z]c)/ig
let result = re.exec(str)
while(result) {
  console.log(result)
  result = re.exec(str)
}
```

## 示例

把字符串中的手机号，中间四位换成*

```js
let str = "dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadsd"
// let re = /1[3-9]\d{9}/g
let re = /(1[3-9]\d)\d{4}(\d{4})/g

let result

while (result = re.exec(str)) {
    console.log(result[1]+"****"+result[2])
}
```

手机号格式验证

```js
let re = /^1[3-9]\d{9}$/

console.log(re.test("13456789042"))
```