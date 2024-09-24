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
4.内联样式，要用style={{key:value}}的形式去写，key用驼峰形式。
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

### 初始阶段

由ReactDOM.render()触发---初次渲染

1.	constructor()
2.	componentWillMount()
3.	render()
4.	componentDidMount()

componentDidMount，一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息

### 更新阶段

由组件内部this.setSate()或父组件render触发

1.	shouldComponentUpdate()
2.	componentWillUpdate()
3.	render()
4.	componentDidUpdate()


### 卸载阶段

componentWillUnmount() ，由ReactDOM.unmountComponentAtNode()触发，一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息。


### 新版

![](../public/3_react.png)

