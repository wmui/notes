# SQLite

## 常用命令

```sh
# 管理数据库
sqlite3

# 创建数据库
sqlite3 test.db

# 删除数据库
DROP DATABASE test.db

# 导出数据
sqlite3 test.db .dump > test.sql

# 导入数据
sqlite3 test.db < test.sql

# 附加数据库，类似于给数据库起一个别名
ATTACH DATABASE 'test.db' as 'TEST'

# 分离数据库
DETACH DATABASE 'TEST'
```

## 表

```sh
# 创建表
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);

# 删除表
DROP TABLE COMPANY
```

## 数据

```sh
# 插入数据
INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (1, 'Paul', 32, 'California', 20000.00 );

# 查询数据
SELECT DISTINCT NAME FROM COMPANY;
```
