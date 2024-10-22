# JavaScript基础

## 字面量

字面量其实就是一个值，它所代表的含义就是它字面的意思， 比如：1 2 3 4 100 "hello" true null .....，在js中所有的字面量都可以直接使用，但是直接使用字面量并不方便。

## 变量

变量可以用“存储”字面量，并且变量中存储的字面量可以随意的修改，通过变量可以对字面量进行描述，并且变量比较方便修改，变量是给字面量起一个别名。

变量中并不存储任何值，而是存储值的内存地址！

## 常量

在JS中，使用const声明常量，常量只能赋值一次，重复赋值会报错。在JS中除了常规的常量外，有一些对象类型的数据我们也可以声明为常量。

## 标识符

在JS中，所有可以由我们自主命名的内容，都可以认为是一个标识符，比如变量名、函数名、类名。使用标识符需要遵循如下的命名规范：

1. 标识符只能含有字母、数字、下划线、$，且不能以数字开头
2. 标识符不能是JS中的关键字和保留字，也不建议使用内置的函数或类名作为变量名
3. 命名规范：
    - 通常会使用驼峰命名法
    - 类名会使用大驼峰命名法
    - 常量的字母会全部大写

```js
maxlength --> maxLength
maxlength --> MaxLength
MAX_LENGTH
```

## 数据类型

### 字符串（String）

String：在JS中使用单引号或双引号来表示字符串，使用反单引号 ` 来表示模板字符串。

### 数值（Number）

Number：在JS中所有的整数和浮点数都是Number类型；

- JS中的数值并不是无限大的，当数值超过一定范围后会显示近似值；
- Infinity 是一个特殊的数值表示无穷；
- NaN 也是一个特殊的数值，表示非法的数值

大整数（BigInt）：
- 大整数用来表示一些比较大的整数，大整数使用n结尾，它可以表示的数字范围是无限大。

其他进制的数字： 
- 二进制 0b；八进制 0o ；十六进制 0x

### 布尔值（Boolean）

- 布尔值主要用来进行逻辑判断
- 布尔值只有两个true 和 false
- 使用typeof检查一个布尔值时会返回 "boolean"

### 空值 （Null）

- 空值用来表示空对象
- 空值只有一个 null
- 使用typeof检查一个空值时会返回"object"
- 使用typeof无法检查空值

### 未定义（Undefined）

- 当声明一个变量而没有赋值时，它的值就是Undefined
- Undefined类型的值只有一个就是 undefined
- 使用typeof检查一个Undefined类型的值时，会返回 "undefined"

### 符号（Symbol）

- 用来创建一个唯一的标识    
- 使用typeof检查符号时会返回 "symbol"

JS中原始值一共有七种：

1. Number
2. BigInt
3. String
4. Boolean
5. Null
6. Undefined
7. Symbol

七种原始值是构成各种数据的基石，原始值在JS中是不可变类型，一旦创建就不能修改。

## 类型转换

类型转换指将一种数据类型转换为其他类型，通常是字符串、数值和布尔值之间的互转。

### 转为字符串

调用toString()方法将其他类型转换为字符串

```js
(1).toString(); // 数字加圆括号包裹，防止后面的点被单做小数点
true.toString();
```
由于null和undefined中没有toString()，所以对这两个东西调用toString()时会报错

```js
null.toString(); // error
undefined.toString(); // error
```


调用String()函数将其他类型转换为字符串。

```js
String(null); // 'null'
String(1); // '1'
```

对于拥有toString()方法的值调用String()函数时，实际上就是在调用toString()方法。

对于null，则直接转换为"null"；对于undefined，直接转换为"undefined"

### 转为数值

使用Number()函数来将其他类型转换为数值

字符串:
- 如果字符串是一个合法的数字，则会自动转换为对应的数字
- 如果字符串不是合法数字，则转换为NaN
- 如果字符串是空串或纯空格的字符串，则转换为0

布尔值:
- true转换为1，false转换为0

null、undefined:
- null 转换为 0
- undefined 转换为 NaN

parseInt(): 
- 将一个字符串转换为一个整数
- 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的整数
- 也可以使用parseInt()来对一个数字进行取整

```js
console.log(parseInt('100px')); // 100
```

parseFloat():
- 将一个字符串转换为浮点数 
- 解析时，会自左向右读取一个字符串，直到读取到字符串中所有的有效的小数

### 转为布尔值

使用Boolean()函数来将其他类型转换为布尔值

数字:
- 0 和 NaN 转换为false
- 其余是true

字符串:
- 空串 转换为 false
- 其余是true

null、undefined:
- null、undefined 都转换为 false

对象:
- 对象会转换为true

所有表示空性的没有的错误的值都会转换为false：0、NaN、空串、null、undefined、false

## 隐式类型转换

```
转换为字符串
    显式转换
        String()
    隐式转换
        + ""
转换为数值
    显式转换
        Number()
    隐式转换
        +
转换为布尔值
    显式转换
        Boolean()
    隐式转换
        !!
```

## 运算符

运算符可以用来对一个或多个操作数（值）进行运算

### 算术运算符

```
+ 加法运算符
- 减法运算符
* 乘法运算符
/ 除法运算符
** 幂运算
% 模运算，两个数相除取余数
```

**注意：** 算术运算时，除了字符串的加法，其他运算的操作数是非数值时，都会转换为数值然后再运算


```js
// 任意一个值和字符串做加法运算时，它会先将其他值转换为字符串，然后再做拼串的操作
'1'+1; // '11'

// 他运算的操作数是非数值时，都会转换为数值然后再运算
true + 1; // 2;
```

###  赋值运算符

赋值运算符用来将一个值赋值给一个变量，一个变量只有在`=`左边时才是变量，在`=`右边时它是值


```js
=
    - 将符号右侧的值赋值给左侧的变量
??=
    - 空赋值
    - 只有当变量的值为null或undefined时才会对变量进行赋值
+=
    - a += n 等价于 a = a + n
-=
    - a -= n 等价于 a = a - n
*=
    - a *= n 等价于 a = a * n
/=
    - a /= n 等价于 a = a / n
%=
    - a %= n 等价于 a = a % n
**=
    - a **= n 等价于 a = a ** n
```

```js
const a = { duration: 50 };

a.speed ??= 25;
console.log(a.speed);
// Expected output: 25

a.duration ??= 10;
console.log(a.duration);
// Expected output: 50
```

### 一元+-

```
+ 正号: 不会改变数值的符号
- 负号: 可以对数值进行符号位取反
```

当我们对非数值类型进行正负运算时，会先将其转换为数值然后再运算

```js
let b = '123'
b = +b // b = Number(b)
```

### 自增和自减

```
++ 自增运算符:
- ++ 使用后会使得原来的变量立刻增加1
- 自增分为前自增(++a)和后自增(a++)
- 无论是++a还是a++都会使原变量立刻增加1
- 不同的是++a和a++所返回的值不同，a++ 是自增前的值（旧值），++a 是自增后的值（新值）
```

```
-- 自减运算符
- 使用后会使得原来的变量立刻减小1
- 自减分为前自减(--a)和后自减(a--)
- 无论是--a还是a--都会使原变量立刻减少1
- 不同的是--a和a--的返回值不同，--a 是新值，a-- 是旧值
```

### 逻辑运算符

```js
! 逻辑非
- ! 可以用来对一个值进行非运算
- 它可以对一个布尔值进行取反操作
    true --> false
    false --> true
- 如果对一个非布尔值进行取反，它会先将其转换为布尔值然后再取反，可以利用这个特点将其他类型转换为布尔值

```

```js
&& 逻辑与
- 可以对两个值进行与运算
- 当&&左右都为true时，则返回true，否则返回false
- 与运算是短路的与，如果第一个值为false，则不看第二个值
- 与运算是找false的，如果找到false则直接返回，没有false才会返回true
- 对于非布尔值进行与运算，它会转换为布尔值然后运算
    但是最终会返回原值
    - 如果第一个值为false，则直接返回第一个值
        如果第一个值为true，则返回第二个值
```

```js
 || 逻辑或
- 可以对两个值进行或运算
- 当||左右有true时，则返回true，否则返回false
- 或运算也是短路的或，如果第一个值为true，则不看第二个值
- 或运算是找true，如果找到true则直接返回，没有true才会返回false
- 对于非布尔值或运算，它会转换为布尔值然后运算
    但是最终会返回原值
    - 如果第一个值为true，则返回第一个
        如果第一个值为false，则返回第二个
```

### 关系运算符

关系运算符用来检查两个值之间的关系是否成立，成立返回true，不成立返回false


```js
>
    - 用来检查左值是否大于右值
>=
    - 用来检查左值是否大于或等于右值
<
    - 用来检查左值是否小于右值
<=
    - 用来检查左值是否小于或等于右值
```

- 当对非数值进行关系运算时，它会先将前转换为数值然后再比较
- 当关系运算符的两端是两个字符串，它不会将字符串转换为数值，而是逐位的比较字符的Unicode编码，利用这个特点可以对字符串按照字母排序  
- 注意比较两个字符串格式的数字时一定要进行类型转换

```js
let a = 100;
// 注意这是两个运算：先运算的1<a，结果是false，也就是0；然后 0 < 100，返回true
console.log(1 < a < 10); // true

console.log(a > 1 && a< 10); // false
```

### 相等运算符

```js
 ==
    - 相等运算符，用来比较两个值是否相等
    - 使用相等运算符比较两个不同类型的值时，
        它会将其转换为相同的类型（通常转换为数值）然后再比较
        类型转换后值相同也会返回true
    - null和undefined进行相等比较时会返回true（没有隐式类型转换为数值）
    - NaN不和任何值相等，包括它自身
===
    - 全等运算符，用来比较两个值是否全等
    - 它不会进行自动的类型转换，如果两个值的类型不同直接返回false
    - null和undefined进行全等比较时会返回false

!=
    - 不等，用来检查两个值是否不相等
    - 会自动的进行类型转换
!==
    - 不全等，比较两个值是否不全等
    - 不和自动的类型转换
```

### 条件运算符

条件表达式 ? 表达式1 : 表达式2

条件运算符在执行时，会先对条件表达式进行求值判断，如果结果为true，则执行表达式1，如果结果为false，则执行表达式2

```js
false ? alert(1) : alert(2)
```

### 运算符优先级

和数学一样，JS中的运算符也有优先级，比如先乘除和加减。

[查看运算符优先级](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

在表格中位置越靠上的优先级越高，优先级越高越先执行，优先级一样自左向右执行

## 流程控制

流程控制语句可以用来改变程序执行的顺序

使用 `{}` 来创建代码块，代码块可以用来对代码进行分组，同一个代码中的代码，就是同一组代码，一个代码块中的代码要么都执行要么都不执行

在JS中，使用let声明的变量具有块作用域，在代码块中声明的变量无法在代码块的外部访问。使用var声明的变量，不具有块作用域。

### if语句

```js
- 语法：
    if(条件表达式){
        语句...
    }

 - 执行流程
    if语句在执行会先对if后的条件表达式进行求值判断，
        如果结果为true，则执行if后的语句
        如果为false则不执行

    if语句只会控制紧随其后其后的那一行代码，如果希望可以控制多行代码，可以使用{}将语句扩起来
        最佳实践：即使if后只有1行代码，我们也应该编写代码块，这样结构会更加的清晰

    如果if中的条件表达式不是布尔值，会转换为布尔值然后再运算
```

### if-else语句

```js
- 语法：
    if(条件表达式){
        语句...
    }else{
        语句...
    }

- 执行流程：
    if-else执行时，先对条件表达式进行求值判断，
        如果结果为true 则执行if后的语句
        如果结果为false 则执行else后的语句
```

### if-else if-else语句

```js
- 语法：
    if(条件表达式){
        语句...
    }else if(条件表达式){
        语句...
    }else if(条件表达式){
        语句...
    }else if(条件表达式){
        语句...
    }else{
        语句...
    }
- 执行流程：
    if-else if-else语句，会自上向下依次对if后的条件表达式进行求值判断，
        如果条件表达式结果为true，则执行当前if后的语句，执行完毕语句结束
        如果条件表达式结果为false，则继续向下判断，直到找到true为止
        如果所有的条件表达式都是false，则执行else后的语句

    注意：
        if-else if-else语句中只会有一个代码块被执行，
            一旦有执行的代码块，下边的条件都不会在继续判断了
            所以一定要注意，条件的编写顺序

```


### switch语句

```js

switch语句
- 语法：
    switch(表达式){
        case 表达式:
            代码...
            break
        case 表达式:
            代码...
            break
        case 表达式:
            代码...
            break
        case 表达式:
            代码...
            break
        default:
            代码...
            break
    }

- 执行的流程
    switch语句在执行时，会依次将switch后的表达式和case后的表达式进行全等比较
        如果比较结果为true，则自当前case处开始执行代码
        如果比较结果为false，则继续比较其他case后的表达式，直到找到true为止
        如果所有的比较都是false，则执行default后的语句

- 注意：
    当比较结果为true时，会从当前case处开始执行代码
        也就是说case是代码执行的起始位置
    这就意味着只要是当前case后的代码，都会执行
    可以使用break来避免执行其他的case

- 总结
    switch语句和if语句的功能是重复，switch能做的事if也能做，反之亦然。
        它们最大的不同在于，switch在多个全等判断时，结构比较清晰

```

### 循环语句

通过循环语句可以使指定的代码反复执行，JS中一共有三种循环语句

- while语句
- do-while语句
- for语句

通常编写一个循环，要有三个要件: 

1. 初始化表达式（初始化变量）
2. 条件表达式（设置循环运行的条件）
3. 更新表单式（修改初始化变量）

### while循环


```js
- 语法：
    while(条件表达式){
        语句...
    }

- 执行流程：
    while语句在执行时，会先对条件表达式进行判断，
        如果结果为true，则执行循环体，执行完毕，继续判断
        如果为true，则再次执行循环体，执行完毕，继续判断，如此重复
        知道条件表达式结果为false时，循环结束
```

```js
let i = 5;
while(i>0){
    console.log(i)
    i--
}
```

### do-while循环

```js

- 语法：
    do{
        语句...
    }while(条件表达式)

- 执行顺序：
    do-while语句在执行时，会先执行do后的循环体，
        执行完毕后，会对while后的条件表达式进行判断
        如果为false，则循环终止
        如果为true，则继续执行循环体，以此类推

    和while的区别：
        while语句是先判断再执行
        do-while语句是先执行再判断

        实质的区别：
            do-while语句可以确保循环至少执行一次
```

```js
let i = 5
do{
    console.log(i)
    i--
}while(i > 0)
```

### for循环

for循环和while没有本质区别，都是用来反复执行代码，不同点就是语法结构，for循环更加清晰

```js
- 不同点就是语法结构，for循环更加清晰
- 语法：
    for(①初始化表达式; ②条件表达式; ④更新表达式){
        ③语句...
    }

- 执行流程：
    ① 执行初始化表达式，初始化变量
    ② 执行条件表达式，判断循环是否执行（true执行，false终止）
    ③ 判断结果为true，则执行循环体
    ④ 执行更新表达式，对初始化变量进行修改
    ⑤ 重复②，知道判断为false为止
- 初始化表达式，在循环的整个的生命周期中只会执行1次
- for循环中的三个表达式都可以省略
- 使用let在for循环的()中声明的变量是局部变量，只能在for循环内部访问
    使用var在for循环的()中声明的变量可以在for循环的外部访问
- 创建死循环的方式：
    while(1){}
    for(;;){}
```

```js
 for(let i=0; i<5; i++){
    console.log(i)
}
```

### break和continue

```js
 - break
    - break用来终止switch和循环语句
    - break执行后，当前的switch或循环会立刻停止
    - break会终止离他最近的循环

- continue
    - continue用来跳过当次循环
```

```js
for (let i = 0; i < 5; i++) {
    console.log(i)

    for (let j = 0; j < 5; j++) {
        if (j === 1) continue
        console.log("内层循环--->", j)
    }
}
```

## 对象

对象是JS中的一种复合数据类型，它相当于一个容器，在对象中可以存储各种不同类型数据。

### 操作对象

```js
对象中可以存储多个各种类型的数据
    对象中存储的数据，我们称为属性

向对象中添加属性：
    对象.属性名 = 属性值

读取对象中的属性
    对象.属性名
    - 如果读取的是一个对象中没有的属性
        不会报错而是返回undefined
```

```js
// 创建对象
let obj = Object()

// 添加属性
obj.name = "孙悟空"
obj.age = 18
obj.gender = "男"

// 修改属性
obj.name = "Tom sun"

// 删除属性
delete obj.name

console.log(obj.name)
```


```js
属性名
    - 通常属性名就是一个字符串，所以属性名可以是任何值，没有什么特殊要求
        但是如果你的属性名太特殊了，不能直接使用，需要使用[]来设置
        虽然如此，但是我们还是强烈建议属性名也按照标识符的规范命名

    - 也可以使用符号（symbol）作为属性名，来添加属性
        获取这种属性时，也必须使用symbol
        使用symbol添加的属性，通常是那些不希望被外界访问的属性

    - 使用[]去操作属性时，可以使用变量

属性值
    - 对象的属性值可以是任意的数据类型，也可以是一个对象

使用typeof检查一个对象时，会返回object
```

```js
let obj = Object();

obj.name = "孙悟空"
obj.if = "哈哈" // 不建议
obj.let = "嘻嘻"// 不建议
obj["1231312@#@!#!#!"] = "呵呵"// 不建议

let mySymbol = Symbol()
let newSymbol = Symbol()
// 使用symbol作为属性名
obj[mySymbol] = "通过symbol添加的属性"
```

### in 运算符

```js
in 运算符
    - 用来检查对象中是否含有某个属性
语法 
    - 属性名 in obj
    - 如果有返回true，没有返回false
```

```js
console.log("name" in obj)
```

### 对象字面量

```js
- 可以直接使用{} 来创建对象
- 使用{}所创建的对象，可以直接向对象中添加属性
- 语法：
    {
        属性名:属性值,
        [属性名]:属性值,
    }

let obj2 = {
    name:"孙悟空", 
    age:18,
    ["gender"]:"男",
    [Symbol()]:"特殊的属性",
    hello:{
        a:1,
        b:true
    }
}
```

### 枚举属性

枚举属性，指将对象中的所有的属性全部获取

```js
for-in语句
- 语法：
    for(let propName in 对象){
        语句...
    }

- for-in的循环体会执行多次，有几个属性就会执行几次，
    每次执行时，都会将一个属性名赋值给我们所定义的变量

- 注意：并不是所有的属性都可以枚举，比如 使用符号添加的属性
```

```js
let obj = {
    name:'孙悟空',
    age:18,
    gender:"男",
    address:"花果山",
    [Symbol()]:"测试的属性" // 符号添加的属性是不能枚举
}

for(let propName in obj){
    console.log(propName, obj[propName])
}
```

### 方法（method）

当一个对象的属性指向一个函数，那么我们就称这个函数是该对象的方法，调用函数就称为调用对象的方法

## 函数

```js

函数（Function）
    - 函数也是一个对象
    - 它具有其他对象所有的功能
    - 函数中可以存储代码，且可以在需要时调用这些代码

语法：
    function 函数名(){
        语句...
    }

调用函数：
    - 调用函数就是执行函数中存储的代码
    - 语法：
        函数对象()

使用typeof检查函数对象时会返回function
```

### 定义函数

```js
1.函数声明
    function 函数名(){
        语句...
    }

2.函数表达式
    const 变量 = function(){
        语句...
    }

3.箭头函数
    () => {
        语句...
    }
```

### 参数

```js

形式参数
    - 在定义函数时，可以在函数中指定数量不等的形式参数（形参）
    - 在函数中定义形参，就相当于在函数内部声明了对应的变量但是没有赋值

实际参数
    - 在调用函数时，可以在函数的()传递数量不等的实参
    - 实参会赋值给其对应的形参
    - 参数：
        1.如果实参和形参数量相同，则对应的实参赋值给对应的形参
        2.如果实参多余形参，则多余的实参不会使用
        3.如果形参多余实参，则多余的形参为undefined

    - 参数的类型
        - JS中不会检查参数的类型，可以传递任何类型的值作为参数

1.函数声明
        function 函数名([参数]){
            语句...
        }

2.函数表达式
    const 变量 = function([参数]){
        语句...
    }

3.箭头函数
    ([参数]) => {
        语句...
    }
```

### 返回值

```js

- 在函数中，可以通过return关键字来指定函数的返回值
    返回值就是函数的执行结果，函数调用完毕返回值便会作为结果返回

- 任何值都可以作为返回值使用（包括对象和函数之类）
    如果return后不跟任何值，则相当于返回undefined
    如果不写return，那么函数的返回值依然是undefined

- return一执行函数立即结束

function sum(a, b) {
return a + b
}
```

### 作用域

作用域指的是一个变量的可见区域，作用域有两种：

```js
全局作用域
    - 全局作用域在网页运行时创建，在网页关闭时消耗
    - 所有直接编写到script标签中的代码都位于全局作用域中
    - 全局作用域中的变量是全局变量，可以在任意位置访问

局部作用域
    - 函数作用域
        - 函数作用域在函数调用时产生，调用结束后销毁
        - 函数每次调用都会产生一个全新的函数作用域
        - 在函数中定义的变量是局部变量，只能在函数内部访问，外部无法访问
    - 块作用域
        - 块作用域是一种局部作用域
        - 块作用域在代码块执行时创建，代码块执行完毕它就销毁
        - 在块作用域中声明的变量是局部变量，只能在块内部访问，外部无法访问
```

```js
let a = "变量a"

{
    let b = "变量b"

    {
        {
            console.log(b)
        }
    }
}

{
    console.log(b)
}
```

### 作用域链

```js
  - 当我们使用一个变量时，
    JS解释器会优先在当前作用域中寻找变量，
        如果找到了则直接使用
        如果没找到，则去上一层作用域中寻找，找到了则使用
        如果没找到，则继续去上一层寻找，以此类推
        如果一直到全局作用域都没找到，则报错 xxx is not defined
```

###  Window对象

- 在浏览器中，浏览器为我们提供了一个window对象，可以直接访问
- window对象代表的是浏览器窗口，通过该对象可以对浏览器窗口进行各种操作
    除此之外window对象还负责存储JS中的内置对象和浏览器的宿主对象
- window对象的属性可以通过window对象访问，也可以直接访问
- 函数就可以认为是window对象的方法


```js
var b = 20 // window.b = 20

function fn(){
    alert('我是fn')
}
```
- 在全局中使用var声明的变量，都会作为window对象的属性保存
- 使用function声明的函数，都会作为window的方法保存
- 使用let声明的变量不会存储在window对象中，而存在一个秘密的小地方（无法访问）
- var虽然没有块作用域，但有函数作用域

```js
function fn2(){
    var d = 10 // var虽然没有块作用域，但有函数作用域
    d = 10 // 在局部作用域中，如果没有使用var或let声明变量，则变量会自动成为window对象的属性 也就是全局变量

}
```

### 声明提升

```
变量的提升
    - 使用var声明的变量，它会在所有代码执行前被声明
        所以我们可以在变量声明前就访问变量

函数的提升
    - 使用函数声明创建的函数，会在其他代码执行前被创建
        所以我们可以在函数声明前调用函数


let声明的变量实际也会提升，但是在赋值之前解释器禁止对该变量的访问
```

### 立即执行函数

在开发中应该尽量减少直接在全局作用域中编写代码！

所以我们的代码要尽量编写的局部作用域

如果使用let声明的变量，可以使用{}来创建块作用域

```js
{
    let a = 10
}
```

立即执行函数（IIFE）

- 立即是一个匿名的函数，并它只会调用一次
- 可以利用IIFE来创建一个一次性的函数作用域，避免变量冲突的问题

```js
(function(){
    let a = 10
    console.log(111)
}());

 (function(){
    let a = 20
    console.log(222)
}())
```

### this

```
- 函数在调用时，JS解析器每次都会传递进一个隐含的参数
- 这个参数就叫做 this
- this会指向一个对象
    - this所指向的对象会根据函数调用方式的不同而不同
        1.以函数形式调用时，this指向的是window
        2.以方法的形式调用时，this指向的是调用方法的对象
        ...

- 通过this可以在方法中引用调用方法的对象

- 箭头函数没有自己的this，它的this有外层作用域决定，箭头函数的this和它的调用方式无关
```

关于this的详细内容，可以查看[JavaScript高级](./jsheight.md)

## 严格模式

```js
JS运行代码的模式有两种：
- 正常模式
    - 默认情况下代码都运行在正常模式中，
        在正常模式，语法检查并不严格
        它的原则是：能不报错的地方尽量不报错
    - 这种处理方式导致代码的运行性能较差

- 严格模式
    - 在严格模式下，语法检查变得严格
        1.禁止一些语法
        2.更容易报错
        3.提升了性能

- 在开发中，应该尽量使用严格模式，
    这样可以将一些隐藏的问题消灭在萌芽阶段，
        同时也能提升代码的运行性能
```

```js
"use strict" // 全局的严格模式

let a = 10

// console.log(a)

function fn(){
    "use strict" // 函数的严格的模式
}
```

## 面向对象

面向对象编程（OOP）

1. 程序是干嘛的？
    - 程序就是对现实世界的抽象（照片就是对人的抽象）
2. 对象是干嘛的？
    - 一个事物抽象到程序中后就变成了对象
    - 在程序的世界中，一切皆对象
3. 面向对象的编程
    - 面向对象的编程指，程序中的所有操作都是通过对象来完成
    - 做任何事情之前都需要先找到它的对象，然后通过对象来完成各种操作

### 类

1. 类是对象模板，可以将对象中的属性和方法直接定义在类中，定义后，就可以直接通过类来创建对象
2. 通过同一个类创建的对象，我们称为同类对象
    - 可以使用instanceof来检查一个对象是否是由某个类创建
    - 如果某个对象是由某个类所创建，则我们称该对象是这个类的实例

```js
语法：
    class 类名 {} // 类名要使用大驼峰命名
    const 类名 = class {}  
    
通过类创建对象:
    new 类名()
```

### 属性

类的代码块，默认就是严格模式，类的代码块是用来设置对象的属性的，不是什么代码都能写

```js
 class Person{
    name = "孙悟空" // Person的实例属性name p1.name
    age = 18       // 实例属性只能通过实例访问 p1.age

    static test = "test静态属性" // 使用static声明的属性，是静态属性（类属性） Person.test
    static hh = "静态属性"   // 静态属性只能通过类去访问 Person.hh
}

const p1 = new Person();
```

## 方法

```js
 class Person{
    name = "孙悟空"
    sayHello(){
        console.log('大家好，我是' + this.name)
    } // 添加方法（实例方法） 实例方法中this就是当前实例

    static test(){
        console.log("我是静态方法", this)
    } // 静态方法（类方法） 通过类来调用 静态方法中this指向的是当前类
}
```

### 构造函数

当我们在类中直接指定实例属性的值时，意味着我们创建的所有对象的属性都是这个值，但更多的时候我们希望属性由实例决定。

在类中可以添加一个特殊的方法constructor，该方法我们称为构造函数（构造方法），构造函数会在我们调用类创建对象时执行。

```js
class Person{
    constructor(name, age, gender){
        // 可以在构造函数中，为实例属性进行赋值
        // 在构造函数中，this表示当前所创建的对象
        this.name = name
        this.age = age
        this.gender = gender
    }
}
```

### 封装

封装主要用来保证数据的安全性

1. 私有化数据
    - 将需要保护的数据设置为私有，只能在类内部使用
    - 实例使用#开头就变成了私有属性，私有属性只能在类内部访问
2. 提供setter和getter方法来开放对数据的操作
    - 属性设置私有，通过getter setter方法操作属性带来的好处
        1. 可以控制属性的读写权限
        2. 可以在方法中对属性的值进行验证


```js
class Person {
    #name
    #age
    #gender

    constructor(name, age, gender) {
        this.#name = name
        this.#age = age
        this.#gender = gender
    }

    sayHello() {
        console.log(this.#name)
    }

    // getter方法，用来读取属性
    getName(){
        return this.#name
    }

    // setter方法，用来设置属性
    setName(name){
        this.#name = name
    }

    getAge(){
        return this.#age
    }

    setAge(age){

        if(age >= 0){
            this.#age = age
        }
    }

    get gender(){
        return this.#gender
    }

    set gender(gender){
        this.#gender = gender
    }
}

 const p1 = new Person("孙悟空", 18, "男")
 // p1.getName()
 // p1.setName('猪八戒')
 // p1.setAge(-11) // p1.age = 11  p1.age
p1.gender = "女"
console.log(p1.gender)
```

### 继承

继承体现了类的扩展性

- 可以通过extends关键来完成继承
- 当一个类继承另一个类时，就相当于将另一个类中的代码复制到了当前类中（简单理解）
- 继承发生时，被继承的类称为 父类（超类），继承的类称为 子类
- 通过继承可以减少重复的代码，并且可以在不修改一个类的前提对其进行扩展
- 通过继承可以在不修改一个类的情况下对其进行扩展
- OCP 开闭原则，程序应该对修改关闭，对扩展开放

```js

class Animal{
    constructor(name){
        this.name = name
    }

    sayHello(){
        console.log("动物在叫~")
    }
}

class Dog extends Animal{

    // 在子类中，可以通过创建同名方法来重写父类的方法
    sayHello(){
        console.log("汪汪汪")
    }
    
}

class Cat extends Animal{

    // 重写构造函数
    constructor(name, age){
        // 重写构造函数时，构造函数的第一行代码必须为super()
        super(name) // 调用父类的构造函数

        this.age = age

    }
    
    sayHello(){

        // 调用一下父类的sayHello
        super.sayHello() // 在方法中可以使用super来引用父类的方法

        console.log("喵喵喵")
    }
}
```


### 多态

多态体现了类的灵活性，父类和子类定义了相同的方法，调用这个方法执行的结果不同，这就是多态

```js
class Animal{
    constructor(name){
        this.name = name
    }

    sayHello(){
        console.log("动物在叫~")
    }
}

class Dog extends Animal{
    sayHello(){
        console.log("汪汪汪")
    }
    
}

class Cat extends Animal{

}
const a1 = new Cat()
const a2 = new Dog();
console.log(a1.sayHello(), a2.sayHello());
```


### instanceof

instanceof 用来检查一个对象是否是一个类的实例
 - instanceof检查的是对象的原型链上是否有该类实例，只要原型链上有该类实例，就会返回true
 - Object是所有对象的原型，所以任何对象和Object进行instanceof运算都会返回true

```js
class Animal {}

class Dog extends Animal {}

const dog = new Dog()

console.log(dog instanceof Dog) // true
console.log(dog instanceof Animal) // true
console.log(dog instanceof Object) // true
```

### hasOwn

```
属性名 in 对象
    - 使用in运算符检查属性时，无论属性在对象自身还是在原型上，都会返回true

对象.hasOwnProperty(属性名) (不推荐使用)
    - 用来检查一个对象的自身是否含有某个属性

Object.hasOwn(对象, 属性名) 
    - 用来检查一个对象的自身是否含有某个属性
```

```js
class Person {
    name = "孙悟空"
    age = 18

    sayHello() {
        console.log("Hello，我是", this.name)
    }
}

const p = new Person() 
console.log("sayHello" in p) // true
console.log(p.hasOwnProperty("sayHello")) // false
console.log(Object.hasOwn(p, "sayHello")) // false
```

## 数组

```js

- 数组也是一种复合数据类型，在数组可以存储多个不同类型的数据
- 数组中存储的是有序的数据，数组中的每个数据都有一个唯一的索引可以通过索引来操作获取数据
- 数组中存储的数据叫做元素
- 索引（index）是一组大于0的整数
- 创建数组
通过Array()来创建数组，也可以通过[]来创建数组

- 向数组中添加元素
语法：
    数组[索引] = 元素

- 读取数组中的元素
语法：
    数组[索引]
    - 如果读取了一个不存在的元素，不好报错而是返回undefined

- length
- 获取数组的长度
- 获取的实际值就是数组的最大索引 + 1
- 向数组最后添加元素：
    数组[数组.length] = 元素
- length是可以修改的
```

### 遍历

任何类型的值都可以成为数组中的元素，创建数组时尽量要确保数组中存储的数据的类型是相同。

for-of语句可以用来遍历可迭代对象

```js
语法：
    for(变量 of 可迭代的对象){
        语句...
    }

执行流程：
    for-of的循环体会执行多次，数组中有几个元素就会执行几次，
        每次执行时都会将一个元素赋值给变量
```

### 方法

不改变原数组的方法（非破坏性方法）

```js
Array.isArray()
    - 用来检查一个对象是否是数组    

at()
    - 可以根据索引获取数组中的指定元素
    - at可以接收负索引作为参数
concat()
    - 用来连接两个或多个数组
    - 非破坏性方法，不会影响原数组，而是返回一个新的数组
indexOf()
    - 获取元素在数组中第一次出现的索引
    - 参数：
        1. 要查询的元素
        2. 查询的其实位置
lastIndexOf()
    - 获取元素在数组中最后一次出现的位置

    - 返回值：
        找到了则返回元素的索引，
        没有找到返回-1

join()
    - 将一个数组中的元素连接为一个字符串
    - ["孙悟空", "猪八戒", "沙和尚", "唐僧", "沙和尚"] -> "孙悟空,猪八戒,沙和尚,唐僧,沙和尚"
    - 参数：
        指定一个字符串作为连接符

slice()
    - 用来截取数组（非破坏性方法）     
    - 参数：
        1. 截取的起始位置（包括该位置）
        2. 截取的结束位置（不包括该位置）   
            - 第二个参数可以省略不写，如果省略则会一直截取到最后
            - 索引可以是负值

        如果将两个参数全都省略，则可以对数组进行浅拷贝（浅复制）
```

改变原数组的方法（破坏性方法）

```js
push()
    - 向数组的末尾添加一个或多个元素，并返回新的长度
pop()
    - 删除并返回数组的最后一个元素
unshift()
    - 向数组的开头添加一个或多个元素，并返回新的长度
shift()
    - 删除并返回数组的第一个元素
splice()
    - 可以删除、插入、替换数组中的元素
    - 参数：
        1. 删除的起始位置
        2. 删除的数量
        3. 要插入的元素

    - 返回值：
        - 返回被删除的元素
reverse()
    - 反转数组
```

### 深拷贝和浅拷贝

浅拷贝（shallow copy）
    - 通常对对象的拷贝都是浅拷贝
    - 浅拷贝顾名思义，只对对象的浅层进行复制（只复制一层）
    - 如果对象中存储的数据是原始值，那么拷贝的深浅是不重要
    - 浅拷贝只会对对象本身进行复制，不会复制对象中的属性（或元素）

深拷贝（deep copy）
    - 深拷贝指不仅复制对象本身，还复制对象中的属性和元素
    - 因为性能问题，通常情况不太使用深拷贝

... (展开运算符)
    - 可以将一个数组中的元素展开到另一个数组中或者作为函数的参数传递
    - 通过它也可以对数组进行浅复制

对象的复制
    - Object.assign(目标对象, 被复制的对象)，将被复制对象中的属性复制到目标对象里，并将目标对象返回
    - 也可以使用展开运算符对对象进行复制

```js
const arr = ["孙悟空", "猪八戒", "沙和尚"]
const arr2 = arr.slice()
const arr3 = [...arr]

const obj = { name: "孙悟空", age: 18 }
const obj2 = { address: "花果山", age: 28 }
const obj4 = Object.assign(obj2, obj)
const obj3 = { address: "高老庄", ...obj, age: 48 } // 将obj中的属性在新对象中展开
```

### 排序

```js
sort()
- sort用来对数组进行排序（会对改变原数组）
- sort默认会将数组升序排列
    注意：sort默认会按照Unicode编码进行排序，所以如果直接通过sort对数字进行排序
        可能会得到一个不正确的结果
- 参数：
    - 可以传递一个回调函数作为参数，通过回调函数来指定排序规则
        (a, b) => a - b 升序排列
        (a, b) => b - a 降序排列
    
let arr = [2, 3, 1, 9, 0, 4, 5, 7, 8, 6, 10]
arr.sort((a, b) => a - b)
arr.sort((a, b) => b - a)
```

### 高阶方法

```js

forEach()
    - 用来遍历数组
    - 它需要一个回调函数作为参数，这个回调函数会被调用多次
        数组中有几个元素，回调函数就会调用几次
        每次调用，都会将数组中的数据作为参数传递
    - 回调函数中有三个参数：
        element 当前的元素
        index 当前元素的索引
        array 被遍历的数组

filter()
    - 将数组中符合条件的元素保存到一个新数组中返回
    - 需要一个回调函数作为参数，会为每一个元素去调用回调函数，并根据返回值来决定是否将元素添加到新数组中
    - 非破坏性方法，不会影响原数组

map()
    - 根据当前数组生成一个新数组
    - 需要一个回调函数作为参数，
        回调函数的返回值会成为新数组中的元素
    - 非破坏性方法不会影响原数组

reduce()
    - 可以用来将一个数组中的所有元素整合为一个值
    - 参数：
        1. 回调函数，通过回调函数来指定合并的规则
        2. 可选参数，初始值
```

### arguments

```
- arguments是函数中又一个隐含参数
- arguments是一个类数组对象（伪数组）
    和数组相似，可以通过索引来读取元素，也可以通过for循环变量，但是它不是一个数组对象，不能调用数组的方法
- arguments用来存储函数的实参，
    无论用户是否定义形参，实参都会存储到arguments对象中
    可以通过该对象直接访问实参
```

```js
function fn() {

console.log(arguments[2])
// false
console.log(Array.isArray(arguments))
// ok
for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
}
// ok
for(let v of arguments){
    console.log(v)
}

// 报错
// arguments.forEach((ele) => console.log(ele))
}

fn(1, 10, 33)
```

### 可变参数

在定义函数时可以将参数指定为可变参数

- 可变参数可以接收任意数量实参，并将他们统一存储到一个数组中返回
- 可变参数的作用和arguments基本是一致，但是也具有一些不同点：
    1. 可变参数的名字可以自己指定
    2. 可变参数就是一个数组，可以直接使用数组的方法
    3. 可变参数可以配合其他参数一起使用

```js
// 当可变参数和普通参数一起使用时，需要将可变参数写到最后
function fn3(a, b, ...args) {
    for (let v of arguments) {
        console.log(v)
    }

    console.log(args)
}

fn3(123, 456, "hello", true, "1111")
```

### call()、apply()

调用函数除了通过 `函数()` 这种形式外，还可以通过其他的方式来调用函数

比如，我们可以通过调用函数的call()和apply()来个方法来调用函数，通过call和apply调用的函数，它们的第一个参数就是函数的this

- 通过call方法调用函数，函数的实参直接在第一个参数后一个一个的列出来
- 通过apply方法调用函数，函数的实参需要通过一个数组传递

```js
const obj = { name: "孙悟空"}

function fn(a,b) {
    console.log(this, this.name, a, b)
}

fn.call(obj,1,2);
```

## 解构赋值

```js
const arr = ["孙悟空", "猪八戒", "沙和尚"]

let a,b,c
;[a, b, c] = arr // 解构赋值

// 解构数组时，可以使用...来设置获取多余的元素
let [n1, n2, ...n3] = [4, 5, 6, 7]

// 可以通过解构赋值来快速交换两个变量的值
 let a1 = 10
 let a2 = 20
;[a1, a2] = [a2, a1]


```

```js
 const obj = { name: "孙悟空", age: 18, gender: "男" }
 //  没有的属性返回undefined，可以重新赋值
 let {name:a, age:b, gender:c, address:d="花果山"} = obj
 ```

## 对象序列化

```js
- JS中的对象使用时都是存在于计算机的内存中的
- 序列化指将对象转换为一个可以存储的格式
在JS中对象的序列化通常是将一个对象转换为字符串（JSON字符串）
- 序列化的用途（对象转换为字符串有什么用）：
- 对象转换为字符串后，可以将字符串在不同的语言之间进行传递
    甚至人可以直接对字符串进行读写操作，使得JS对象可以不同的语言之间传递
- 用途：
    1. 作为数据交换的格式
    2. 用来编写配置文字
- 如何进行序列化：
- 在JS中有一个工具类 JSON （JavaScript Object Notation） JS对象表示法
- JS对象序列化后会转换为一个字符串，这个字符串我们称其为JSON字符串  

- 也可以手动的编写JSON字符串，在很多程序的配置文件就是使用JSON编写的
- 编写JSON的注意事项：
1. JSON字符串有两种类型：
    JSON对象 {}
    JSON数组 []
2. JSON字符串的属性名必须使用双引号引起来
3. JSON中可以使用的属性值（元素）
    - 数字（Number）
    - 字符串（String） 必须使用双引号
    - 布尔值（Boolean）
    - 空值（Null）
    - 对象（Object {}）
    - 数组（Array []）
4. JSON的格式和JS对象的格式基本上一致的，
    注意：JSON字符串如果属性是最后一个，则不要再加,
```

```js
 const obj = {
    name: "孙悟空",
    age: 18,
}

// 将obj转换为JSON字符串
const str = JSON.stringify(obj) //JSON.stringify() 可以将一个对象转换为JSON字符串

const obj2 = JSON.parse(str) // JSON.parse() 可以将一个JSON格式的字符串转换为JS对象

```

## Map

```js
- Map用来存储键值对结构的数据（key-value）
- Object中存储的数据就可以认为是一种键值对结构
- Map和Object的主要区别：
    - Object中的属性名只能是字符串或符号，如果传递了一个其他类型的属性名，
        JS解释器会自动将其转换为字符串
    - Map中任何类型的值都可以称为数据的key

创建：
    new Map()

属性和方法：
    map.size() 获取map中键值对的数量
    map.set(key, value) 向map中添加键值对
    map.get(key) 根据key获取值   
    map.delete(key) 删除指定数据
    map.has(key) 检查map中是否包含指定键
    map.clear() 删除全部的键值对
    map.keys() - 获取map的所有的key
    map.values() - 获取map的所有的value
```

```js
const map = new Map()

map.set("name", "孙悟空")
map.set("age", 18)
map.set({}, "呵呵")
map.set(NaN, "哈哈哈")

// 将map转换为数组
const arr = Array.from(map) // [["name","孙悟空"],["age",18]]
const arr2 = [...map]

// 将数组转为map
const map2 = new Map([
    ["name", "猪八戒"],
    ["age", 18],
    [{}, () => {}],
])

// 遍历map
for (const [key, value] of map) {
    console.log(key, value)
}

map.forEach((key, value)=>{
    console.log(key, value)
})
```
## Set

```js
Set
    - Set用来创建一个集合
    - 它的功能和数组类似，不同点在于Set中不能存储重复的数据

- 使用方式：
    创建
        - new Set()
        - new Set([...])

    方法
        size 获取数量
        add() 添加元素
        has() 检查元素
        delete() 删除元素
```

```js
const set = new Set()

// 向set中添加数据
set.add(10)
set.add("孙悟空")
set.add(10)

// 将set转为数组
const arr = Array.from(set);
const arr2 = [...set];

// 将数组转为set
const set2 = new Set([10, '孙悟空']);

// 数组去重
const arr3 = [1,2,2,4,3,3,4,3,6,7]

const arr4 = [...new Set(arr)];// 等价于 Array.from(new Set(arr));
```

## Math

```js
Math
- Math一个工具类
- Math中为我们提供了数学运算相关的一些常量和方法
- 常量：
    Math.PI 圆周率
- 方法：
    Math.abs() 求一个数的绝对值
    Math.min() 求多个值中的最小值
    Math.max() 求多个值中的最大值
    Math.pow() 求x的y次幂
    Math.sqrt() 求一个数的平方根

    Math.floor() 向下取整
    Math.ceil() 向上取整
    Math.round() 四舍五入取整
    Math.trunc() 直接去除小数位

    Math.random() 生成一个0-1之间的随机数
```

获取0-100的随机数

```js
const n = Math.round(Math.random() * 100)
```

获取n-m的随机数

```js
const n = Math.round(Math.random() * (m - n) + n);
```

## Date

```js
Date
- 在JS中所有的和时间相关的数据都由Date对象来表示
- 对象的方法：
    getFullYear() 获取4位年份
    getMonth() 返当前日期的月份（0-11）
    getDate() 返回当前是几日
    getDay() 返回当前日期是周几（0-6） 0表示周日
    ......

    getTime() 返回当前日期对象的时间戳
        时间戳：自1970年1月1日0时0分0秒到当前时间所经历的毫秒数
        计算机底层存储时间时，使用都是时间戳
    Date.now() 获取当前的时间戳
```

```js
// 直接通过new Date()创建时间对象时，它创建的是当前的时间的对象
let d = new Date() 

// 可以在Date()的构造函数中，传递一个表示时间的字符串
// 字符串的格式：月/日/年 时:分:秒
d = new Date("12/23/2019 23:34:35")

// 年-月-日T时:分:秒
d = new Date("2019-12-23T23:34:35")

// new Date(年份, 月, 日, 时, 分, 秒, 毫秒)
d = new Date(2016, 0, 1, 13, 45, 33)

```

### 日期格式化

```js
toLocaleDateString() 
- 将日期转换为本地的字符串

toLocaleTimeString() 
- 将时间转换为本地的字符串

toLocaleString()
- 可以将一个日期和时间转换为本地时间格式的字符串
- 参数：
1. 描述语言和国家信息的字符串
    zh-CN 中文中国
    zh-HK 中文香港
    en-US 英文美国
2. 需要一个对象作为参数，在对象中可以通过对象的属性来对日期的格式进行配置
        dateStyle 日期的风格
        timeStyle 时间的风格
            full
            long
            medium
            short
        hour12 是否采用12小时值
            true
            false
        weekday 星期的显示方式
            long
            short
            narrow

        year
            numeric
            2-digit
```

```js
const d = new Date()
result = d.toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "short",
})

console.log(result)
```

## 包装类

```js
在JS中，除了直接创建原始值外，也可以创建原始值的对象

    通过 new String() 可以创建String类型的对象
    通过 new Number() 可以创建Number类型的对象
    通过 new Boolean() 可以创建Boolean类型的对象
        - 但是千万不要这么做，因为返回值是一个Object

包装类：
    JS中一共有5个包装类
        String --> 字符串包装为String对象
        Number --> 数值包装为Number对象
        Boolean --> 布尔值包装为Boolean对象
        BigInt --> 大整数包装为BigInt对象
        Symbol --> 符号包装为Symbol对象
        - 通过包装类可以将一个原始值包装为一个对象，
            当我们对一个原始值调用方法或属性时，JS解释器会临时将原始值包装为对应的对象
                然后调用这个对象的属性或方法

    - 由于原始值会被临时转换为对应的对象，这就意味着对象中的方法都可以直接通过原始值来调用
```

```js
let str = "hello"
// 添加属性不会报错，但是由于是临时的，所以取法读取到
str.name = "哈哈"

let num = 11
num = num.toString()
```

## String

```js
字符串：
- 字符串其本质就是一个字符数组
- "hello" --> ["h", "e", "l", "l", "o"]
- 字符串的很多方法都和数组是非常类似的
- 属性和方法：
length 获取字符串的长度
字符串[索引] 获取指定位置的字符
str.at() （实验方法）
    - 根据索引获取字符，可以接受负索引
str.charAt()
    - 根据索引获取字符
str.concat()
    - 用来连接两个或多个字符串
str.includes()
    - 用来检查字符串中是否包含某个内容
        有返回true
        没有返回false
str.indexOf()
str.lastIndexOf()
    - 查询字符串中是否包含某个内容
str.startsWith()
    - 检查一个字符串是否以指定内容开头
str.endsWith()
    - 检查一个字符串是否以指定内容结尾
str.padStart()
str.padEnd()
    - 通过添加指定的内容，使字符串保持某个长度
str.replace()
    - 使用一个新字符串替换一个指定内容
str.replaceAll()    
    - 使用一个新字符串替换所有指定内容
str.slice()
    - 对字符串进行切片
str.substring()
    - 截取字符串
str.split()
    - 用来将一个字符串拆分为一个数组
str.toLowerCase()
    - 将字符串转换为小写
str.toUpperCase()
    - 将字符串转换为大写
str.trim()
    - 去除前后空格
str.trimStart()
    - 去除开始空格
str.trimEnd()
    - 去除结束空格
```

```js
 split()
    - 可以根据正则表达式来对一个字符串进行拆分
search()
    - 可以去搜索符合正则表达式的内容第一次在字符串中出现的位置
replace()
    - 根据正则表达式替换字符串中的指定内容
match()
    - 根据正则表达式去匹配字符串中符合要求的内容
matchAll()
    - 根据正则表达式去匹配字符串中符合要求的内容(必须设置g 全局匹配)
    - 它返回的是一个迭代器
```

```js
let str = "a@b@c@d"

let result = str.split("@")

str = "孙悟空abc猪八戒adc沙和尚"
result = str.split(/a[bd]c/)
```

```js
let str = "dajsdh13715678903jasdlakdkjg13457890657djashdjka13811678908sdadsd"

// -1
result = str.search("abc")
// 6
result = str.search(/1[3-9]\d{9}/)
// dajsdh哈哈哈jasdlakdkjg哈哈哈djashdjka哈哈哈sdadsd
result = str.replace(/1[3-9]\d{9}/g, "哈哈哈")

// ['13715678903', '13457890657', '13811678908']
result = str.match(/1[3-9]\d{9}/g)

// RegExpStringIterator {}，需要遍历才能用，item是一个类数组，包含组匹配的内容
result = str.matchAll(/1[3-9](\d{9})/g)


//  13715678903 715678903
//  13457890657 457890657
//  13811678908 811678908
for(let item of result){
    console.log(item[0], item[1])
}
```

## RegExp

[正则表达式](./regexp.md)

## DOM

[JavaScript DOM](./jsdom.md)

## BOM

[JavaScript BOM](./jsbom.md)
