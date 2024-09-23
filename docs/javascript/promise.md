# Promise

Promise对象是JS中解决异步编程的一种方案，在此之前使用的是回调函数。Promise通过包装一个异步操作，获取成功或是失败的返回值。

### Promise对象三种状态

- 初始状态`pending`，通过`new Promise(() => {})`查看；
- 成功状态`fulfilled`，通过 `Promise.resolve()`查看；
- 失败状态`rejected`，通过`Promise.reject()`查看；

### Promise对象改变状态

Promise对象的状态改变有两种：pending=》fulfilled 和 pending=》rejected

#### pending=》fulfilled 

通过执行resolve函数，可以把状态改为fulfilled

```js
const p = new Promise((resolve, reject) => {
    resolve(1);
});
console.log(p)

// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 1
```

```js
const p = new Promise((resolve, reject) => {
    return 1
});

console.log(p)

// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 1
```

#### pending=》rejected，

通过执行reject函数或抛出一个错误，可以把状态改为rejected

```js
const p = new Promise((resolve, reject) => {
    reject(1)
});

console.log(p)

// [[Prototype]]: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: 1
```


```js
const p = new Promise((resolve, reject) => {
    throw 1
});

console.log(p)

// [[Prototype]]: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: 1
```


promise状态改变只发生一次，一旦fulfilled或rejected，后续不再改变状态

```js
const p1 = new Promise((resolve, reject) => {
    resolve(1);
    reject(2);
});
console.log(p1)
// 一直是fulfilled状态
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 1
```

### Promise封装ajax请求


```js
function ajax(url){
    return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState !== 4) return
            if(xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(new Error(`请求失败：${xhr.status}`))
            }
        }
    })
}
```

### then方法和catch方法

在`new Promise(excutor)`中，excutor执行器是同步执行的，但内部的resolve和reject函数是异步执行的:

```js
    const p = new Promise((resolve, reject) => {
        // 同步
        console.log(1)
        // 异步
        resolve(2)
    })

    p.then((val) => {
        console.log(val)
    })
    // 同步
    console.log(3)
    // 1  3  2
```

then方法和catch方法中，只有在promise状态发生改变时，里面的回调函数才会执行。

```js
   const p = new Promise((resolve, reject) => {
        return 1
    });

    // 因为p一直是pending状态，所以回调不执行
    p.then(val => {
        console.log(val)
    })
```

当状态变为fulfilled时，then方法会执行，如果有多个then方法，他们都会执行。

then方法的返回值是一个promise对象，因此可以链式调用，返回值的状态和结果取决于then方法中回调函数的返回结果：

- 如果回调函数返回一个非promise对象，那么promise的状态变为fulfilled，值为一般返回值

```js
const p = new Promise((resolve, reject) => {
    resolve()
});


const p2 = p.then(() => {
    return 1
})

console.log(p2)

// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 1
```

- 如果回调函数抛出一个错误，那么promise的状态变为rejected，值为错误值

```js
const p = new Promise((resolve, reject) => {
    resolve()
});


const p2 = p.then(() => {
    throw 'err'
})

console.log(p2)

// [[Prototype]]: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: "err"
```

- 如果回调函数返回一个promise对象，那么promise的状态和值取决于返回的这个promise对象

```js
   const p = new Promise((resolve, reject) => {
        resolve()
    });


    const p2 = p.then(() => {
        return new Promise(() => {})
    })
    const p3 = p.then(() => {
        return Promise.resolve(1)
    })
    const p4 = p.then(() => {
        return Promise.reject('err')
    })
    console.log(p2, p3, p4)

// [[Prototype]]: Promise
// [[PromiseState]]: "pending"
// [[PromiseResult]]: undefined

// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 1

// [[Prototype]]: Promise
// [[PromiseState]]: "rejected"
// [[PromiseResult]]: 'err'
```

当状态变为rejected时，catch方法会执行，如果有多个catch方法，他们都会执行。

catch方法的返回值是一个promise对象，因此可以链式调用（链式调用只执行第一个catch），返回值的状态和结果取决于catch方法中回调函数的返回结果(和then方法的规则一样)

```js
const p = new Promise((resolve, reject) => {reject('err')})

// 这两种方式是一样的
p.catch(() => {}) 
p.then(null, () => {})
```

### Promise异常穿透

在promise链式调用中，如果出现了异常可以在最后指定一个catch函数，前面操作中的异常会传到最后这个失败的回调函数中

### Promise中断链式

只有一种方法能够中断链式调用，在回调函数中返回一个pending状态的promise对象

```js

const p = new Promise((resolve, reject) => {
    resolve()
});


p.then(() => {
    return new Promise(() => {})
}).then(() => {
// 不执行
console.log(1)
}).catch((err) => {
// 不执行
console.log(err)
})

```

### Promise静态方法

以下所有静态方法的返回结果都是一个promise对象

Promise.resolve(val): val如果是非promise值，返回状态为fulfilled，返回值为val值；如果是promise，值和状态是这个promise

Promise.reject(val): val无论是什么值，返回状态都是rejected，返回值为val。

Promise.all(val): val为promise数组，如果val中的promise都成功，返回状态为fulfilled，返回值为数组；如果有一个失败，返回状态为rejected，返回值为错误值（非数组）

Promise.race(val): val为promise数组，返回最先有结果的promise的值和状态，可能是fulfilled，也可能是rejected。


