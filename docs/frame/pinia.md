# pinia

pinia是一个符合直觉的状态管理库

## 搭建环境

```sh
npm install pinia
```

```js
import { createApp } from 'vue'
import App from './App.vue'

/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'

/* 创建pinia */
const pinia = createPinia()
const app = createApp(App)

/* 使用插件 */{}
app.use(pinia)
app.mount('#app')
```

## 读取数据

store是一个保存状态和业务逻辑的实体，每个组件都可以读取他，它有三个核心概念：state、getter、action，相当于组件中的： data、 computed 和 methods。

创建`src/store/count.ts`

```ts
// 引入defineStore用于创建store
import {defineStore} from 'pinia'

// 定义并暴露一个store
export const useCountStore = defineStore('count',{
  // 动作
  actions:{},
  // 状态
  state(){
    return {
      sum:6
    }
  },
  // 计算
  getters:{}
})
```

使用`src/store/count.ts`

```html
<template>
  <h2>当前求和为：{{ countStore.sum }}</h2>
</template>

<script setup lang="ts" name="Count">
  // 引入对应的useXxxxxStore	
  import {useCountStore} from '@/store/count'
  
  // 调用useXxxxxStore得到对应的store
  const countStore = useCountStore()
</script>
```

当state中的数据，需要经过处理后再使用时，可以使用getters配置

```ts
// 引入defineStore用于创建store
import {defineStore} from 'pinia'

// 定义并暴露一个store
export const useCountStore = defineStore('count',{
  // 动作
  actions:{
    /************/
  },
  // 状态
  state(){
    return {
      sum:1,
      school:'shcool'
    }
  },
  // 计算
  getters:{
    bigSum:(state):number => state.sum *10,
    upperSchool():string{
      return this.school.toUpperCase()
    }
  }
})
```

```html
<template>
  <h2>bigSum：{{ countStore.bigSum }}</h2>
  <h2>shcool：{{ countStore.uperSchool }}</h2>
</template>

<script setup lang="ts" name="Count">
  import {useCountStore} from '@/store/count'
  const countStore = useCountStore()
</script>
```

## 修改数据

### 方式一：直接修改

```ts
countStore.sum = 66
```

### 方式二：批量修改

```ts
countStore.$patch({
  sum:999,
  school:'test school'
})
```

### 方式三：action修改（action中可以编写一些业务逻辑）

```ts
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
    state(){
        return {
            sum:6
        }
    },
    actions: {
    //加
    increment(value:number) {
      if (this.sum < 10) {
        //操作countStore中的sum
        this.sum += value
      }
    },
    //减
    decrement(value:number){
      if(this.sum > 1){
        this.sum -= value
      }
    }
  },
  /*************/
})
```

```ts
// 使用countStore
const countStore = useCountStore()

// 调用对应action
countStore.incrementOdd(n.value)
```

## storeToRefs

借助storeToRefs将store中的数据（state）转为ref对象，这样可以获得解构后的响应式数据。

::: info 注意
pinia提供的storeToRefs只会将数据(state)做转换，而Vue的toRefs会转换整个store中数据
:::

```html
<template>
	<div class="count">
		<h2>当前求和为：{{sum}}</h2>
	</div>
</template>

<script setup lang="ts" name="Count">
  import { useCountStore } from '@/store/count'
  /* 引入storeToRefs */
  import { storeToRefs } from 'pinia'

	/* 得到countStore */
  const countStore = useCountStore()
  /* 使用storeToRefs转换countStore，随后解构 */
  const {sum} = storeToRefs(countStore)
</script>
```

## 监视state

通过 store 的 $subscribe() 方法侦听 state 及其变化

```ts
countStore.$subscribe((mutation,state)=>{
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('count', JSON.stringify(state))
})
```

## 组合式store

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions

