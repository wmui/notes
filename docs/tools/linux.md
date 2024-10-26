# Linux

在Linux中，一切皆文件。

## 快捷键

```sh
ctrl+l: 清屏
ctrl+c: 强制终止当前命令
ctrl+a: 光标移动到命令行首
ctrl+e: 光标移动到命令行尾
ctrl+u: 从光标所在位置删除到行首
ctrl+z: 把命令放入后台
ctrl+r: 在历史命令中搜索
一次tab: 补全
两次tab: 提示
shift+pageup: 向上翻页
shift+pagedown: 向下翻页
```

## 切换目录

```sh
# 切换到主目录，等价于 cd ~
cd

# 切换到上一次工作目录
cd -

# 切换到当前目录下其他目录
cd ./demo

# 切换到上一级目录
cd ..

# 切换到其他盘
cd E:

# 显示当前目录路径
pwd
```

## 列表显示

```sh
# 显示所有文件
ls

# 显示所有文件，包括隐藏文件
ls -a

# 列出每个文件更详细的信息
ls -l

# 查看当前目录属性
ls -ld

# 列出目录中每个文件的大小（ K/M/G 单位）
ls -lh

# 递归地列出子目录的内容
ls -R

# 按最后一次修改时间的顺序显示文件
ls -t

# 显示所有以app开头的文件
ls app*
```

## 权限

### 格式

**类型：** `-`: 普通文件、`d`: 目录文件、`b`: 块设备、`c`: 字符设备、`l`: 链接、`s`: 套接字

**权限：** `r`读，`w`写，`x`可执行

`-rw-r--r--`: 第一个`-`表示是普通文件，`rw-`表示拥有者有读写权限，`r--`表示组内用户有读权限，最后一个`r--`表示其他用户有读权限

### 修改权限

+: 添加权限、-: 去掉权限、=: 设置权限、u: 用户、g: 组、o: 其他

```sh
# 给文件添加可执行权限
$ chmod +x file

# 去掉文件的可执行权限
$ chmod -w file

# 给文件所有者添加可执行权限
$ chmod u+w file

# 给文件同组去掉可写权限
$ chmod g-w file

# 所有者读写执行、同组读执行、其他读执行
$ chmod u=rwx, g=rx, o=rx file
```

### 八进制设置权限

读的值是4，写的值是2，执行是1，最高权限是7（4 + 2 + 1）。

`chmod 755 file` 和 `chmod u=rwx, g=rx, o=rx file`效果一样

## 显示文件内容

```sh
# 显示file1文件的内容
$ cat file1

# 依次显示file1和file2的内容
$ cat file1 file2

# 把file1和file2文件的内容结合起来，复制到file3。file3原有内容会被清除
$ cat file1 file2 > file3

# 把file1和file2文件的内容结合起来，复制到file3。file3原有内容不会被清除
$ cat file1 file2 >> file3

# 重写file1文件的内容，内容输入完毕后使用 Ctrl+d 保存
$ cat > file1

# 显示file1的开头n行
$ head -n file1

# 显示file1的结尾n行
$ tail -n file1

# 分页显示，每次显示一屏。空格键向下翻一屏（只能向下），回车键向下翻一行，q退出
$ cat file1 | more

# less 和 more 操作方式一样，唯一不同点是less可以通过上下键进行翻行
$ cat file1 | less
```

## 文件和文件夹

```sh
# 新建文件。如果存在同名文件，会修改文件的访问和修改时间
$ touch file

# 新建一个文件夹
$ mkdir folder

# 强制删除一个文件或文件夹
$ rm –rf [file | folder]

# 复制a.txt，副本为b.txt
$ cp a.txt b.txt

# 复制a.txt b.txt，副本保存到test目录
$ cp a.txt b.txt test

# 递归复制test目录，副本保存到test2目录
$ cp -R test test2

# mv命令可以对文件重命名。把a.txt重命名为aa.txt
$ mv a.txt aa.txt

# 把aa.txt文件移动到test目录下
$ mv aa.txt test

# 把aa.txt文件移动到test目录下，并改名为aaa.txt
$ mv aa.txt test/aaa.txt

# 把test目录移动到test2目录
$ mv test test2
```

## 文件搜索

find 命令和 grep 命令用于查找文件，grep 支持通过正则的方式检索文件

### find

```
格式：
  find [目录] [条件] [动作]

目录：要搜索的目录及其子目录，默认为当前目录
条件：搜索文件的筛选方式
    -name: 指定文件名
    -type: 指定文件类型（b/c/d/p/l/f）
    -size: 指定文件大小，单位可以是K/M/G。+表示大于，-表示小于
    -user: 指定用户
    -group: 指定组
动作：匹配特定的搜索结果，也可以是文件名
```

```sh
# 查找根目录下名字为install.log的文件
$ find / -name install.log

# 查找/etc/目录下，大于20KB的文件
$ find /etc -size +20K

# 查找/etc/目录下，小于50KB的文件
$ find /etc -size -50K
```

### grep

```
格式：
    grep [选项] pattern [文件名]
选项：
    -i: 忽略大小写; -n: 显示行号
pattern： 
    所要匹配的正则表达式字符串
```

```sh
# 在 /etc/passwd 文件中，查找包含fa字符串的行
$ grep -n fa /etc/passwd

# 过滤ls /bin输出的内容，只显示以m开头的行
$ ls /bin | grep '^m'
```

## 压缩

```
-c: 打包
-z: 压缩包为.tar.gz格式
-v: 显示过程
-f: 指定打包后的文件名
-x: 解压
```

```sh
# 把a.txt打包成a.tar.gz
$ tar -czvf a.tar.gz a.txt

# 解压a.tar.gz
$ tar -xzvf a.tar.gz

# 显示压缩包的信息
$ tar -tzvf a.tar.gz
```

## 用户管理

Linux允许创建用户和组，可以把某个用户归属于某个组。可以针对组或者用户单独设置权限

```sh
# 创建用户
$ useradd username

# 为用户设置密码,修改密码也是同样命令
$ passwd username

# 彻底删除用户
$ userdel -r username

# 切换用户
$ su username
```

## 组管理

```sh
# 创建用户组
$ groupadd groupname

# 向组中添加用户
$ gpasswd -a username

# 删除组中的用户
$ gpasswd -d username

# 设置文件所属的组
$ chgrp groupname filename

# 设置文件所有者
$ chown username filename

# 删除用户组
$ groupdel groupname
```
## 系统目录

`/`: 系统的根目录

`/boot`: 系统启动目录，存放了系统的引导程序

`/bin`: 存放程序的启动文件、命令。Linux 中的软件都是通过命令操作的，这些命令文件存放于 bin 目录，这个目录添加到了系统的 Path 中，所以当我们使用ls、vi等这些命令时，系统就会去 /bin 目录下面查找是不是有 ls 这个程序。

`/sbin`: 存放超级用户（root）的程序启动文件、程序的命令

`/dev`: 存放设备相关文件（包括外设），比如磁盘驱动、USB驱动、打印机驱动

`/etc`: 存放程序的可编辑配置文件（Editable Text Configuration）

`/home`： 用户目录

`/root`: 超级用户目录，拥有系统的所有权限

`/lib`: 存放库文件

`/lib64`: 给64位操作系统提供的库文件存放目录

`/lost+found`: 系统非正常关机时存放的临时文件，平常这个目录是空的

`/media`: 自动识别一些设备的时候（如U盘、CD），会挂载到这个地方

`/mnt`: 安装临时文件系统的挂载点，让用户可以挂载其他的文件系统。比如 Linux 使用的是 ext2 文件系统，你可以在这里挂载 Windows 分区的 NTFS 文件系统

`/proc`: 虚拟文件系统目录，用来获取系统信息。它是系统内存的映射，所以可以动态的获取系统信息

`/tmp`: 用于存放各种临时文件。有些linux系统会定期自动对这个目录进行清理，所以不要把重要数据放到该目录

`/usr`: 用来存放一些应用程序。通常我们使用包管理器下载的软件都在这个目录下（usr/local），它下面有很多子目录，用于存放不同的系统资源

`/opt`: 用来存放一些可选的应用程序，比如 beta 版的程序，你可以安装到这个目录下，用完之后不满意直接删除对应的文件夹即可，不会影响到其他应用程序

`/sys`: sysfs 文件系统挂载点，sysfs 是一种基于内存的文件系统

`/selinux`: `Security-Enhanced Linux` 的缩写，用来加强系统的安全。可以通过getenforce获取当前状态，setenforce修改状态。默认是关闭状态，可以修改/etc/selinux/config中的SELINUX=disabled永久关闭

`/srv`: 系统启动时可以访问的数据库目录

`/var`: 用于存放运行时需要改变数据的文件，比如日志文件


## PATH变量

PATH变量指环境变量，使用`echo $PATH`可以查看当前配置的环境变量。

在全局执行某个某个命令时，会依次查找这些目录直到找到命令为止。

```sh
# echo $PATH
/Users/wmui/.bun/bin
:/Users/wmui/Library/pnpm
:/Users/wmui/.nvm/versions/node/v18.16.0/bin
:/Library/Developer/CommandLineTools/usr/bin
:/usr/local/bin
:/System/Cryptexes/App/usr/bin
:/usr/bin
:/bin
:/usr/sbin
:/sbin
:/Library/Apple/usr/bin
:/Users/wmui/.orbstack/bin
:/Users/wmui/flutter/bin
```

可以自己添加环境变量，打开用户目录下的`.bashrc`文件，文件末尾添加`export PATH=$PATH:dir1[:dir2]`，添加好后重启命令行终端让配置生效。

## 防火墙

```sh
# https 部署失败可能是端口关闭导致的，开启80  443端口
ufw allow 80 # 开启 80 端口
ufw allow 433 # 开启 443 端口

ufw delete allow [port] # 删除某端口
ufw enable # 开启
ufw disable # 关闭
ufw status # 状态查询
ufw reload # 重启
```

当端口被占用后，使用下面命令释放端口

```sh
lsof -i:80 # 查看 80 端口应用程序的pid
kill -9 $pid # 关掉 80 端口应用程序
```

## 免密登录

配置本机免密登录服务器

```sh
# 本机和服务器分别生成公钥和私钥
git config --global user.name "wmui" # 换成自己的名字
git config --global user.email "qq22337383@gmail.com" # 换成自己的邮箱
ssh-keygen -t rsa -C "qq22337383@gmail.com" # 换成自己的邮箱

# 把本机的公钥，复制到服务器的 ~/.ssh/authorized_keys 文件
ssh-copy-id -i ~/.ssh/id_rsa.pub root@xxx.xxx.xx.xx

# 如果复制失败，修改ssh权限
chmod 700 -R .ssh && cd .ssh && chmod 600 authorized_keys
```
