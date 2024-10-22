# JavaScript BOM

- 浏览器对象模型
- BOM为我们提供了一组对象，通过这组对象可以完成对浏览器的各种操作
- BOM对象：
    - Window —— 代表浏览器窗口（全局对象）
    - Navigator —— 浏览器的对象（可以用来识别浏览器）
    - Location —— 浏览器的地址栏信息
    - History —— 浏览器的历史记录（控制浏览器前进后退）
    - Screen —— 屏幕的信息

- BOM对象都是作为window对象的属性保存的，所以可以直接在JS中访问这些对象

## Navigator

Navigator浏览器的对象，可以读取操作系统的很多功能，如蓝牙、剪切板，系统信息等。

开发中比较常用的是一个属性是 `userAgent`，返回一个用来描述浏览器信息的字符串

```js
navigator.userAgent
```

## Location

location 表示的是浏览器地址栏的信息

- 可以直接将location的值修改为一个新的地址，这样会使得网页发生跳转
- location.assign() 跳转到一个新的地址
- location.replace() 跳转到一个新的地址（无法通过回退按钮回退）
- location.reload() 刷新页面，可以传递一个true来强制清缓存刷新
- location.href 获取当前地址

## History

操作浏览器历史记录

```js
history.back()
    - 回退按钮
history.forward()
    - 前进按钮
history.go()
    - 可以向前跳转也可以向后跳转
```

## 定时器

通过定时器，可以使代码在指定时间后执行

```js
 - 设置定时器的方式有两种：
setTimeout()
    - 参数：
        1. 回调函数（要执行的代码）
        2. 间隔的时间（毫秒）
    - 关闭定时器
        clearTimeout()

setInterval() (每间隔一段时间代码就会执行一次)
    - 参数：
        1. 回调函数（要执行的代码）
        2. 间隔的时间（毫秒）
    - 关闭定时器
        clearInterval()
```

