# NodeJS


## 安装Node

### 官方安装

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 18
node -v
npm -v
```

### ubutnu安装

```sh
sudo apt-get update
sudo apt-get install nodejs npm
npm install -g n
# 查看版本并安装指定版本
n ls-remote
# 安装18
n install 18.16.0
```

### Mac安装

```sh
brew install node@18
```
