# Docker

[Docker学习文档](https://yeasy.gitbook.io/docker_practice)

## 安装

```sh
# 移除已安装版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# 安装新版
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# 安装指定版本
sudo apt-get install docker-ce=5:19.03.6~3-0~ubuntu-xenial docker-ce-cli=5:19.03.6~3-0~ubuntu-xenial containerd.io

# 查看安装版本
docker -v
```

安装脚本

```sh
# 查看已安装的docker并移除
dpkg -l | grep docker
sudo apt remove docker docker-engine docker.io docker-ce docker-ce-cli

# 安装docker
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh --mirror Aliyun

# 启动Docker
sudo systemctl enable docker
sudo systemctl start docker

# 如果上面的命令不可用
sudo service docker start
```

## 命令

```sh
# 显示所有镜像。等价于 docker image ls
docker images

# 删除镜像
docker image rm <image id></image>

# 删除为none的空镜像

docker rmi $(docker images -f "dangling=true" -q)

# 执行镜像，执行后立即退出
docker run <image name> 

# 执行镜像，交互式
docker run -it <image name>

# 执行镜像，-p 指定本机端口和docker中应用的端口映射，-d 表示后台运行，--name 表示给容器分配一个名字， -e 设置容器环境变量。
docker run -p 3000:3000 -d -e MODE=test --name=express-demo <image name>

# docker副本创建
docker tag <image name> <new image name>

# 查看镜像的层结构
docker history <image id>

# exit 退出交互式命令行
exit
```

## 容器

```sh
# 显示所有container（运行中的和退出的）, -a 表示所有容器。等价于 docker ps -a
docker container ls -a 

# 清除所有的container，-q 参数表示只列出id
docker rm $(docker container ls -aq) 

# 清除所有已经推出的container，-f 指定条件
docker rm $(docker container ls -f "status=exited" -q)

# 查看容器的详细信息
docker inspect <container id>

# 显示容器输出日志
docker logs <container id> 

# 进入容器
docker exec -it <container id> /bin/bash 

# 显示容器的ip地址
docker exec -it <container id> ip a

# 停止容器
docker stop <container id | container name>
```

## 构建镜像

### Dockerfile

基于Dockerfile构建镜像，在dockerfile所在目录执行该命令。

```sh
# -t 表示标签名
docker build -t wmui/ubuntu002 .
```

```sh title="Dockerfile"
FROM ubuntu:18.04
RUN apt-get update && apt-get install -y vim
```

### commit

基于commit构建镜像，先在容器中完成软件的安装，然后构建

```sh
# 查看最新的commit id：892ee8df74e2
docker container ls -a

# docker commit 892ee8df74e2 wmui/ubuntu001
docker commit <container id> <new image name>
```

## 发布镜像

```sh
docker login

# 发布image（image的前缀名要和dockerhub账号一致）
docker push 1308017/hello latest
```

## 容器通信

基于同一个镜像创建的容器，他们的网络默认是和`bridge0`绑定的，因此他们之间是可以互相通信的

```sh
 安装软件
sudo apt install bridge-utils

# 查看网络链接情况
brctl show

# 查看容器的网络链接情况
docker network inspect bridge

# 查看所有网桥
docker network ls
```

## 自定义bridge关联容器

使用自定义bridge，容器之间可以通过容器名字ping通，因此可以使用容器名字代替ip

```sh
# 创建一个新的bridge
docker network create -d bridge express-demo-bridge

# 基于新bridge创建容器
docker run -d --name=express-demo3 --network=express-demo-bridge 1308017/express-demo

# 修改旧容器的关联bridge
docker network connect express-demo-bridge express-demo
```

## 数据持久化

数据持久化后，删除容器不会删除这些数据。

要在项目目录下执行该命令，这样`pwd`才能正确映射`docker`中的项目目录

```sh
docker run -d -p 3000:3000 -v $(pwd):/usr/src/express-demo --name=express-demo wmui/express-demo
```

## docker-compose安装

```sh
# install
sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 国内用户可以使用以下方式加快下载
sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# debug docker-compose
docker-compose up

# 第一次先拉取镜像
docker-compose pull

# 后台背景模式启动（一直启动）
docker-compose up -d

# 启动服务(仅一次)
docker-compose start

# 停止服务
docker-compose stop

# 删除服务
docker-compose down # 不会删除镜像

# 进入容器
docker-compose exec wordpress bash
```

## Node dockerfile

```sh

FROM node:15.10.0-alpine

LABEL maintainer="qq22337383@gmail.com"

# 这个是容器中的文件目录
RUN mkdir -p /usr/src/juxiang 

# 设置工作目录
WORKDIR /usr/src/juxiang

COPY package.json ./

RUN npm config set registry https://registry.npmmirror.com && npm install -g --force yarn && yarn install

# 拷贝所有源代码到工作目
COPY . .

# 暴露容器端口
EXPOSE 3000

CMD [ "sh", "-c", "npm start" ]
```