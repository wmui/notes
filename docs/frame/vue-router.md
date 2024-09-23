# vue-router

vue-router路由器，通过监视地址栏路径的变化，渲染对应的组件到指定的位置，实现页面切换的功能。

## 基本使用

创建路由配置文件`router/index.ts`:

  ```js
  import {createRouter,createWebHistory} from 'vue-router'
  import Home from '@/pages/Home.vue'
  import About from '@/pages/About.vue'
  
  const router = createRouter({
  	history:createWebHistory(),
  	routes:[
  		{
  			path:'/home',
  			component:Home
  		},
  		{
  			path:'/about',
  			component:About
  		}
  	]
  })
  export default router
  ```
在main.ts中挂载路由：

```js
  import router from './router/index'
  app.use(router)
  
  app.mount('#app')
```

在`App.vue`中指定组件挂载位置


  ```html
  <template>
    <div class="app">
      <h2 class="title">Vue路由测试</h2>
      <!-- 导航区 -->
      <div class="navigate">
        <!-- 路径跳转 -->
        <RouterLink to="/home" active-class="active">首页</RouterLink>
        <RouterLink to="/about" active-class="active">关于</RouterLink>
      </div>
      <!-- 展示区 -->
      <div class="main-content">
        <!-- 挂载位置 -->
        <RouterView></RouterView>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup name="App">
    import {RouterLink,RouterView} from 'vue-router'  
  </script>
  ```

  为了区分路由组件和一般组件，一般把路由组件通常存放在`pages` 或 `views`文件夹，一般组件通常存放在`components`文件夹

## 工作模式

路由器有`history`模式和`hash`模式，history模式`URL`更加美观，接近传统的网站`URL`，项目上线需要服务端配合处理路径问题，否则刷新会有`404`错误。hash模式兼容性更好，不需要服务器端处理路径，`URL`带有`#`不太美观，在`SEO`优化方面相对较差。

## to的两种写法


```html
<!-- 第一种：to的字符串写法 -->
<router-link active-class="active" to="/home">主页</router-link>

<!-- 第二种：to的对象写法 -->
<router-link active-class="active" :to="{path:'/home'}">Home</router-link>
```

## 命名路由

```js
const router = createRouter({
  	history:createWebHistory(),
  	routes:[
  		{
  			path:'/home',
            name: 'home',
  			component:Home
  		},
  		{
  			path:'/about',
  			component:About
  		}
  	]
  })
```

```html
<router-link :to="{name:'home'}">跳转</router-link>
```
## 嵌套路由

使用`children`配置项定义嵌套路由，嵌套路由的路径不用加`/`
```js
const router = createRouter({
  	history:createWebHistory(),
  	routes:[
  		{
  			path:'/home',
            name: 'home',
  			component:Home,
            children: [
                {
                    path:'about',
                    name: 'about'
                    component:About
                }
            ]
  		},
  	]
  })
```
## query参数

query参数不需要在路由表中定义结构

```html
<router-link to="/news/detail?a=1&b=2&content=欢迎你">


<script setup lang="ts">
   import {useRoute} from 'vue-router'
    const route = useRoute()
    // 打印query参数
    onMounted(() => {
        console.log(route.query)
    })
</script>
```


## params参数

params参数需要再路由表中先定义好结构，并且参数值不能是数组和对象

```js
  const router = createRouter({
  	history:createWebHistory(),
  	routes:[
  		{
  			path:'/news/:id/:title',
            name: 'news'
  			component:News
  		}
  	]
  })
```

```html
<RouterLink to="/news/001/新闻001">新闻</RouterLink>


<script setup lang="ts">
   import {useRoute} from 'vue-router'
    const route = useRoute()
    // 打印query参数
    onMounted(() => {
        console.log(route.params)
    })
</script>
```


## 路由props

路由的props配置，可以将路由参数作为`props`传给组件

```js
{
	name:'xiang',
	path:'detail/:id/:title/:content',
	component:Detail,

  // props的对象写法，作用：把对象中的每一组key-value作为props传给Detail组件
  // props:{a:1,b:2,c:3}, 

  // props的布尔值写法，作用：把收到了每一组params参数，作为props传给Detail组件
  // props:true
  
  // props的函数写法，作用：把返回的对象中每一组key-value作为props传给Detail组件
  props(route){
    return route.query
  }
}
```

## replace

浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录（默认值），`replace`是替换当前记录。

```html
  <RouterLink replace to="/news/001/新闻001">新闻</RouterLink>
```

## 编程式导航

路由组件的两个重要的属性：`$route`和`$router`变成了两个`hooks`

```js
import {useRoute,useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

console.log(route.query)
console.log(route.parmas)
console.log(router.push)
console.log(router.replace)
```

## 路由重定向

将特定的路径，重新定向到已有路由，通常配置到路由表的最后

   ```js
    {
        path:'/',
        redirect:'/welcome'
    }
   ```
