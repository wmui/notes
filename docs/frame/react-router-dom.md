# react-router-dom

react-router-dom浏览器端页面的路由管理，路由就是路径和组件的映射关系


## 基础使用

```jsx title="App.jsx"
import React, { Component } from 'react'
import {Link,Route,BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'

export default class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="col-xs-6">
						<div className="list-group">
							{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
                            {/* Link编译后就是普通的a标签 */}
							<Link className="list-group-item" to="/about">About</Link>
							<Link className="list-group-item" to="/home">Home</Link>
						</div>
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Route path="/about" component={About}/>
								<Route path="/home" component={Home}/>
							</div>
						</div>
				</div>
			</BrowserRouter>
		)
	}
}
```

可以直接把`<BrowserRouter>`包裹在App组件上，这样整个应用在使用时只需要包裹一下

```js title="index.js"
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('root'))
```

## NavLink组件

NavLink组件会在路径匹配时，给当前组件添加一个`activeClassName="active"`样式类，用于高亮效果，这个类名可以自定义。

封装NavLink组件

```jsx
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
	render() {
		return (
			<NavLink activeClassName="current" className="list-group-item" {...this.props}/>
		)
	}
}
```

```jsx
<MyNavLink to="/home">Home</MyNavLink>
```

## Switch组件

默认情况下导航到`/home`时会渲染Test组件，使用了Switch组件后，渲染`/home`组件

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Route path="/home" component={Test}/>
</Switch>
```

## 模糊匹配和精准匹配

默认是模糊匹配，当导航到`/home/a/b`时，会渲染`Home`页面。如果path是`/home/a/b`，to 是 `/home`，不会渲染`Home`页面

```jsx
<MyNavLink to="/home/a/b">Home</MyNavLink>

<Switch>
    <Route  path="/about" component={About}/>
    <Route  path="/home" component={Home}/>
</Switch>
```

在路由组件上添加`exact`可以开启精准匹配，to和path完全一样时才会渲染

```jsx
<Route  exact path="/home" component={Home}/>
```

## Redirect

Redirect用于路由匹配不到时，要渲染的页面。

当路径找不到时就渲染about页面

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```

## 嵌套路由

在一个页面中还有二级导航时，比如在home页面中有嵌套路由，那么需要注册路由和跳转时绑定父路由

```jsx
export default class Home extends Component {
	render() {
		return (
				<div>
					<h3>我是Home的内容</h3>
					<div>
						<ul className="nav nav-tabs">
              {/* to 包含 /home */}
							<li>
								<MyNavLink to="/home/news">News</MyNavLink>
							</li>
							<li>
								<MyNavLink to="/home/message">Message</MyNavLink>
							</li>
						</ul>
						{/* path 包含 /home */}
						<Switch>
							<Route path="/home/news" component={News}/>
							<Route path="/home/message" component={Message}/>
						</Switch>
					</div>
				</div>
			)
	}
}
```

## params参数

```jsx title="index.jsx"
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}
	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>
									{/* 向路由组件传递params参数 */}
									<Link to={`/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
								</li>
							)
						})
					}
				</ul>
				<hr/>
				{/* 声明接收params参数 */}
				<Route path="/detail/:id/:title" component={Detail}/>
			</div>
		)
	}
}
```

```jsx title="Detail.jsx"

export default class Detail extends Component {
	render() {
		console.log(this.props);
		// 接收params参数
		const {id,title} = this.props.match.params

		return (
			<ul>
				<li>ID:{id}</li>
				<li>TITLE:{title}</li>
			</ul>
		)
	}
}
```

## search参数

```jsx
{/* 向路由组件传递search参数 */}
<Link to={`/detail?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}<Link>

{/* search参数无需声明接收，正常注册路由即可 */}
<Route path="/detail" component={Detail}/>
```

```jsx
import qs from 'querystring'
export default class Detail extends Component {
	render() {
    // search是一个字符串，需要解析
		const {search} = this.props.location
		const {id,title} = qs.parse(search.slice(1))

		return (
			<ul>
				<li>ID:{id}</li>
				<li>TITLE:{title}</li>
			</ul>
		)
	}
}
```

## state参数

```jsx
{/* 向路由组件传递state参数 */}
<Link to={{pathname:'/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

{/* state参数无需声明接收，正常注册路由即可 */}
<Route path="/detail" component={Detail}/>
```

```jsx
export default class Detail extends Component {
	render() {
		// 接收state参数
		const {id,title} = this.props.location.state || {}

		return (
			<ul>
				<li>ID:{id}</li>
				<li>TITLE:{title}</li>
			</ul>
		)
	}
}
```

路由有history模式和hash两种模式：state参数虽然在导航栏没有体现，但在history模式下，刷新页面并不会丢失，这是因为history api保留了这个数据。hash模式下会丢失。


## push和replace

默认是push模式跳转，每次跳转都会有一条新历史记录，在跳转组件上添加`replace`属性，会启用replace模式，该模式会在替换当前路径渲染页面。

```jsx
<Link replace to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>
```


## 编程式导航

编程式导航可以更加方便的控制跳转，比如点击一个按钮跳转页面，而上面的示例都是用的组件方式跳转

```jsx
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}

	replaceShow = (id,title)=>{
		//replace跳转+携带params参数
		//this.props.history.replace(`/home/message/detail/${id}/${title}`)

		//replace跳转+携带search参数
		// this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

		//replace跳转+携带state参数
		this.props.history.replace(`/home/message/detail`,{id,title})
	}

	pushShow = (id,title)=>{
		//push跳转+携带params参数
		// this.props.history.push(`/home/message/detail/${id}/${title}`)

		//push跳转+携带search参数
		// this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

		//push跳转+携带state参数
		this.props.history.push(`/home/message/detail`,{id,title})
		
	}

	back = ()=>{
		this.props.history.goBack()
	}

	forward = ()=>{
		this.props.history.goForward()
	}

	go = ()=>{
		this.props.history.go(-2)
	}

	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>
									<span>{msgObj.title}</span>
									<button onClick={()=> this.pushShow(msgObj.id,msgObj.title)}>push查看</button>
									<button onClick={()=> this.replaceShow(msgObj.id,msgObj.title)}>replace查看</button>
								</li>
							)
						})
					}
				</ul>
				<hr/>
				<Route path="/home/message/detail" component={Detail}/>

				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
				<button onClick={this.go}>go</button>

			</div>
		)
	}
}
```


## withRouter

withRouter让一般组件也能像路由组件一样使用路由API

```js
import {withRouter} from 'react-router-dom'

class Header extends Component {
	go = ()=>{
		this.props.history.go(-2)
	}
}

render() {
		return (
			<div className="page-header">
				<button onClick={this.go}>go</button>
			</div>
		)
	}
export default withRouter(Header)
```

## react-router-dom@6

### 注册路由

注册路由时需要使用`rotues`组件包裹，属性名改为`element`

```js
import {NavLink,Routes,Route} from 'react-router-dom'

<Routes>
	<Route path="/about" element={<About/>}/>
	<Route path="/home" element={<Home/>}/>
</Routes>
```

### 重定向

使用`<Navigate/>`组件进行重定向

```jsx
import {NavLink,Routes,Route,Navigate} from 'react-router-dom'

<Routes>
	<Route path="/home" element={<Home/>}/>
	<Routes path="/" element={<Navigate to="/home"/>}/>
</Routes>
```

### NavLink高亮

NavLink高亮时可以指定类名

```jsx

function computedClassName({isActive}){
	return isActive ? 'list-group-item atguigu' : 'list-group-item'
}

render() {
	return (
		<div>
			<NavLink className={computedClassName} to="/about">About</NavLink>
				<NavLink className={computedClassName} to="/home">Home</NavLink>
			</div>
	)
}
```

### 路由表

可以通过路由表统一管理路由

```js title="routes/index.js"
import About from '../pages/About'
import Home from '../pages/Home'
import {Navigate} from 'react-router-dom'

export default [
	{
		path:'/about',
		element:<About/>
	},
	{
		path:'/home',
		element:<Home/>
	},
	{
		path:'/',
		element:<Navigate to="/about"/>
	}
]
```

```jsx
import React from 'react'
import {NavLink,useRoutes} from 'react-router-dom'
import routes from './routes'

export default function App() {
  //根据路由表生成对应的路由规则
	const element = useRoutes(routes)

  return (
    <div>
        <div>
          <NavLink className="list-group-item" to="/about">About</NavLink>
					<NavLink className="list-group-item" to="/home">Home</NavLink>
        </div>

        <div>
					{element}
        </div>
    </div>
  )
}
```

### 嵌套路由

通过Children属性配置嵌套路由，通过`<Outlet/>`组件指定子路由的位置。

```js
export default [
	{
		path:'/about',
		element:<About/>
	},
	{
		path:'/home',
		element:<Home/>,
		children:[
			{
				path:'news',
				element:<News/>
			},
			{
				path:'message',
				element:<Message/>
			}
		]
	},
	{
		path:'/',
		element:<Navigate to="/about"/>
	}
]
```

```jsx title="pages/home.jsx"
import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'

export default function Home() {
	return (
		<div>
			<h2>Home组件内容</h2>
			<div>
				<ul className="nav nav-tabs">
					<li>
						<NavLink className="list-group-item" to="news">News</NavLink>
					</li>
					<li>
						<NavLink className="list-group-item" to="message">Message</NavLink>
					</li>
				</ul>
				{/* 指定子路由组件呈现的位置 */}
				<Outlet />
			</div>
		</div>
	)
}
```

### params参数

使用useParams钩子获取params参数

```js title="routes/index.js"

export default [
	{
		path:'/about',
		element:<About/>
	},
	{
		path:'/home',
		element:<Home/>,
		children:[
			{
				path:'news',
				element:<News/>
			},
			{
				path:'message',
				element:<Message/>,
				children:[
					{
            // 参数路由
						path:'detail/:id/:title/:content',
						element:<Detail/>
					}
				]
			}
		]
	},
]
```

```jsx title="pages/Detail.jsx"
import React from 'react'
import {useParams,useMatch} from 'react-router-dom'

export default function Detail() {
	const {id,title,content} = useParams()
	return (
		<ul>
			<li>消息编号：{id}</li>
			<li>消息标题：{title}</li>
			<li>消息内容：{content}</li>
		</ul>
	)
}
```
### search参数

使用useSearchParams钩子获取search参数


```jsx title="pages/Detail.jsx"
import React from 'react'
import {useSearchParams,useLocation} from 'react-router-dom'

export default function Detail() {
	const [search,setSearch] = useSearchParams()
	const id = search.get('id')
	const title = search.get('title')
	const content = search.get('content')
	return (
		<ul>
			<li>
				<button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
			</li>
			<li>消息编号：{id}</li>
			<li>消息标题：{title}</li>
			<li>消息内容：{content}</li>
		</ul>
	)
}
```

### state参数

使用useLocation钩子获取state参数

```js
<ul>
    {
      messages.map((m)=>{
        return (
          // 路由链接
          <li key={m.id}>
            <Link 
              to="detail" 
              state={{
                id:m.id,
                title:m.title,
                content:m.content,
              }}
            >{m.title}</Link>
          </li>
        )
      })
    }
</ul>
```

```jsx
import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Detail() {
	const {state:{id,title,content}} = useLocation()
	return (
		<ul>
			<li>消息编号：{id}</li>
			<li>消息标题：{title}</li>
			<li>消息内容：{content}</li>
		</ul>
	)
}
```

### 编程式导航

使用useNavigate钩子实现编程式路由导航

一般组件:

```js
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate()

	function back(){
		navigate(-1)
	}
	function forward(){
		navigate(1)
	}

	return (
		<div className="col-xs-offset-2 col-xs-8">
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={back}>←后退</button>
				<button onClick={forward}>前进→</button>
			</div>
		</div>
	)
}
```

```jsx
import {Link,Outlet,useNavigate} from 'react-router-dom'

export default function Message() {
	const navigate = useNavigate()
  function showDetail(m){
    // search和params参数直接写在路径上'/detail?id=xx&title=xx'
		navigate('detail',{
			replace:false,
			state:{
				id:m.id,
				title:m.title,
				content:m.content
			}
		})
	}

  render() {
    return (
      <button onClick={()=>showDetail({id:'001',title:'消息1',content:'锄禾日当午'})}>查看详情</button>
    )
  }
}
```

### useInRouterContext

useInRouterContext()判断当前组件是否在路由上下文环境中，返回一个布尔值，只要是被包裹的都在路由环境中。

```js title="App.jsx"
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import Demo from './components/Demo'

ReactDOM.render(
	<div>
    {/* Demo没有被包裹 */}
		<Demo/> 
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</div>,
	document.getElementById('root')
)
```

```jsx title="components/Demo.jsx"
import React from 'react'
import {useInRouterContext} from 'react-router-dom'

export default function Demo() {
	console.log(useInRouterContext())
	return (
		<div>Demo</div>
	)
}
```

### useNavigationType

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。


```jsx title="News.jsx"
import React from 'react'
import {useNavigationType} from 'react-router-dom'

export default function Demo() {
	console.log(useNavigationType())
	return (
		<div>Demo</div>
	)
}
```

###  useOutlet()

用来获取当前组件中渲染的嵌套路由，如果嵌套路由没有挂载,则result为null；如果嵌套路由已经挂载，则展示嵌套的路由对象。

```jsx
import React from 'react'
import {NavLink,Outlet,useOutlet} from 'react-router-dom'


export default function Home() {
	console.log('###',useOutlet())
	return (
		<div>
			<h2>Home组件内容</h2>
			<div>
				<ul className="nav nav-tabs">
					<li>
						<NavLink className="list-group-item" replace to="news">News</NavLink>
					</li>
					<li>
						<NavLink className="list-group-item" to="message">Message</NavLink>
					</li>
				</ul>
				{/* 指定路由组件呈现的位置 */}
				<Outlet />
			</div>
		</div>
	)
}
```

### useResolvedPath

给定一个 URL值，解析其中的：path、search、hash值。

```jsx
import React from 'react'
import {useResolvedPath} from 'react-router-dom'

export default function News() {
	console.log('@@',useResolvedPath('/user?id=001&name=tom#qwe'))
  // {pathname: '/user', search: '?id=001&name=tom', hash: '#qwe'}
	return (
		<ul>
			<li>news001</li>
		</ul>
	)
}
```