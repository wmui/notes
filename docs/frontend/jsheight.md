# JavaScript高级

```js
function Demo() { // this.prototype = {}
    this.test2 = function() { console.log('test2')};
}

Demo.prototype.test = function() { console.log('test')};

const demo = new Demo(); // this.__proto__ = Demo.prototype

console.log(Demo.prototype);

// 核心一句话：实例的隐式原型（__proto__）指向构造函数的显式原型（prototype）
console.log(demo.__proto__ === Demo.prototype);
console.log(Demo.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);
console.log('====================================');

// 万物皆对象：函数Demo是Function的实例，Function是对象的实例
console.log(Demo.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log('====================================');


// 原型链：实例是通过隐式原型链(__proto__)完成定义在原型对象上的属性和方法的查找的

// 先去demo自身找，找到了
demo.test2();
// 先去demo自身找，没找到，再去demo.prototype上找，找到了
demo.test();
// 先去demo自身找，没找到，再去demo.prototype上找，没找到，再去Object.prototype上找，找到了
console.log(demo.toString())
```