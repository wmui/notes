# JavaScript DOM

## document对象

```js
document对象
- document对象表示的是整个网页
- document对象的原型链
    HTMLDocument -> Document -> Node -> EventTarget -> Object.prototype -> null
- 凡是在原型链上存在的对象的属性和方法都可以通过Document去调用
- 部分属性：
    document.documentElement --> html根元素
    document.head --> head元素
    document.title --> title元素
    document.body --> body元素
    document.links --> 获取页面中所有的超链接
```

## 元素节点

```js
元素节点对象（element）
- 在网页中，每一个标签都是一个元素节点
- 如何获取元素节点对象？
    1. 通过document对象来获取元素节点
    2. 通过document对象来创建元素节点
- 通过document来获取已有的元素节点：
    document.getElementById()
        - 根据id获取一个元素节点对象
    document.getElementsByClassName()
        - 根据元素的class属性值获取一组元素节点对象
        - 返回的是一个类数组对象
        - 该方法返回的结果是一个实时更新的集合
            当网页中新添加元素时，集合也会实时的刷新
    document.getElementsByTagName()
        - 根据标签名获取一组元素节点对象
        - 返回的结果是可以实时更新的集合
        - document.getElementsByTagName("*") 获取页面中所有的元素
    document.getElementsByName()
        - 根据name属性获取一组元素节点对象
        - 返回一个实时更新的集合
        - 主要用于表单项
    document.querySelectorAll()
        - 根据选择器去页面中查询元素
        - 会返回一个类数组（不会实时更新）
    document.querySelector()
        - 根据选择器去页面中查询第一个符合条件的元素

- 创建一个元素节点
    document.createElement()
        - 根据标签名创建一个元素节点对象

```

```js
div元素的原型链
    HTMLDivElement -> HTMLElement -> Element -> Node -> ...

通过元素节点对象获取其他节点的方法
    element.childNodes 获取当前元素的子节点（会包含空白的子节点）
    element.children 获取当前元素的子元素
    element.firstChild 获取元素的第一个子元素（会包含空白的子元素）
    element.firstElementChild 获取当前元素的第一个子元素
    element.lastElementChild 获取当前元素的最后一个子元素
    element.nextElementSibling 获取当前元素的下一个兄弟元素
    element.previousElementSibling 获取当前元素的前一个兄弟元素
    element.parentNode 获取当前元素的父节点
    element.tagName 获取当前元素的标签名
```

## 文本节点

```js
在DOM中，网页中所有的文本内容都是文本节点对象，可以通过元素来获取其中的文本节点对象，但是我们通常不会这么做，我们可以直接通过元素去修改其中的文本

修改文本的三个属性
    element.textContent 获取或修改元素中的文本内容
        - 获取的是标签中的内容，不会考虑css样式

    element.innerText 获取或修改元素中的文本内容
        - innerText获取内容时，会考虑css样式
        - 通过innerText去读取CSS样式，会触发网页的重排（计算CSS样式）
        - 当字符串中有标签时，会自动对标签进行转义
        - <li> --> &lt;li&gt;

    element.innerHTML 获取或修改元素中的html代码
        - 可以直接向元素中添加html代码
        - innerHTML插入内容时，有被xss注入的风险（跨站脚本）
```

```js
const box1 = document.getElementById("box1")

box1.innerText = "xxxx"
box1.textContent = "新的内容"
// xss注入
box1.innerHTML = "<script src='https://sss/sss.js'></script>"
```

## 属性节点

```js
 属性节点（Attr）
    - 在DOM也是一个对象，通常不需要获取对象而是直接通过元素即可完成对其的各种操作
    - 如何操作属性节点：
        方式一：
            读取：元素.属性名（注意，class属性需要使用className来读取）
                    读取一个布尔值时，会返回true或false

            修改：元素.属性名 = 属性值

        方式二：
            读取：元素.getAttribute(属性名)

            修改：元素.setAttribute(属性名, 属性值)

            删除：元素.removeAttribute(属性名)
```


```html
<input type="text" disabled id="number" value="haha" />
<script>
    let btn = document.querySelector('#number')
    console.log(btn.disabled, btn.value, btn.type)
    btn.value = 'xixi'
    btn.disabled = false
    // 任意字符串都可以禁用，通常写作disabled
    btn.setAttribute("disabled", "disabled")
    btn.removeAttribute('disabled')
</script>
```

## 事件绑定

```js
事件（event）
- 事件就是用户和页面之间发生的交互行为
    比如：点击按钮、鼠标移动、双击按钮、敲击键盘、松开按键...  
- 可以通过为事件绑定响应函数（回调函数），来完成和用户之间的交互
- 绑定响应函数的方式：
    1.可以直接在元素的属性中设置
    2.可以通过为元素的指定属性设置回调函数的形式来绑定事件（一个事件只能绑定一个响应函数）
    3.可以通过元素addEventListener()方法来绑定事件
```

```js
const btn = document.getElementById("btn")
// 为按钮对象的事件属性设置响应函数，后面的会覆盖前面的
// btn.onclick = function(){
//     alert("我又被点了一下~~")
// }

// btn.onclick = function(){
//     alert("1123111")
// }

btn.addEventListener("click", function(){
    alert("哈哈哈")
})

btn.addEventListener("click", function(){
    alert("嘻嘻嘻")
})
```

## 文档加载

```js
 网页是自上向下加载的，如果将js代码编写到网页的上边，
    js代码在执行时，网页还没有加载完毕，这时会出现无法获取到DOM对象的情况

    window.onload 事件会在窗口中的内容加载完毕之后才触发（如果有iframe，会等待iframe）
    document的DOMContentLoaded事件会在当前文档加载完毕之后触发（如果有iframe，不会等待iframe）

    如何解决这个问题：
        1. 将代码编写到window.onload的回调函数中
        2. 将代码编写到document对象的DOMContentLoaded的回调函数中（执行时机更早）
        3. 将代码编写到外部的js文件中，然后以defer的形式进行引入（执行时机更早，早于DOMContentLoaded）（*****）
        4. 将script标签编写到body的最后（执行时机最早）
```

虽然执行时机有早晚，但差异很小可忽略

```js
 window.onload = function () {
    const btn = document.getElementById("btn")
    console.log(btn)
}

window.addEventListener("load", function () {
    const btn = document.getElementById("btn")
    alert(btn)
})
```

```js
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn")
    alert(btn)
})
```

```html
<head>
    <script defer src="./script/script.js"></script>
</head>
```

## DOM修改

点击按钮后，向ul中添加一个唐僧

```html
<button id="btn01">按钮1</button>
<ul id="list">
    <li id="swk">孙悟空</li>
    <li id="zbj">猪八戒</li>
    <li id="shs">沙和尚</li>
</ul>

<script>
    const list = document.getElementById("list")
    const btn01 = document.getElementById("btn01")
    btn01.onclick = function () {
        // 创建一个li
        const li = document.createElement("li")
        li.textContent = "唐僧"
        li.id = "ts"

        // appendChild() 用于给一个节点添加子节点
        list.appendChild(li)
    }
</script>
```

使用insertAdjacentElement向元素的任意位置添加元素

```html
两个参数：
    1.要添加的位置 
      beforebegin 开始标签之前
      afterbegin 开始标签之后
      beforeend 结束标签之前
      afterend 结束标签之后
    2.要添加的元素

<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

```html
<button id="btn01">按钮1</button>
<ul id="list">
    <li id="swk">孙悟空</li>
    <li id="zbj">猪八戒</li>
    <li id="shs">沙和尚</li>
</ul>

<script>
    const list = document.getElementById("list")
    const btn01 = document.getElementById("btn01")
    btn01.onclick = function () {
        const li = document.createElement("li")
        li.textContent = "蜘蛛精"
        li.id = "zzj
        list.insertAdjacentElement("afterend", li)
    }
</script>
```

使用insertAdjacentHTML直接插入html，不用手动创建元素
使用insertAdjacentText直接插入文本，不用手动创建

```js
list.insertAdjacentHTML("beforeend", "<li id='bgj'>白骨精</li>")

// 会自动转义
list.insertAdjacentText("beforeend", "<li id='bgj'>白骨精</li>")
```

remove()方法用来删除当前元素

```js
const swk = document.getElementById("swk")
swk.remove()
```

replaceWith() 使用一个元素替换当前元素

```js
const li = document.createElement("li")
li.textContent = "蜘蛛精"
li.id = "zzj

const swk = document.getElementById("swk")
swk.replaceWith(li)
```

cloneNode() 方法对节点进行复制，它会复制节点的所有特点包括各种属性

这个方法默认只会复制当前节点，而不会复制节点的子节点

可以传递一个true作为参数，这样该方法也会将元素的子节点一起复制

```js
const list = document.getElementById("list")
const swk = document.getElementById("swk")

const newLi = l1.cloneNode(true) // 用来对节点进行复制的
list.appendChild(newLi)
```

## CSS样式修改

直接使用`element.style`属性读取和修改

```js
// 修改样式的方式：元素.style.样式名 = 样式值
// 如果样式名中含有-，则需要将样式表修改为驼峰命名法
// background-color --> backgroundColor
box1.style.width = "400px"
box1.style.height = "400px"
box1.style.backgroundColor = "yellow"
```

使用getComputedStyle()获取计算后样式

```js
getComputedStyle()
- 它会返回一个对象，这个对象中包含了当前元素所有的生效的样式
- 参数：
    1. 要获取样式的对象
    2. 要获取的伪元素
- 返回值：
    返回的一个对象，对象中存储了当前元素的样式

- 注意：
    样式对象中返回的样式值，不一定能来拿来直接计算
        所以使用时，一定要确保值是可以计算的才去计算
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      #box {
        width: 100px;
        height: 100px;
        background-color: red;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div id="box"></div>
    <script>
      let box = document.querySelector('#box')
      let obj = getComputedStyle(box)
      //   100px  0px 307.5px
      //   这里的auto返回的是计算后的值
      console.log(obj.width, obj.margin)
    </script>
  </body>
</html>
```

读取盒模型相关的大小

```js
元素.height
元素.width
    - 获取元素内部的宽度和高度（内容区）

元素.clientHeight
元素.clientWidth
    - 获取元素内部的宽度和高度（包括内容区和内边距）

元素.offsetHeight
元素.offsetWidth
    - 获取元素的可见框的大小（包括内容区、内边距和边框）

元素.scrollHeight
元素.scrollWidth
    - 获取元素滚动区域的大小

元素.offsetParent
    - 获取元素的定位父元素
    - 定位父元素：离当前元素最近的开启了定位的祖先元素，
        如果所有的元素都没有开启定位则返回body

元素.offsetTop
元素.offsetLeft
    - 获取元素相对于其定位父元素的偏移量（边框到边框）

元素.scrollTop
元素.scrollLeft
    - 获取或设置元素滚动条的偏移量
```

通过`.classList`修改类名，这种修改样式的方式也是比较推荐的做法

元素.classList 是一个对象，对象中提供了对当前元素的类的各种操作方法

```js
元素.classList.add() 向元素中添加一个或多个class
元素.classList.remove() 移除元素中的一个或多个class
元素.classList.toggle() 切换元素中的class
元素.classList.replace() 替换class
元素.classList.contains() 检查class
```

```js
box1.classList.add("box2", "box3", "box4")
box1.classList.add("box1")

box1.classList.remove("box2")
box1.classList.toggle("box2")
box1.classList.replace("box1", "box2")

let result = box1.classList.contains("box3")
```

## 事件对象

### event

在DOM中存在着多种不同类型的事件对象，多种事件对象有一个共同的祖先 Event

```js
 - 事件对象是有浏览器在事件触发时所创建的对象，
    这个对象中封装了事件相关的各种信息
- 通过事件对象可以获取到事件的详细信息
    比如：鼠标的坐标、键盘的按键..
- 浏览器在创建事件对象后，会将事件对象作为响应函数的参数传递，
    所以我们可以在事件的回调函数中定义一个形参来接收事件对象
```


### 常用属性和方法

- event.target 触发事件的对象
- event.currentTarget 绑定事件的对象（同this）
- event.stopPropagation() 停止事件的传导，事件冒泡和事件捕获
- event.preventDefault() 取消默认行为

### 事件冒泡

- 事件的冒泡就是指事件的向上传到
- 当元素上的某个事件被触发后，其祖先元素上的相同事件也会同时被触发
- 冒泡的存在大大的简化了代码的编写，但是在一些场景下我们并不希望冒泡存在
    - 不希望事件冒泡时，可以通过事件对象来取消冒泡


### 事件委派

委派就是将本该绑定给多个元素的事件，统一绑定给document，这样可以降低代码复杂度方便维护

```js
<button id="btn">点我一下</button>

<ul id="list">
    <li><a href="javascript:;">链接一</a></li>
    <li><a href="javascript:;">链接二</a></li>
    <li><a href="javascript:;">链接三</a></li>
    <li><a href="javascript:;">链接四</a></li>
</ul>

const list = document.getElementById("list")
const links = list.getElementsByTagName("a")


document.addEventListener("click", (event) => {
    // 在执行代码前，先来判断一下事件是由谁触发
    // 检查event.target 是否在 links 中存在

    // console.log(Array.from(links))

    if([...links].includes(event.target)){
        alert(event.target.textContent)
    }                
})

// 点击按钮后，在ul中添加一个新的li
const btn = document.getElementById("btn")
btn.addEventListener("click", () => {
    list.insertAdjacentHTML(
        "beforeend",
        "<li><a href='javascript:;'>新超链接</a></li>"
    )
})
```

### 事件捕获

```js
事件的传播机制：
- 在DOM中，事件的传播可以分为三个阶段：
    1.捕获阶段 （由祖先元素向目标元素进行事件的捕获）（默认情况下，事件不会在捕获阶段触发）
    2.目标阶段 （触发事件的对象）
    3.冒泡阶段 （由目标元素向祖先元素进行事件的冒泡）
- eventPhase 表示事件触发的阶段
  - 1 捕获阶段 2 目标阶段 3 冒泡阶段

- 事件的捕获，指事件从外向内的传导，
    当前元素触发事件以后，会先从当前元素最大的祖先元素开始向当前元素进行事件的捕获

- 如果希望在捕获阶段触发事件，可以将addEventListener的第三个参数设置为true
    一般情况下我们不希望事件在捕获阶段触发，所有通常都不需要设置第三个参数
```

