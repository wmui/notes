# TypeScript

ts的核心是类型声明，通过类型声明指定ts的变量（形参、参数）类型，指定变量类型后，再为变量赋值时，ts编辑器会检查类型是否符合要求，如果不符合就会报错。

类型声明给变量设置了类型，使变量只能存储某种类型的值。

## 安装环境

```shell
// 安装tsc命令
npm install -g typescript

// 实时编译demo文件
tsc demo -w
```
## 基本语法

```js
let 变量: 类型;

let 变量: 类型 = 值;

function fn(参数: 类型, 参数: 类型): 类型{
    ...
}
```

ts有自动类型推断功能，如果变量的声明和赋值是同时进行的，ts编译器会自动判断变量类型，这时候可以省略类型声明。

## 类型

### string

```ts
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
```
### number

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

### boolean

```ts
let isDone: boolean = false;
```

### 联合类型

联合类型可以指定多个类型，使用`|`联合，表示赋值时只需要是其中的一种类型；使用`&`联合，表示同时满足多个类型

```ts
let color: 'red' | 'blue' | 0;
color = 'blue'
color = 0

let num: 1 | 2 | 3;
num = 1;

let other: string | boolean
other = false;
other = 'false'

let p:{name: string} & {age: number};
p = {name: 'wmui', age: 18}
```

### any

变量定义为any类型，任何类型值都能赋值给这个类型，any类型的值也可以赋值给任何其他类型，相当于关闭了类型检查。声明变量如果不分配类型， 默认就是any类型。

```ts

let color: any;
let age:number;

// 任意值赋值给any
color = 'blue'
color = 0

// any值赋值给任意类型
age = color

```


### unknown

unknown未知类型，任意类型值可以赋值给unknown类型，但是unkonwn类型不能赋值给其他已定义类型。

```ts
let color: unknown;
let age:number;

// 任意值赋值给unknown
color = 'blue'
color = 0

// unknown类型，不能值赋值给number类型
age = color
```

### void

void表示空，函数如果没有定义返回值，那么默认返回值类型就是void，所以undefined可以赋值给void类型（null不能赋给void类型）

```ts
let unusable: void = undefined;

function fn():void {

}
```

### never

never表示永远没有返回值，函数中如果throw错误，这个函数永远不会有返回值（never用的较少）

```ts
function fn(message: string): never {
  throw new Error(message);
}
```

void和never常用于定义函数值类型

### object

object对象类型，js中函数也是对象。

```ts
let person:object;

person = {};
person = function() {}
person = class {}
```

可以通多`{}`方式，约束对象的属性

```ts
let person: {name: string, age: number};

person = {name: 'wmui', age: 18}
```

通过`?`表示可选属性

```ts
let person: {name: string, age: number?};

person = {name: 'wmui'}
```

通过`[key:string]`表示任意属性

```ts
let person:{name: string, [key: string]: any};

// ok
person = {name: 'wmui'};
// ok
person = {name: 'wmui', age: 18}
```

通过`(arg:type, arg2:type) => type`表示函数类型

```ts
let sum:(a:number, b:number) => number;

sum = function(a, b) { return a + b}
```

### array

array约束数组中的每一个值都是同一种类型，通过`Array<type>`或`type[]`两种方式定义

```ts
let names:string[] = ['li', 'wang','zhang'];
let ages:number[] = [18, 90, 20];
```

```ts
let names:Array<string> = ['li', 'wang','zhang'];
let ages:Array<number>= [18, 90, 20];

// 任意类型
let persons:Array<any> = ['li', 20, false]
```

### tuple

tuple元组类型，就是固定长度的数组，用`[type, type]`表示

```ts
let x: [string, number];
x = ["hello", 10]; 
```

### enum

enum枚举类型，用于给一组相同类型的数据起一个语义化的名字，并可以直接使用这个语义化的名字。默认索引值从0开始，可以指定索引值。

```ts
enum Gender {
    male = 1,
    female = 0
}

// 1
console.log(Gender.male)

enum Gender2 {
    male,
    female
}
// 0
console.log(Gender2.male)
```

### 类型别名

通过type，可以给类型定义一个别名
```ts
// myType是别名
type myType = string | number;

let people:myType;
people = 'wmui';
people = 18
```

### 类型断言

有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：

使用`(value as type)`

```ts
let val: unknown = "this is a string";
let len: number = (val as string).length;
```

使用`(<type>value)`

```ts
let val: unknown = "this is a string";
let len: number = (<string>val).length;
```

## 编译选项

使用-w指令，可以在ts文件变化时自动编译`tsc xxx.ts -w`。

在项目目录下创建一个`tsconfig.json`文件，使用`tsc`命令，可以编译项目下的所有ts文件，`tsc -w`监听所有ts的变化。


tsconfig.json文件中可以添加注释，下面是常用配置项：



```json
{
    // 定义希望被编译文件所在的目录，默认值：["**/*"]，**表示任意目录，*表示任意文件
    "include":["src/**/*", "tests/**/*"],
    // 定义需要排除在外的目录，默认值：["node_modules", "bower_components", "jspm_packages"]
    "exclude": ["./src/hello/**/*"],
    // 定义被继承的配置文件，配置文件中会自动包含config目录下base.json中的所有配置信息
    "extends": "./configs/base",
    // 指定被编译文件的列表，只有需要编译的文件少时才会用到
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "tsc.ts"
    ],
    // compilerOptions中包含多个子选项，用来完成对编译的配置
    "compilerOptions": {
        // 设置ts代码编译的目标版本，ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext
        "target": "ES6",
        // 用来指定编译文件的根目录，编译器会在根目录查找入口文件，如果编译器发现以rootDir的值作为根目录查找入口文件并不会把所有文件加载进去的话会报错，但是不会停止编译
        "rootDir": '.',
        // 设置编译后代码使用的模块化系统，CommonJS（默认）、UMD、AMD、System、ES2020、ESNext、None
        "module": "CommonJS",
        // 指定项目中使用的库，默认包含浏览器环境的库
        "lib": ["ES6", "DOM"],
        // 编译后文件的所在目录，默认情况下，编译后的js文件会和ts文件位于相同的目录
        "outDir": "dist",
        // 将所有的文件编译为一个js文件，默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module指定了None、System或AMD则会将模块一起合并到文件之中
        "outFile": "dist/app.js",
        // 是否对js文件编译，默认false
        "allowJs": false,
        // 是否对js文件进行检查，默认false
        "checkJs": false,
        // 是否移除编译后的注释，默认false
        "removeComments": false,
        // 不输出编译后的文件，可用于检查ts语法是否符合要求
        "noEmit": false,
        // 有错误时不输出编译后的文件
        "noEmitOnError": false,
        // 严格模式，相当于添加了 'use strict';
        "alwaysStrict": true,
        // 禁止隐式的any类型
        "noImplicitAny": false,
        // 禁止类型不明确的this，比如this指向可能不同时
        "noImplicitThis": false,
        // 严格的空值检查，比如获取dom元素可能获取不到时
        "strictNullChecks": false,
        // 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
        "strict": true

    }
}
```

:::info
compilerOptions子项，如果不知道有哪些值可配置，可以通过写一个错误的值，编译时错误信息回输出可以配置的值，比如`"compilerOptions": { "target": "aaa" }`，不过vscode有默认提示哪些值可以配置
:::

## webpack配置

通过使用webpack，实现ts项目的开发和构建。ts默认的编译器有局限性，这些不足的功能可以通过webpack的插件和loader解决，比如tsc无法编译最新的js特性兼容到指定浏览器，它只能进行简单的语法转换。


1. 进入项目根目录，执行命令 `npm init -y`，创建package.json文件

2. `npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`

- webpack：构建工具webpack
- webpack-cli：webpack的命令行工具
- webpack-dev-server：webpack的开发服务器
- typescript：ts编译器
- ts-loader：ts加载器，用于在webpack中编译ts文件
- html-webpack-plugin：webpack中html插件，用来自动创建html文件，并自动引入编译后的js文件
- clean-webpack-plugin：webpack中的清除插件，每次构建都会先清除目录

3. `npm i -D @babel/core @babel/preset-env babel-loader core-js`

- @babel/core：babel的核心工具

- @babel/preset-env：babel的预定义环境

- @babel-loader：babel在webpack中的加载器

- core-js：core-js用来使老版本的浏览器支持新版ES语法


4. 根目录下创建webpack的配置文件webpack.config.js

```js
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: "bundle.js",

        // 告诉webpack不使用箭头
        // 默认打包后是一个立即执行的箭头函数，在IE 11中也是无法执行的！
        // 加上下面的配置，可以在webpack打包时，最外层不再是箭头函数
        // webpack新版本已经不想兼容IE了！233
        environment: {
            arrowFunction: false
        }
    },
    // 指定webpack打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                // Webpack在加载时是"从后向前"加载！
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        // package.json中的版本为3.8.1
                                        "corejs": "3",
                                        // 使用corejs的方式，"usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                // 要排除的文件
                exclude: /node-modules/
            }
        ]
    },

    // 配置Webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html"
        }),
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
```

5. 根目录下创建tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ES2015",
    "target": "ES2015",
    "strict": true
  }
}
```

6. 修改package.json，添加启动命令

```json
    "scripts": {
       "build": "webpack",
       "start": "webpack serve --open chrome.exe"
   },
```

最终的目录结构：

```
├src
 └index.html
 └demo.ts
├package.json
├tsconfig.json
├webpack.config.js
```

## class类

类就是对象的模型，有了模型才能创建对象。

```ts
    class Person{
        // 属性
        name: string;
        age: number;

        // 构造函数
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
        // 方法
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
```

### 封装

把和类相关的属性和方法，放在指定的类中就是封装。

#### 属性

属性有静态属性、公共属性、受保护属性和私有属性。

```ts
class Person {
    // 使用static修饰符定义静态属性，静态属性只能通过Person类读取和修改
    static  s:string = 'static';
    // 使用public修饰符定义共有属性（默认），共有属性可以在类、子类和实例对象中读取和修改
    public p:string = 'public';
    // 使用protected修饰符定义受保护属性，受保护属性只能在类和子类中读取和修改
    protected p2:string = 'protected'
    // 使用private修饰符定义私有属性，私有属性只能在类中读取和修改
    private p3:string = 'private'
    
}
```

static实例：

```ts
class Person {
    static country:string = 'cn';
    
}
// 通过类修改
Person.country = 'usa'
```

public示例：

```ts
class Person{
    public name: string;
    public age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以在类中修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{
    constructor(name: string, age: number){
        super(name, age);
        this.name = name; // 可以在子类中修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 可以通过实例对象修改
```

protected示例：


```ts
class Person{
    protected name: string;
    protected age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{
    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中可以修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 实例对象不能修改
```

private示例：

```ts
class Person{
    private name: string;
    private age: number;

    constructor(name: string, age: number){
        this.name = name; // 可以修改
        this.age = age;
    }

    sayHello(){
        console.log(`大家好，我是${this.name}`);
    }
}

class Employee extends Person{

    constructor(name: string, age: number){
        super(name, age);
        this.name = name; //子类中不能修改
    }
}

const p = new Person('孙悟空', 18);
p.name = '猪八戒';// 不能修改
```

当一个属性设置为private时，实例是无法操作这个属性的，但有时候却需要在外部读取或修改这个私有值，这时候可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器。读取属性的方法叫做setter方法，设置属性的方法叫做getter方法，这种保护属性的方式叫做属性的封装。

```ts
class Person{
    private _name: string;

    constructor(name: string){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

}

const p1 = new Person('孙悟空');
// 实际通过调用getter方法读取name属性
console.log(p1.name);
// 实际通过调用setter方法修改name属性 
p1.name = '猪八戒'; 
```

通过添加`readonly`，可以设置属性为只读的（不常用）

```ts
class Person {
    static  readonly s:string = 'static';
    public readonly p:string = 'public';
    protected readonly p2:string = 'protected'
    private readonly p3:string = 'private'
}
```

#### 方法

方法有静态方法、公共方法、受保护方法和私有方法，和属性的修饰符一样。方法没有readonly修饰符，因此方法是可以被重写的。

### 继承

通过继承可以将其他类中的属性和方法引入到当前类中，相当于把其他类中的属性和方法直接复制到了当前类。如果有重名的，以当前类的为准。当前类中如果显示定义了构造函数，那么必需在这个构造函数中先调用super()，super代表了父类。

```ts
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

class Dog extends Animal{

    bark(){
        console.log(`${this.name}在汪汪叫！`);
    }
}

const dog = new Dog('旺财', 4);
dog.bark();
```

### 多态

子类通过重写父类中的同名方法，实现不同的功能，这种特征被称为多态。

```ts
class Animal{
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    run(){
        console.log(`父类中的run方法！`);
    }
}

class Dog extends Animal{

    bark(){
        console.log(`${this.name}在汪汪叫！`);
    }

    run(){
        console.log(`子类中的run方法，会重写父类中的run方法！`);
    }
}

const dog = new Dog('旺财', 4);
dog.bark();
```

### 抽象类

抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例。使用abstract开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现;

```ts
abstract class Animal{
  abstract run(): void;
  bark(){
      console.log('动物在叫~');
  }
}

class Dog extends Animals{
  run(){
      console.log('狗在跑~');
  }
}
```

## interface接口

接口的作用类似于抽象类，不同点在于接口中的所有方法都是抽象方法，接口主要负责定义一个类或对象的结构，对象或类只有实现接口中定义的所有属性和方法时才能匹配接口。


### 对象实现接口

```ts
interface Person{
    name: string;
    sayHello():void;
}

function fn(per: Person){
    per.sayHello();
}

const p  ={
    name:'孙悟空', 
    sayHello() {console.log(`Hello, 我是 ${this.name}`)}
}
fn(p);
```
### 类实现接口
```ts
interface Person{
   name: string;
   sayHello():void;
}

class Student implements Person{
   constructor(public name: string) {
   }

   sayHello() {
       console.log('大家好，我是'+this.name);
   }
}
```
### 同名接口

接口是可以重名的，重名后内部的约束相当于合并了

```ts
interface Person {
    name: string;
    age: number;
}

interface Person {
    gender:number;
}

const person:Person = {
    name: 'wmui',
    age: 18,
    gender: 1
}
```

## generic泛型

泛型就是不确定的类型，其类型由使用时传递的类型决定。当定义一个函数或类时，不确定返回值、参数、属性的类型时，可以用泛型表示。

### 泛型函数

```ts
function test<T>(arg: T): T{
    return arg;
}

// 直接使用，ts自动推断类型
test(10);

// 指定类型，有时编译器无法自动推断时使用
test<number>(10);
```

这里的`<T>`就是泛型，T是我们给这个类型起的名字（不一定非叫T），设置泛型后即可在函数中使用T来表示该类型。

### 函数中声明多个泛型

```ts
function test<T, K>(a: T, b: K): K{
  return b;
}

test<number, string>(10, "hello");
```

### 泛型类

```ts
class Person<T>{
  prop: T;

  constructor(prop: T){
      this.prop = prop;
  }
}

// 使用
const person = new Person<string>('hello');
```

### 泛型继承

使用`T extends MyInter`表示泛型T必须是`MyInter`的子类，不一定非要使用接口类，抽象类同样适用；

```ts
interface MyInter{
  length: number;
}

function test<T extends MyInter>(arg: T): number{
  return arg.length;
}

// ok
test('hello')

// 不行
test(123)
```