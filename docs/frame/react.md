# React

React是一个用于动态构建用户界面的JavaScript库

## 简单使用

1. react.js：React 核心库。
2. react-dom.js：提供操作 DOM 的 react 扩展库。
3. babel.min.js：解析 JSX 语法代码转为 JS 代码的库

在页面中引入库文件，development版方便开发模式下看调试信息

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./react.development.js"></script>
    <script src="./react-dom.development.js"></script>
    <script src="./babel.min.js"></script>
</head>
<body>
    <!-- 挂载根节点 -->
    <div id="test"></div>


    <script type="text/babel">
        const VDOM = <h1 id="title">hello world</h1>
        ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
</body>
</html>
```

除了上面这种写法，也可以通过createElement方法创建jsx，相当于babel编译后的结果

```js
  <script type="text/javascript">
        const VDOM = React.createElement('h1', {id: 'title'}, 'hello world')
        ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
```

虚拟DOM和真实DOM的区别：虚拟DOM的本质是一个Object类型的对象，虚拟DOM相比较真实DOM来说，因为没有真实DOM上那么多属性，显得较轻量。虚拟DOM是React内部在用，最终会被React转化为真实DOM，呈现在页面上

## JSX语法

JSX用于定义虚拟DOM，在语法层面有以下几点需要注意：

1.定义虚拟DOM时，不要写引号。
2.标签中混入JS表达式时要用`{}`。
3.样式的类名指定不要用class，要用className。
4.内联样式，要用`style={{key:value}}`的形式去写，key用驼峰形式。
5.只有一个根标签
6.标签必须闭合
7.标签首字母
 - .若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
 - .若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

注意区分JS表达式和JS语句：

JS表达式会产生一个值，可以放在任何一个需要值的地方，比如：

```
(1). a
(2). a+b
(3). demo(1)
(4). arr.map() 
(5). function test () {}
```

JS语句是纯粹的逻辑代码，比如：

```
(1).if(){}
(2).for(){}
(3).switch(){case:xxxx}
```

## 定义组件

组件是包含结构（html）、样式（css）和功能（js）的模块。

### 函数式组件

```js
function MyComponent(){
    //此处的this是undefined，因为babel编译后开启了严格模式
    console.log(this);
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
// 渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
```

render流程：
1. React解析组件标签，找到了MyComponent，发现是一个自定义组件。
2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。

### 类式组件

```js
//1.创建类式组件
class MyComponent extends React.Component {
    render(){
        // this是MyComponent的实例对象。
        console.log('render中的this:',this);
        return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    }
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>, document.getElementById('test'))
```
render流程：
1. React解析组件标签，找到了MyComponent组件。
2. 发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
3. 将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。

## 组件实例的三大属性

### state

state对象数据的状态

```js
class Weather extends React.Component{
    constructor(props){
        super(props)
        //初始化状态
        this.state = {isHot:false,wind:'微风'}

        //解决changeWeather中this指向问题
        this.changeWeather = this.changeWeather.bind(this)
    }

    //render调用1+n次，1是初始化的那次 n是状态更新的次数
    render(){
        console.log('render');
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

    //changeWeather点几次调几次
    changeWeather(){
        // 类中的方法默认开启了局部的严格模式，所以changeWeather中的this要么是undefined要么是组件实例；由于changeWeather是作为onClick的回调，所以不是通过实例调用的，这就导致了this不会指向实例
        console.log('changeWeather:', this);

        const isHot = this.state.isHot

        //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
        this.setState({isHot:!isHot})

        //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
        //this.state.isHot = !isHot //这是错误的写法
    }
}
ReactDOM.render(<Weather/>,document.getElementById('test'))
```

简写形式：

```js
class Weather extends React.Component{
    //初始化状态
    state = {isHot:false,wind:'微风'}

    render(){
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

    //自定义方法————要用赋值语句的形式+箭头函数
    changeWeather = ()=>{
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
    }
}
ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### props

props用于向组件传递数据

```js
//创建组件
class Person extends React.Component{
    render(){
        const {name,age,sex} = this.props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

const p = {name:'老刘',age:18,sex:'女'}
// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test'))
// 两种写法是等价的，...是JSX的语法糖，不是对象解构
ReactDOM.render(<Person {...p}/>,document.getElementById('test'))
```

使用prop-types库，可以对props数据进行限制

```js
class Person extends React.Component{
    render(){
        const {name,age,sex} = this.props
        //此行代码会报错，因为props是只读的
        //this.props.name = 'jack' 
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

//对标签属性进行类型、必要性的限制
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
    speak:PropTypes.func,//限制speak为函数
}

//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}

function speak(){
    console.log('我说话了');
}

const p = {name:'老刘',age:18,sex:'女', speak}
ReactDOM.render(<Person {...p}/>,document.getElementById('test'))
```

因为propTypes和defaultProps是静态属性，因此可以简写成下面这样：

```js
class Person extends React.Component{
    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }
}
```

函数组件props

```js
function Person (props){
    const {name,age,sex} = props
    return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
            </ul>
        )
}
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test'))
```

### refs

refs用于获取DOM节点

方式一：字符串ref

```js

class Demo extends React.Component{
    showData = ()=>{
        // input1是DOM节点实例
        const {input1} = this.refs
        alert(input1.value)
    }
    render(){
        return(
            <div>
                <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo />,document.getElementById('test'))
```

方式二：回调函数ref

回调函数ref在render执行时会调用，完成绑定操作。

```js
class Demo extends React.Component{
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    render(){
        return(
            <div>
                <input ref={r => this.input1 = r} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            </div>
        )
    }
}
```

方式三：createRef函数

React.createRef调用后可以返回一个容器，用于存储被ref所标识的节点。

```js
class Demo extends React.Component{
    input1 = React.createRef()
    showData = (event)=>{
        // console.log(event.target);
        alert(this.input1.current.value)
    }
    render(){
        return(
            <div>
                <input ref={this.input1} type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            </div>
        )
    }
}
```

## 表单

### 受控组件

对表单类控件进行行为控制

```js
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存用户名到状态中
    saveUsername = (event)=>{
        this.setState({username:event.target.value})
    }

    //保存密码到状态中
    savePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```


### 非受控组件

不对表单类控件进行行为控制，组件默认就是非受控组件

```js
//创建组件
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```

### 高阶函数

如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

常见的高阶函数有：Promise、setTimeout、arr.map()等等

### 函数的柯里化

通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

```js
function sum(a){
    return(b)=>{
        return (c)=>{
            return a+b+c
        }
    }
}

const ret = a(1)(2)(3)
```

### 受控组件优化

通过函数颗粒化优化受控组件

```js
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    // 颗粒化函数
    saveFormData = (dataType) => {
        return (event) => {
            this.setState({[dataType]: event.target.value})
        }
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
                密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```


## key的作用

key是虚拟DOM对象的唯一标识，当数据状态变更时，用于进行新旧虚拟DOM对象的diffing计算。render只对diffing出的虚拟DOM进行更新。

当状态发生变化后，虚拟DOM进行diffing的规则：
1. 若虚拟DOM中内容没变, 直接使用之前的真实DOM
2. 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
3. 若虚拟DOM中未找到与新虚拟DOM相同的key，根据数据创建新的真实DOM，随后渲染到到页面

在进行遍历渲染时，通常不建议用index作为key值，因为在进行逆序添加、逆序删除等破坏顺序操作时，且组件用到了表单控件（表单控件值的变化不会被记录），会导致渲染错位，因为key值相同的组件直接复用原来的。

```js
class Person extends React.Component{
    state = {
        persons:[
            {id:1,name:'小张',age:18},
            {id:2,name:'小李',age:19},
        ]
    }

    add = ()=>{
        const {persons} = this.state
        const p = {id:persons.length+1,name:'小王',age:20}
        this.setState({persons:[p,...persons]})
    }

    render(){
        return (
            <div>
                <h2>展示人员信息</h2>
                <button onClick={this.add}>添加一个小王</button>
                <h3>使用index（索引值）作为key</h3>
                <ul>
                    {
                        this.state.persons.map((personObj,index)=>{
                            return <li key={index}>{personObj.name}---{personObj.age}<input type="text"/></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Person/>,document.getElementById('test'))
```

## 组件生命周期

生命周期表示组件从开始到卸载的整个过程中的一些重要节点。

### 旧版

![](../public/2_react.png)

#### 初始阶段

由ReactDOM.render()触发---初次渲染

1.	constructor()
2.	componentWillMount()
3.	render()
4.	componentDidMount()

componentDidMount，一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息

#### 更新阶段

由组件内部this.setSate()或父组件ReactDOM.render()触发

1.	shouldComponentUpdate()
2.	componentWillUpdate()
3.	render()
4.	componentDidUpdate()


#### 卸载阶段

componentWillUnmount() ，由ReactDOM.unmountComponentAtNode()触发，一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息。


#### 示例1

```js

class Count extends React.Component{

    //构造器
    constructor(props){
        console.log('constructor');
        super(props)
        //初始化状态
        this.state = {count:0}
    }

    //加1按钮的回调
    add = ()=>{
        //获取原状态
        const {count} = this.state
        //更新状态
        this.setState({count:count+1})
    }

    //卸载组件按钮的回调
    death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    //强制更新按钮的回调
    force = ()=>{
        this.forceUpdate()
    }

    //组件将要挂载的钩子
    componentWillMount(){
        console.log('componentWillMount');
    }

    //组件挂载完毕的钩子
    componentDidMount(){
        console.log('componentDidMount');
    }

    //组件将要卸载的钩子
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    //控制组件更新的“阀门”
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true
    }

    //组件将要更新的钩子
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    //组件更新完毕的钩子
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    render(){
        console.log('render');
        const {count} = this.state
        return(
            <div>
                <h2>当前求和为：{count}</h2>
                <button onClick={this.add}>点我+1</button>
                <button onClick={this.death}>卸载组件</button>
                <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
            </div>
        )
    }
}
```

#### 示例2

```js
//父组件A
class A extends React.Component{
	//初始化状态
	state = {carName:'奔驰'}

	changeCar = ()=>{
		this.setState({carName:'奥拓'})
	}

	render(){
		return(
			<div>
				<div>我是A组件</div>
				<button onClick={this.changeCar}>换车</button>
				<B carName={this.state.carName}/>
			</div>
		)
	}
}

//子组件B
class B extends React.Component{
	//组件将要接收新的props的钩子
	componentWillReceiveProps(props){
		console.log('B---componentWillReceiveProps',props);
	}

	//控制组件更新的“阀门”
	shouldComponentUpdate(){
		console.log('B---shouldComponentUpdate');
		return true
	}
	//组件将要更新的钩子
	componentWillUpdate(){
		console.log('B---componentWillUpdate');
	}

	//组件更新完毕的钩子
	componentDidUpdate(){
		console.log('B---componentDidUpdate');
	}

	render(){
		console.log('B---render');
		return(
			<div>我是B组件，接收到的车是:{this.props.carName}</div>
		)
	}
}

```


### 新版

![](../public/3_react.png)


#### 初始化阶段

由ReactDOM.render()触发---初次渲染

1.	constructor()
2.	getDerivedStateFromProps 
3.	render()
4.	componentDidMount()

#### 更新阶段

1.	getDerivedStateFromProps
2.	shouldComponentUpdate()
3.	render()
4.	getSnapshotBeforeUpdate
5.	componentDidUpdate()

#### 卸载阶段

componentWillUnmount()，由ReactDOM.unmountComponentAtNode()触发

#### 示例

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

class Count extends React.Component{
    state = {count:0}

    constructor(props){
        console.log('Count---constructor');
        super(props)
        //初始化状态
    }
    //加1按钮的回调
    add = ()=>{
        //获取原状态
        const {count} = this.state
        //更新状态
        this.setState({count:count+1})
    }

    //卸载组件按钮的回调
    death = ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    //强制更新按钮的回调
    force = ()=>{
        this.forceUpdate()
    }
    
    
    // 初始挂载执行一次，props/state改变n次，执行1+n次
    // 强制更新也会执行
    static getDerivedStateFromProps(props,state){
        console.log('getDerivedStateFromProps',props,state);
        return null
    }

    // 获取上次的更新快照，数据被componentDidUpdate钩子的最后一个参数接受
    // 初始时没有上次的快照，只要有快照就会执行。强制更新也会执行
    getSnapshotBeforeUpdate(){
        console.log('getSnapshotBeforeUpdate');
        return 'hello'
    }

    //组件挂载完毕的钩子
    componentDidMount(){
        console.log('Count---componentDidMount');
    }

    //组件将要卸载的钩子
    componentWillUnmount(){
        console.log('Count---componentWillUnmount');
    }

    //控制组件更新的“阀门”
    shouldComponentUpdate(){
        console.log('Count---shouldComponentUpdate');
        return true
    }

    //组件更新完毕的钩子
    componentDidUpdate(preProps,preState,snapshotValue){
        console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
    }
    
    render(){
        console.log('Count---render');
        const {count} = this.state
        return(
            <div>
                <h2>当前求和为：{count}</h2>
                <button onClick={this.add}>点我+1</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.death}>卸载组件</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
            </div>
        )
    }
}

class Demo extends React.Component {
    state = {
        count: 0,
    }
    
     change = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={ this.change}>click</button>
                <Count count={this.state.count}/>
            </div>
        )
    }
}

export default Demo
```

#### getSnapshotBeforeUpdate示例

保存列表停留在当前位置，不随着内容新增自动滚动到最顶部

```js
import React from 'react'


class NewsList extends React.Component{

    state = {newsArr:[]}

    componentDidMount(){
        setInterval(() => {
            //获取原状态
            const {newsArr} = this.state
            //模拟一条新闻
            const news = '新闻'+ (newsArr.length+1)
            //更新状态
            this.setState({newsArr:[news,...newsArr]})
        }, 1000);
    }

    getSnapshotBeforeUpdate(){
        // 上次列表高度
        return this.refs.list.scrollHeight
    }

    componentDidUpdate(preProps,preState,height){
        // 每次更新后，通过差值计算出新item的高度，然后在当前位置的基础上增加最新的item高度，这样无论如何滚动都只停留在当前位置
        this.refs.list.scrollTop += this.refs.list.scrollHeight - height
    }

    render(){
        return(
            <div className="list" ref="list">
                {
                    this.state.newsArr.map((n,index)=>{
                        return <div key={index} className="news">{n}</div>
                    })
                }
            </div>
        )
    }
}


export default NewsList
```



## 脚手架

react 提供了一个用于创建 react 项目的脚手架库: create-react-app，项目的整体技术架构为: react + webpack + es6 + eslint，使用脚手架开发的项目的特点: 模块化, 组件化, 工程化


### 创建项目

```sh
npx create-react-app demo
```

### 基础使用

```html title="public/index.html"
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>react</title>
	</head>
	<body>
		<div id="root"></div>
	</body>
</html>
```



```js title="src/App.jsx"
import React, { Component } from 'react'

export default class App extends Component {
	render() {
		return (
			<p>hello world</p>
		)
	}
}

```

```js title="src/index.js"
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


ReactDOM.render(<App/>, document.getElementById('root'))
```

## 样式模块化

样式模块化可用于解决编译后样式冲突问题
1. css使用module方式命名
2. 在jsx中import对应的css文件

```css components/demo/index.module.css
.title {
    color: red;
}
```

```jsx components/demo/index.jsx
import React, { Component } from 'react'
import demo from './index.module.css'
export default class Demo extends Component {
	render() {
		return (
			<p className={demo.title}>hello world</p>
		)
	}
}
```

## 配置代理

### 方式一

追加如下配置

```json title="package.json"
"proxy":"http://localhost:5000"
```
说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

### 方式二

1. 在src下创建配置文件setupProxy.js
2. 编写setupProxy.js配置具体代理规则


   ```js title="src/setupProxy.js"
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐

## pubsub-js发布订阅

```jsx
import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class Search extends Component {
	search = () => {
		PubSub.publish('SEARCH',{isFirst:false,isLoading:true})
	}
}
```

```jsx
import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class List extends Component {
	componentDidMount(){
		this.token = PubSub.subscribe('SEARCH',(_,stateObj)=>{
			this.setState(stateObj)
		})
	}

	// 卸载前取消订阅
	componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}
}
```

## setState

### 对象式的setState

`setState(stateChange, [callback])`

1.stateChange为状态改变对象(该对象可以体现出状态的更改)
2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

### 函数式的setState

`setState(updater, [callback])`

1.updater为返回stateChange对象的函数。
2.updater可以接收到state和props。
3.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

对象式的setState是函数式的setState的简写方式(语法糖)

**使用原则：**

> (1).如果新状态不依赖于原状态 ===> 使用对象方式
> (2).如果新状态依赖于原状态 ===> 使用函数方式
> (3).如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取

## lazyLoad

通过React的lazy函数配合`import()`函数动态加载路由组件，路由组件代码会被分开打包，在渲染对应路由时加载对应组件。




```js
import {lazy} from 'React'
const Login = lazy(()=>import('@/pages/Login'))

// 通过<Suspense>指定在加载得到路由打包文件前，显示一个自定义loading界面
<Suspense fallback={<h1>loading.....</h1>}>
	<Switch>
		<Route path="/xxx" component={Xxxx}/>
		<Redirect to="/login"/>
	</Switch>
</Suspense>
```

## hooks

Hook是React 16.8.0版本增加的新特性/新语法，可以让你在函数组件中使用 state 以及其他的React特性

### useState

React.useState()，让函数组件也可以有state状态, 并进行状态数据的读写操作

```js
const [xxx, setXxx] = React.useState(initValue) 
```

**参数:** 第一次初始化指定的值在内部作缓存
**返回值:** 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数

**setXxx()2种写法:**
setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

```js
export const Demo = function() {
	console.log('demo'); // 执行1+n次，第一次是初始化，n是点击次数
	const [count, setCount] = React.useState(0)
	function add() {
		setCount(count + 1)
	}
	return (
		<div>
			<p>{count}</p>
			<button onClick={add}>click</button>
		</div>
	)
}
```

### useEffect

Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)。

副作用函数：该函数执行会改变外部数据，是相对于纯函数而言的。
纯函数：该函数的执行不影响外部数据

副作用函数示例：

```js
let obj = {age: 19}
function add(o) {
    o.age += 1
}
add(obj)
console.log(obj)
```

```js
useEffect(() => { 
    // 在此可以执行任何带副作用操作，相当于componentDidMount，render时先执行一次
    // [stateValue]变化时也会执行，相当于componentDidUpdate()

    return () => { // 如果返回一个函数，会在组件卸载前执行
        // 在此做一些收尾工作, 比如清除定时器/取消订阅等，相当于componentWillUnmount
    }
}, [stateValue]) //如果不指定，监视所有的state的变化； 如果指定的是[]，相当于不监视任何state变化； 如果有指定具体state值，那么只监视指定的值的变化
```
**参数：** 第一个参数是一个函数，用于执行任何带副作用的操作；第二个参数要监视变化的数据数组。

```js
//  该组件每隔一秒加一
export const Demo = function() {
	const [count, setCount] = React.useState(0)

    // 卸载组件
    function remove() {
        ReactDOM.unmountComponentAtNode(document.getyElementById('root'))
    }
    React.useEffect(() => {
        let timer = setInterval(() => {
            setCount(count + 1)
        }, 1000)

        // 卸载组件前清楚定时器
        return () => {
            clearInterval(timer)
        }
    }, []); // 不监视任何数据，这样副作用函数只执行一次


	return (
		<div>
			<p>{count}</p>
			<button onClick={remove}>卸载组件</button>
		</div>
	)
}
```

### useRef

Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据。功能与React.createRef()一样，写法有点差别。

```js
export const Demo = function() {
	const myRef = React.useRef()
	function tip() {
		alert(myRef.current.value)
	}


	return (
		<div>
			<input type="text" ref="myRef" />
			<button onClick={tip}>点击提示数据</button>
		</div>
	)
}
```


## Fragment

Fragment可以在写jsx时不用必须有一个真实的DOM根标签了，两种写法：

```jsx
render() {
    return (
       <Fragment>
            <p>hello</p>
            <p>hello</p>
        <Fragment>
    )
}

render() {
    return (
       <>
            <p>hello</p>
            <p>hello</p>
        </>
    )
}
```

## context

一种组件间通信方式， 用于【祖组件】与【后代组件】间通信。在应用开发中一般不用context, 一般都用它的封装react插件

```jsx
import React, { Component } from 'react'
import './index.css'

//创建Context对象
const MyContext = React.createContext()
const {Provider,Consumer} = MyContext
export default class A extends Component {

	state = {username:'tom',age:18}

	render() {
		const {username,age} = this.state
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				<Provider value={{username,age}}>
					<B/>
				</Provider>
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>我是B组件</h3>
				<C/>
			</div>
		)
	}
}

/* class C extends Component {
	//声明接收context，该方式仅用于类组件
	static contextType = MyContext
	render() {
		const {username,age} = this.context
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		)
	}
} */

// 该方式用于函数式组件
function C(){
	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<Consumer>
				{value => `${value.username},年龄是${value.age}`}
			</Consumer>
			</h4>
		</div>
	)
}
```

## 组件优化

**问题一**

只要执行setState()，即使不改变状态数据， 组件也会重新render()

**问题二**

只要当前组件重新render()，就会自动重新render子组件，纵使子组件没有用到父组件的任何数据，因为Component中的shouldComponentUpdate()总是返回true

**解决思路**

只有当组件的state或props数据发生改变时才重新render()

方案一：重写shouldComponentUpdate()方法，比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false（有些麻烦）

方案二：使用PureComponent，PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true。注意这里的变化底层是浅比较，只改内部值不会触发更新。

```js
import React, { PureComponent } from 'react'
export default class Parent extends PureComponent {
	state = {
        obj: {age: 18}
    }

    add = () => {
        const obj = state.obj
        obj.age = 19
        // 不会触发更新，因为obj和state.obj是一个地址
        this.setState(obj)
    }

    add2  = () => {
        // 会更新
        this.setState({obj: { age: 19}})
    }
}
```

## 组件标签体内容

组件标签内容传递给子组件有两种方式：`children props`和`render props`，类似于vue中的slot。

### children props

通过组件标签体传入结构

```jsx
export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A>
                    <B/>
                </A>
			</div>
		)
	}
}

class A extends Component {
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
                {/* 标签体内容 */}
				{this.props.children}
			</div>
		)
	}
}


class B extends Component {
	render() {
		return (
			<div className="b">
				<h3>我是B组件</h3>
			</div>
		)
	}
}
```

这种方式比较简单，但是A组件无法向B组件传递数据

### render props

```jsx

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				{/* B是A的子组件 */}
				<A render={(name)=><B name={name}/>}/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{/* B组件的位置，传递数据的位置 */}
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div className="b">
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}
```

名字不一定叫`render`，习惯上用render属性名

## 错误边界

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面。只能捕获后代组件生命周期产生的错误（主要是render错误），不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

```jsx title="parent.jsx"
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {

	state = {
		hasError:'' //用于标识子组件是否产生错误
	}

	//当Parent的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息（开发环境下仍会显示错误页面）
	static getDerivedStateFromError(error){
		console.log('@@@',error);
		return {hasError:error}
	}

	componentDidCatch(){
		console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
	}

	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
			</div>
		)
	}
}
```

```jsx title="Child.jsx"
import React, { Component } from 'react'

export default class Child extends Component {
	state = {
		// users:[
		// 	{id:'001',name:'tom',age:18},
		// 	{id:'002',name:'jack',age:19},
		// 	{id:'003',name:'peiqi',age:20},
		// ]
		users:'abc'
	}

	render() {
		return (
			<div>
				<h2>我是Child组件</h2>
				{
					this.state.users.map((userObj)=>{
						return <h4 key={userObj.id}>{userObj.name}----{userObj.age}</h4>
					})
				}
			</div>
		)
	}
}
```

## 组件通信

组件间的关系有下面几种：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

组件间的通信方式：

1.props：
    (1).children props
    (2).render props
2.消息订阅-发布：
    pubsub-js、event等等
3.集中式管理：
    redux、dva等等
4.conText:
    生产者-消费者模式

搭配方式：

父子组件：props
兄弟组件：消息订阅-发布、集中式管理
祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)
