# MongoDB

## 安装

```sh
brew tap mongodb/brew
brew update
brew install mongodb-community@8.0
# 启动
brew services start mongodb-community@8.0
# 停止
brew services stop mongodb-community@8.0
```

## 命令

```sh
# 链接数据库
mongosh

# 查看数据库列表
show dbs
# 使用或者创建一个数据库
use <dbname>
# 查看当前所用的数据库
db 
# 查看当前数据库有哪些集合
show collections

# 删除当前所在数据库
db.dropDatabase()
```

## 集合

```sh
# 创建集合
db.createCollection("stu")

# 导出数据库中的某个集合，文件为books.json
mongoexport --db <dbName> --collection <collectionName> --out books.json

# 导入数据库中的某个集合，文件为books.json
mongoimport --db <dbName> --collection <collectionName> --drop --file <filePath>

# 查看集合中数据状态
db.stu.stats()

# 删除集合
db.stu.drop()

# 清空集合数据
db.stu.remove({})
```

## 数据

```sh
# 插入单条数据
db.stu.insert({"name": "xiaowang"})

# 集合中查找数据
db.stu.find({"score.yuwen":100})

# 多条件查找
db.stu.find({"score.yuwen":100,"age":15})

# 条件判断查找
db.stu.find({"score.yuwen":{$gt:99}})

# 逻辑或判断查找
db.stu.find({$or:[{"age":10},{"age":20}]})

# 结果排序 -1是倒序 1是正序
db.stu.find().sort({"score.yuwen":1,"age":-1})

# 删除集合中查找到的所有数据
db.stu.remove({"name":"xiaowang"})

# 删除集合中查找到的第一条数据
db.stu.remove({"name":"xiaowang"},{"justOne":true})

# 单条数据修改
db.stu.update({"name":"小王"},{$set:{"age":21}})

# 多条数据修改
db.stu.update({},{$set:{"age":21}},{"multi":true})

# 添加新字段
db.stu.update({}, {$set: {isRecommend: ''}}, false, true)

# 删除旧字段
db.stu.update({},{$unset: {link: ''}},false, true)

# 字段重命名
db.stu.update({},{$rename : {'created_At' : 'createdAt'}}, false, true)
```

### 字段内容替换

替换某个集合中，某个字段的部分内容

```sh
db.getCollection('articles').find({}).forEach(function (item) {
    item.content = item.content.replace(/(http|https):\/\/static.86886.wang\/public/g, 'https://cdn.86886.wang/blog');

    db.getCollection('articles').save(item);
})
```

## 备份和导入

```sh
# 备份essay数据库
mongodump -h 127.0.0.1:27017 -d essay -o Documents/essay-backup 

# 导入essay数据库
mongorestore -h 127.0.0.1:27017 -d essay /root/essay-backup/essay

# 如果是在docker中，可以用容器名字代替ip（如mongodb）
mongorestore --host mongodb -d essay --drop ./essay-backup/essay

mongo && use essay
```
