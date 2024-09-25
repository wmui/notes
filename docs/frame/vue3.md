# Vue3


## 创建项目

```sh
# 方式一：vue-cli
npm install -g @vue/cli

vue create vue2demo

# 方式二：vite
npm create vue@latest
```

## setup

`setup`是`Vue3`中一个新的配置项，值是一个函数，如果要使用Composition API，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在`setup`中。

### 特点

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。


```html
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script lang="ts">
  export default {
    name:'Person',
    setup(){
      // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）
      let name = '张三'
      let age = 18
      let tel = '13888888888'

      // 方法，原来写在methods中
      function changeName(){
        name = 'zhang-san' //注意：此时这么修改name页面是不变化的
        console.log(name)
      }
      function changeAge(){
        age += 1 //注意：此时这么修改age页面是不变化的
        console.log(age)
      }
      function showTel(){
        alert(tel)
      }

      // 返回一个对象，对象中的内容，模板中可以直接使用
      return {name,age,tel,changeName,changeAge,showTel}
    }
  }
</script>
```

### 返回值

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用
- 若返回一个**函数**：则可以自定义渲染内容，代码如下：

```js
setup(){
  return ()=> '你好啊！'
}
```

### 与Options API区别

setup函数中没有自己的this，因此访问不到options api中的属性和方法，但option api中可以通过this访问到setup中的属性和方法。如果冲突，以setup中的优先。

```html
<script lang="ts">
import { onMounted } from 'vue'
export default {
  data() {
    return {
      name: 'hello'
    }
  },
  mounted() {
  // 可以
    console.log(this.age)
  },
  setup() {
    onMounted(() => {
        // this是undefined，无法访问this.name
      console.log(this)
    })

    return {
      age: 18
    }
  }
}
</script>

<template>
  <div>demo</div>
</template>

```
### 语法糖

通过在script标签中添加setup属性，启用Composition API模式开发。

```html
<script setup lang="ts">
  let name = '张三'
  let age = 18
</script>

<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
  </div>
</template>
```

使用setup语法糖后，无法在给组件命名，可以通过下面两种方式解决：

方式一：添加一个单独的script标签

```html
<script lang="ts">
  export default {
    name:'Person',
  }
</script>
```

方式二：使用 vite-plugin-vue-setup-extend 插件

1. 第一步：`npm i vite-plugin-vue-setup-extend -D`
2. 第二步：`vite.config.ts`
```js
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```
3. 第三步：`<script setup lang="ts" name="Person">`

## ref

通过ref(initValue)方法，可以定义响应式变量，变量可以是普通数据类型也可以是引用数据类型。该方法返回一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`属性是响应式的。


```html
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script setup lang="ts" name="Person">
  import {ref} from 'vue'
  // name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
  let name = ref('张三')
  let age = ref(18)
  // tel就是一个普通的字符串，不是响应式的
  let tel = '13888888888'

  function changeName(){
    // JS中操作ref对象时候需要.value
    name.value = '李四'
    console.log(name.value)

    // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
    // name = ref('zhang-san')
  }
  function changeAge(){
    // JS中操作ref对象时候需要.value
    age.value += 1 
    console.log(age.value)
  }
  function showTel(){
    alert(tel)
  }
</script>
```

:::info 注意
`JS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。

对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。
:::


## reactive

通过reactive(initValue)方法，可以定义响应式对象。该方法返回一个`Proxy`的实例对象，简称`响应式对象`，`reactive`定义的响应式数据是“深层次”的。

```html

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from 'vue'

// 数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = reactive({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

function changeCarPrice() {
  car.price += 10
}
function changeFirstGame() {
  games[0].name = '流星蝴蝶剑'
}
function test(){
  obj.a.b.c.d = 999
}
</script>
```

前面说到`ref`可以接受引用类型数据，若`ref`接收的是引用类型，内部其实也是调用了`reactive`函数

```html
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from 'vue'

// 数据
let car = ref({ brand: '奔驰', price: 100 })
let games = ref([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = ref({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

console.log(car)

function changeCarPrice() {
  car.value.price += 10
}
function changeFirstGame() {
  games.value[0].name = '流星蝴蝶剑'
}
function test(){
  obj.value.a.b.c.d = 999
}
</script>
```

## ref和reactive区别

1. `ref`用来定义：**基本类型数据**、**对象类型数据**；`reactive`用来定义：**对象类型数据**。
2. `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去替换）

```html
<template>
  <div>
    <h2>汽车信息：一台{{ car1.brand }}汽车，价值{{ car1.price }}万</h2>
    <button @click="changeCar1">button1</button>

    <h2>汽车信息：一台{{ car2.brand }}汽车，价值{{ car2.price }}万</h2>
    <button @click="changeCar2">button2</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

let car1 = ref({brand: '宝马', price: 100});
let car2 = reactive({brand: '奔驰', price: 200})

function changeCar1() {
  // 响应式
  car1.value = {brand: '奥迪', price: 300}
}

function changeCar2() {
  // 非响应式
  car2 = {brand: '奥迪', price: 300}
  // 非响应式
  car2 = reactive({brand: '奥迪', price: 300})
  // 响应式
  Object.assign(car2, {brand: '奥迪', price: 300})
}
</script>
```

- 使用原则：
> 1. 若需要一个基本类型的响应式数据，必须使用`ref`。
> 2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
> 3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。


## toRefs 和 toRef

`toRefs()`将响应式对象中的每一属性，转为`ref`对象；`toRef()`将响应式对象中的一个属性，转为`ref`对象。用于解决对象解构赋值时响应丢失问题。


```html
<template>
  <div class="person">
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>性别：{{person.gender}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,reactive,toRefs,toRef} from 'vue'

  // 数据
  let person = reactive({name:'张三', age:18, gender:'男'})
	
  // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
  let {name,gender} =  toRefs(person)
	
  // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
  let age = toRef(person,'age')

  // 方法
  function changeName(){
    name.value += '~'
  }
  function changeAge(){
    age.value += 1
  }
  function changeGender(){
    gender.value = '女'
  }
</script>
```


## computed

根据已有数据计算出新数据（和`Vue2`中的`computed`作用一致），computed方法的返回值是一个`ComputedRefImpl`对象，因此可以通过`value`属性访问返回值。



```html
<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    全名：<span>{{fullName}}</span> <br>
    <button @click="changeFullName">全名改为：li-si</button>
  </div>
</template>

<script setup lang="ts" name="App">
  import {ref,computed} from 'vue'

  let firstName = ref('zhang')
  let lastName = ref('san')

  // 计算属性——只读取，不修改
  /* let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  }) */


  // 计算属性——既读取又修改
  let fullName = computed({
    // 读取
    get(){
      return firstName.value + '-' + lastName.value
    },
    // 修改
    set(val){
      firstName.value = val.split('-')[0]
      lastName.value = val.split('-')[1]
    }
  })

  function changeFullName(){
    fullName.value = 'li-si'
  } 
</script>
```



## watch

watch方法监视数据的变化，可以监视ref数据值、reactive数据值、函数返回值（getter函数）和包含上述值的数组

### ref基本类型

监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的改变。

```html
<template>
  <div class="person">
    <h2>当前求和为：{{sum}}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  // 数据
  let sum = ref(0)
  // 方法
  function changeSum(){
    sum.value += 1
  }
  // 监视，情况一：监视【ref】定义的【基本类型】数据
  const stopWatch = watch(sum,(newValue,oldValue)=>{
    console.log('sum变化了',newValue,oldValue)
    if(newValue >= 10){
      stopWatch()
    }
  })
</script>
```

### ref对象类型

监视`ref`定义的【对象类型】数据，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。


```html
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  // 数据
  let person = ref({
    name:'张三',
    age:18
  })
  // 需要配置{deep:true}，新旧值一样
  function changeName(){
    person.value.name += '~'
  }
  // 需要配置{deep:true}，新旧值一样
  function changeAge(){
    person.value.age += 1
  }

  // 新旧值不一样
  function changePerson(){
    person.value = {name:'李四',age:90}
  }
  /* 
    watch的第一个参数是：被监视的数据
    watch的第二个参数是：监视的回调
    watch的第三个参数是：配置对象（deep、immediate等等.....） 
  */
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  },{deep:true})
  
</script>
```


> **注意：**
>
> * 若修改的是`ref`定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
>
> * 若修改整个`ref`定义的对象，`newValue` 是新值， `oldValue` 是旧值，因为不是同一个对象了。

### reactive对象类型

监视`reactive`定义的【对象类型】数据，默认开启了深度监视。

```html
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  // 数据
  let person = reactive({
    name:'张三',
    age:18,
  })
  // 新旧值一样
  function changeName(){
    person.name += '~'
  }
  // 新旧值一样
  function changeAge(){
    person.age += 1
  }
  // 新旧值一样，因为还是原来的对象
  function changePerson(){
    Object.assign(person,{name:'李四',age:80})
  }
  // 监视【reactive】定义的【对象类型】数据，且默认是开启深度监视的
  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  })
  </script>
  ```

**注意：** 监视对象类型数据，ref返回的新旧值不同，reactive返回的新旧值相同。

### 子属性监视

监视`ref`或`reactive`定义的对象类型数据中的**某个属性**，需要写成函数形式。

```html
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>车子：{{ person.car.c1 }} {{person.car.c2}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeCar">修改车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,ref,watch} from 'vue'
  // 数据
  let person = ref({
    name:'张三',
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.value.name += '~'
  }

  function changeCar() {
    person.value.car = {c1: '大众', c2: '奥迪'}
  }
  // 新旧值不同
  watch(() => person.value.name, (newValue,oldValue) => {
    console.log('person.name变化了',newValue,oldValue)
  })
  // 新旧值不同
  watch(() => person.value.car, (newValue,oldValue) => {
    console.log('person.car变化了',newValue,oldValue)
  })
  </script>
  ```


```html
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>车子：{{ person.car.c1 }} {{person.car.c2}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeCar">修改车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  // 数据
  let person = reactive({
    name:'张三',
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }

  function changeCar() {
    person.car = {c1: '大众', c2: '奥迪'}
  }
  // 新旧值不同
  watch(() => person.name, (newValue,oldValue) => {
    console.log('person.name变化了',newValue,oldValue)
  })
  // 新旧值不同
  watch(() => person.car, (newValue,oldValue) => {
    console.log('person.car变化了',newValue,oldValue)
  })
  </script>
  ```


### 多属性监视

```html
<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>车子：{{ person.car.c1 }} {{person.car.c2}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeCar">修改车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,ref,watch} from 'vue'
  // 数据
  let person = reactive({
    name:'张三',
    car:{
      c1:'奔驰',
      c2:'宝马'
    }
  })
  // 方法
  function changeName(){
    person.name += '~'
  }

  function changeCar() {
    person.car = {c1: '大众', c2: '奥迪'}
  }
  // newValue和oldValue都是数组，只要有一个变化就会执行
  watch([()=>person.name,() => person.car],(newValue,oldValue)=>{
    console.log('person.car变化了',newValue,oldValue)
  },{deep:true})
  </script>
  ```
## watchEffect

`watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性），立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。


  ```html
  <template>
    <div class="person">
      <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
      <h2 id="demo">水温：{{temp}}</h2>
      <h2>水位：{{height}}</h2>
      <button @click="changePrice">水温+1</button>
      <button @click="changeSum">水位+10</button>
    </div>
  </template>
  
  <script lang="ts" setup name="Person">
    import {ref,watch,watchEffect} from 'vue'
    // 数据
    let temp = ref(0)
    let height = ref(0)
  
    // 方法
    function changePrice(){
      temp.value += 10
    }
    function changeSum(){
      height.value += 1
    }
  
    // 用watch实现，需要明确的指出要监视：temp、height
    watch([temp,height],(value)=>{
      // 从value中获取最新的temp值、height值
      const [newTemp,newHeight] = value
      // 室温达到50℃，或水位达到20cm，立刻联系服务器
      if(newTemp >= 50 || newHeight >= 20){
        console.log('联系服务器')
      }
    })
  
    // 用watchEffect实现，不用
    const stopWtach = watchEffect(()=>{
      // 室温达到50℃，或水位达到20cm，立刻联系服务器
      if(temp.value >= 50 || height.value >= 20){
        console.log(document.getElementById('demo')?.innerText)
        console.log('联系服务器')
      }
      // 水温达到100，或水位达到50，取消监视
      if(temp.value === 100 || height.value === 50){
        console.log('清理了')
        stopWtach()
      }
    })
  </script>
  ```
  
## 标签ref

标签ref：用在普通`DOM`标签上，获取的是`DOM`节点；用在组件标签上，获取的是组件实例对象；

### 普通标签

```html
<template>
  <div class="person">
    <h1 ref="title1">test</h1>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {onMounted, ref} from 'vue'
	
  let title1 = ref()

  onMounted(() => {
    console.log(title1.value)
  })
</script>
```

### 组件

```html
<!-- 父组件App.vue -->
<template>
  <Person ref="ren"/>
</template>

<script lang="ts" setup name="App">
  import Person from './components/Person.vue'
  import {ref, onMounted} from 'vue'

  let ren = ref()

  // 张三 18   
  onMounted(() => {
    console.log(ren.value.name)
    console.log(ren.value.age)
  })
</script>


<!-- 子组件Person.vue -->
<script lang="ts" setup name="Person">
  import {ref,defineExpose} from 'vue'
  let name = ref('张三')
  let age = ref(18)
  // 使用defineExpose将组件中的数据交给外部
  defineExpose({name,age})
</script>
```

## Props

vue3中，通过defineProps() 宏提供一个带有 props 校验选项的对象，来限制接受的数据

```html

<script lang="ts" setup name="Person">
	defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true
  },
  // 必传但可为 null 的字符串
  propD: {
    type: [String, null],
    required: true
  },
  // Number 类型的默认值
  propE: {
    type: Number,
    default: 100
  },
  // 对象类型的默认值
  propF: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // 自定义类型校验函数
  // 在 3.4+ 中完整的 props 作为第二个参数传入
  propG: {
    validator(value:string, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // 函数类型的默认值
  propH: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      return 'Default function'
    }
  }
})
</script>
```

## 生命周期

  > 创建阶段：`setup`
  >
  > 挂载阶段：`onBeforeMount`、`onMounted`
  >
  > 更新阶段：`onBeforeUpdate`、`onUpdated`
  >
  > 卸载阶段：`onBeforeUnmount`、`onUnmounted`

* 常用的钩子：`onMounted`(挂载完毕)、`onUpdated`(更新完毕)、`onBeforeUnmount`(卸载之前)

setup的执行时机是最早的，比vue2的`beforeCreate`、`created`还早。

::: INFO 注意
当父组件和子组件都在setup中使用了钩子的时候，父组件挂载阶段先执行子组件挂载，父组件卸载阶段先执行子组件卸载。
:::

> 父onBeforeMount》子onBeforeMount》子onMounted父onMounted
> 父onBeforeUnmount》子onBeforeUnmount》子onUnmounted》父onUnmounted

## 自定义hook

hook的本质是一个函数，把`setup`函数中使用的`Composition API`进行了封装，类似于`vue2.x`中的`mixin`。hook的优势是复用代码, 让`setup`中的逻辑更清楚易懂

`useSum.ts`中内容如下：

```ts
  import {ref,onMounted} from 'vue'
  
  export default function(){
    let sum = ref(0)
  
    const increment = ()=>{
      sum.value += 1
    }
    const decrement = ()=>{
      sum.value -= 1
    }
    onMounted(()=>{
      increment()
    })
  
    //向外部暴露数据
    return {sum,increment,decrement}
  }		
  ```

 在组件中使用useSum：

  ```html
  <template>
    <h2>当前求和为：{{sum}}</h2>
    <button @click="increment">点我+1</button>
    <button @click="decrement">点我-1</button>
  </template>
  
  <script setup lang="ts">
    import useSum from './hooks/useSum'
  	
    let {sum,increment,decrement} = useSum()
  </script>
  ```

## 组件通信

Vue3组件通信和Vue2的区别：

- 移出事件总线，使用mitt代替。
- 把.sync优化到了v-model里面了。
- 把$listeners所有的东西，合并到$attrs中了。
- $children被砍掉了。

### 父子通信

#### props

props是使用频率最高的一种父子通信方式，若父传子：属性值是非函数，若子传父：属性值是函数

```html
<template>
  <div class="father">
    <h3>父组件，</h3>
    <h4>我的车：{{ car }}</h4>
    <h4>儿子给的玩具：{{ toy }}</h4>
    <Child :car="car" :getToy="getToy" />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
// 数据
const car = ref("奔驰");
const toy = ref();
// 方法
function getToy(value: string) {
  toy.value = value;
}
</script>
```

```html
<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>我的玩具：{{ toy }}</h4>
    <h4>父给我的车：{{ car }}</h4>
    <button @click="getToy(toy)">玩具给父亲</button>
  </div>
</template>
  
<script setup lang="ts" name="Child">
  import { ref } from "vue";
  const toy = ref("奥特曼");

  defineProps(["car", "getToy"]);
</script>
```

#### v-model

标签v-model的本质

```html
<!-- 使用v-model指令 -->
<input type="text" v-model="userName">

<!-- v-model的本质是下面这行代码 -->
<input 
  type="text" 
  :value="userName" 
  @input="userName =(<HTMLInputElement>$event.target).value"
>
<!-- @input是input标签的原生事件，$event就是原生的event对象。 -->
```


组件标签上的v-model的本质：:moldeValue ＋ update:modelValue事件

```html
<!-- 组件标签上使用v-model指令 -->
<MyInput v-model="userName"/>

<!-- 组件标签上v-model的本质 -->
<MyInput :modelValue="userName" @update:modelValue="userName = $event"/>
<!-- @update是组件上自定义事件，$event是update被触发式传递过来的数据 -->
```

```html
<template>
	<MyInput v-model="userName"></MyInput>
</template>

<script setup lang="ts" name="demo">
 import { ref } from 'vue'
 import MyInput from './MyInput.vue'
 let userName = ref('')
</script>
```

```html
<template>
  <div class="box">
    <!--将接收的modelValue值赋给input元素的value属性，目的是：为了呈现数据 -->
		<!--给input元素绑定原生input事件，触发input事件时，进而触发update:modelValue自定义事件-->
    <input 
       type="text" 
       :value="modelValue" 
       @input="emit('update:modelValue',$event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="MyInput">
  // 接收props
  defineProps(['modelValue'])
  // 声明事件
  const emit = defineEmits(['update:modelValue'])
</script>
```


modelValue的名字是可以修改的，modelValue是v-model指令的默认值

```html
<!-- 用名字abc -->
<MyInput v-model:abc="userName"></MyInput>
<!-- 等价于 -->
<MyInput :abc="userName" @update:abc="userName = $event"></MyInput>
```

```html
<template>
  <div class="box">
    <!-- 改为abc -->
    <input 
       type="text" 
       :value="abc" 
       @input="emit('update:abc',$event.target.value)"
    >
  </div>
</template>

<script setup lang="ts" name="MyInput">
  // 接收props
  defineProps(['abc'])
  // 声明事件
  const emit = defineEmits(['update:abc'])
</script>
```

#### $refs/$parent

`$refs`包含所有被ref属性标识的DOM元素或组件实例的对象。`$parent`当前组件的父组件实例对象

```html
<template>
  <div class="father">
    <div>
      <p>得到儿子的玩具：{{ toy }}</p>
      <p>我的房产：{{ house }}套</p>
      <button @click="getToy($refs)">获取儿子的玩具</button>
    </div>

    <Child ref="child" />
    <h3 ref="title"></h3>
  </div>
</template>
  
<script setup lang="ts" name="Father">
import Child from "./Child.vue";
import { ref } from "vue";
let toy = ref();
let house = ref(3);

function getToy(refs) {
  toy.value = refs.child.toy;
}

defineExpose({ house });
</script>
```

```html
<template>
  <div class="grand-child">
    <p>我的玩具：{{ toy }}</p>
    <p>得到爸爸的房产: {{house}}套</p>
    <button @click="getHouse($parent)">获取爸爸的房产</button>
  </div>
</template>
  
<script setup lang="ts" name="Child">
import { ref } from "vue";

let toy = ref('奥特曼')
let house  = ref(0)
function getHouse(parent) {
    parent.house -= 1
    house.value += 1
}
defineExpose({toy})
</script>
```

### 祖孙通信

#### $attrs

`$attrs`用于实现当前组件的父组件，向当前组件的子组件通信。`$attrs`是一个对象，包含所有父组件传入的标签属性。

`$attrs`会自动排除当前组件props中声明的属性(可以认为声明过的 props 被子组件自己“消费”了）

```html
<template>
	<div class="father">
	  <h3>父组件</h3>
	  <!-- v-bind="{x:100,y:200}"等价于 :x="100" :y="100" -->
	  <Child :a="a" :b="b" :c="c" :d="d" v-bind="{x:100,y:200}" :updateA="updateA"/>
	</div>
</template>
  
  <script setup lang="ts" name="Father">
	  import Child from './Child.vue'
	  import { ref } from "vue";
	  let a = ref(1)
	  let b = ref(2)
	  let c = ref(3)
	  let d = ref(4)
  
	  function updateA(value){
		  a.value = value
	  }
  </script>
```

```html
<template>
	<div class="child">
		<h3>子组件</h3>
		<GrandChild v-bind="$attrs"/>
	</div>
</template>

<script setup lang="ts" name="Child">
	import GrandChild from './GrandChild.vue'
    // 子组件使用c、d
    defineProps(['c', 'd'])
</script>
```

```html
<template>
	<div class="grand-child">
		<h3>孙组件</h3>
		<h4>a：{{ a }}</h4>
		<h4>b：{{ b }}</h4>
        <!-- 接收不到 -->
		<h4>c：{{ c }}</h4>
        <!-- 接受不到 -->
		<h4>d：{{ d }}</h4>
		<h4>x：{{ x }}</h4>
		<h4>y：{{ y }}</h4>
		<button @click="updateA(666)">点我更新A</button>
	</div>
</template>

<script setup lang="ts" name="GrandChild">
	defineProps(['a','b','c','d','x','y','updateA'])
</script>
```

#### provide/inject

在祖先组件中通过`provide`配置向后代组件提供数据，在后代组件中通过`inject`配置来声明接收数据。子组件中不用编写任何东西，是不受到任何打扰的。


```html
<template>
	<div class="father">
	  <h3>父组件</h3>
	  <h4>资产：{{ money }}</h4>
	  <h4>汽车：{{ car }}</h4>
	  <button @click="money += 1">资产+1</button>
	  <button @click="car.price += 1">汽车价格+1</button>
	  <Child/>
	</div>
  </template>
  
  <script setup lang="ts" name="Father">
	import Child from './Child.vue'
	import { ref,reactive,provide } from "vue";
	// 数据
	let car = reactive({
	  brand:'奔驰',
	  price:100
	})

	let money = ref(100)
	// 用于更新money的方法
	function updateMoney(value:number){
	  money.value += value
	}
	// 提供数据、更新方法
	provide('moneyContext',{money,updateMoney})
	// 提供数据
	provide('car',car)
  </script>
```


```html
<template>
  <div class="child">
    <h3>我是孙组件</h3>
    <h4>资产：{{ money }}</h4>
    <h4>汽车：{{ car }}</h4>
    <button @click="updateMoney(6)">点我</button>
  </div>
</template>
  
<script setup lang="ts" name="Child">
import { inject } from "vue";
// 注入数据
let { money, updateMoney } = inject("moneyContext", {
  money: 0,
  updateMoney: (x: number) => {},
});

let car = inject("car");
</script>
```


### 兄弟/任意组件通信

任意组件间的通信常用的有mitt和pinia两种方式

#### mitt

mitt是一个具有事件发布订阅功能的包，可以实现任意组件间通信。

1. 安装mitt

```sh
npm install mitt -S
```

2. 创建`src\utils\emitter.ts`

```ts
// 引入mitt 
import mitt from "mitt";

// 创建emitter
const emitter = mitt()

// 创建并暴露mitt
export default emitter
```

3. 在组件中订阅事件

```ts
import emitter from "@/utils/emitter";
import { onUnmounted } from "vue";

// 绑定事件
emitter.on('SEND_TOY',(value)=>{
  console.log('SEND_TOY事件被触发',value)
})

onUnmounted(()=>{
  // 解绑事件
  emitter.off('SEND_TOY')
})
```

4. 触发事件

```ts
import emitter from "@/utils/emitter";

function sendToy(){
  // 触发事件
  emitter.emit('SEND_TOY',toy.value)
}
```

#### pinia

[pinia使用方法](./pinia.md)

## slot插槽

slot组件类似于一个占位标签，其内容等同于使用组件时组件包裹的内容。

### 默认插槽

```html
<!-- 父组件中： -->
  <Category title="今日热门游戏">
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
  </Category>

<!-- Category子组件中： -->
  <template>
    <div class="item">
      <h3>{{ title }}</h3>
      <slot></slot>
    </div>
  </template>
```

### 具名插槽

使用name属性可以命名插槽，默认插槽的名字是default`<slot name="default"></slot>`，可以省略，`#`是`v-slot:`的简写形式

```html
<!-- 父组件中： -->
  <Category title="今日热门游戏">
    <template v-slot:s1>
      <ul>
        <li v-for="g in games" :key="g.id">{{ g.name }}</li>
      </ul>
    </template>
    <template #s2>
      <a href="">更多</a>
    </template>
  </Category>

  
<!-- 子组件中： -->
  <template>
    <div class="item">
      <h3>{{ title }}</h3>
      <slot name="s1"></slot>
      <slot name="s2"></slot>
    </div>
  </template>
```

### 作用域插槽

组件想要向组件使用方提供数据，这时候可以用作用域插槽向外面暴露数据

```html
<!-- 父组件中：三种方式一样，params是包含所有属性的对象 -->
<!-- <Game v-slot:default="params"> -->
<!-- <Game #default="params"> -->
<Game v-slot="params">
  <ul>
    <li v-for="g in params.games" :key="g.id">{{ g.name }}</li>
  </ul>
</Game>

<!-- 子组件中： -->
<template>
  <div class="category">
    <h2>今日游戏榜单</h2>
    <slot :games="games" a="哈哈"></slot>
  </div>
</template>

<script setup lang="ts" name="Category">
  import {reactive} from 'vue'
  let games = reactive([
    {id:'asgdytsa01',name:'英雄联盟'},
    {id:'asgdytsa02',name:'王者荣耀'},
    {id:'asgdytsa03',name:'红色警戒'},
    {id:'asgdytsa04',name:'斗罗大陆'}
  ])
</script>
```

## 其他API

### shallowRef/shallowReactive

shallowRef创建一个浅层次的响应数据，只有`xxx.value`是响应式的，再深一层就不是了

```ts

<script setup lang="ts" name="Child">
import { onMounted, ref, shallowRef } from "vue";

const r = shallowRef({
    name: 'wmui',
    age: 18,
})
onMounted(() => {
    // 响应式的
    r.value = {name: 'haha', age: 20};

    // 非响应式的
    // r.value.name = 'haha'
})
</script>
```

shallowReactive创建一个浅层次的响应数据，只有`xxx.xx`是响应式，再深一层就不是了

```ts
<template>
  <div class="grand-child">
    <p>{{r.other.age}}</p>
    <button @click="r.other = {age: 20}">浅层次</button>
    <button @click="r.other.age = 18">深层次</button>
</div>
</template>
  
<script setup lang="ts" name="Child">
import { onMounted, reactive, ref, shallowReactive, shallowRef } from "vue";

const r = shallowReactive({
    name: 'wmui',
    other: {
        age: 18,
    }
})
</script>
```


### readonly/shallowReadonly

readonly创建一个响应式对象的只读副本，对象的所有嵌套属性都将变为只读，任何尝试修改这个对象的操作都会被阻止（在开发模式下，还会在控制台中发出警告），常用于创建不可变的状态快照和保护全局状态或配置不被修改

```js
const original = reactive({ ... });
const readOnlyCopy = readonly(original);
```

shallowReadonly与readonly 类似，但只作用于对象的顶层属性，对象内部的嵌套属性仍然是可变的，适用于只需保护对象顶层属性的场景

```js
const original = reactive({ ... });
const shallowReadOnlyCopy = shallowReadonly(original);
```

### toRaw/markRaw

toRaw 返回的对象不再是响应式的，不会触发视图更新。在需要将响应式对象传递给非 Vue 的库或外部系统时，使用 toRaw 可以确保它们收到的是普通对象。

```ts
let person = reactive({name:'tony',age:18})
// 原始对象
let rawPerson = toRaw(person)
```

markRaw标记一个对象，使其永远不会变成响应式的。例如使用mockjs时，为了防止误把mockjs变为响应式对象，可以使用 markRaw 去标记mockjs

```ts
/* markRaw */
let citys = markRaw([
  {id:'asdda01',name:'北京'},
  {id:'asdda02',name:'上海'},
  {id:'asdda03',name:'天津'},
  {id:'asdda04',name:'重庆'}
])
// 根据原始对象citys去创建响应式对象citys2 —— 创建失败，因为citys被markRaw标记了
let citys2 = reactive(citys)
```

### customRef

customRef用于创建一个自定义的ref，并对其依赖项跟踪和更新触发进行逻辑控制。

实现防抖效果（useSumRef.ts）：

```ts
import {customRef } from "vue";

export default function(initValue:string,delay:number){
  let msg = customRef((track,trigger)=>{
    let timer:number
    return {
      get(){
        track() // 告诉Vue数据msg很重要，要对msg持续关注，一旦变化就更新
        return initValue
      },
      set(value){
        clearTimeout(timer)
        timer = setTimeout(() => {
          initValue = value
          trigger() //通知Vue数据msg变化了
        }, delay);
      }
    }
  }) 
  return {msg}
}
```

```html
<template>
  <div class="father">
	<p>{{username}}</p>
    <input type="text" v-model="username" />
  </div>
</template>
  
<script setup lang="ts" name="Father">
import useSumRef from '../hooks/useSumRef'
let {msg: username} = useSumRef('', 300)
</script>
```


## 新增组件

### Teleport

Teleport 是一种能够将我们的组件html结构移动到指定位置的技术，常用于模态框、弹窗组件

```html
<teleport to='body' >
    <div class="modal" v-show="isShow">
      <h2>我是一个弹窗</h2>
      <p>我是弹窗中的一些内容</p>
      <button @click="isShow = false">关闭弹窗</button>
    </div>
</teleport>
```


### Suspense

Suspense用于异步组件等待时，渲染一些额外内容，让应用有更好的用户体验

```ts
import { defineAsyncComponent,Suspense } from "vue";
const Child = defineAsyncComponent(()=>import('./Child.vue'))
```

```html
<template>
    <div class="app">
        <Suspense>
          <template v-slot:default>
            <Child/>
          </template>
          <template v-slot:fallback>
            <h3>加载中.......</h3>
          </template>
        </Suspense>
    </div>
</template>
```

## 注意事项

以下是和vue2不同的地方

全局API转移到应用对象，如：

```js
app.component
app.config
app.directive
app.mount
app.unmount
app.use
```
- 过渡类名 `v-enter` 修改为 `v-enter-from`、过渡类名 `v-leave` 修改为 `v-leave-from`。


- `keyCode` 作为 `v-on` 修饰符的支持。

- `v-model` 指令在组件上的使用已经被重新设计，替换掉了 `v-bind.sync。`

- `v-if` 和 `v-for` 在同一个元素身上使用时的优先级发生了变化。

- 移除了`$on`、`$off` 和 `$once` 实例方法。

- 移除了过滤器 `filter`。

- 移除了`$children` 实例 `propert`。