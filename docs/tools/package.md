# 包管理

## npm

```sh
# 设置镜像地址
npm config set registry https://registry.npmmirror.com

# 恢复默认地址
npm config set registry https://registry.npmjs.org

# 读取镜像地址
npm get register
```

## yarn

```sh
# 设置镜像地址
yarn config set registry https://registry.npmmirror.com

# 删除配置
yarn config delete registry

# 高版本node（>16.x），可以直接开启内置yarn，内置的是yarn3
corepack enable

# yarn3 运行node文件
yarn node index.js


# 开启后，也可以切换为yarn1
corepack prepare yarn@1 --activate

# 用yarn3初始化当前项目，不影响全局yarn版本
yarn init -2
```

## pnpm

```sh
pnpm config set registry https://registry.npmmirror.com
pnpm config delete registry

# 高版本node（>16.x），可以直接开启内置pnpm
corepack enable
```

## husky

使用husky配置commitlint，规范commit提交信息

```sh
# 安装commitlint
npm install --save-dev @commitlint/config-conventional @commitlint/cli
echo "export default {extends: ['@commitlint/config-conventional']};" > commitlint.config.js

# 安装husky
npm i husky -D

# 初始化husky
npx husky install

# 添加commit-msg钩子
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'

# 验证是否有效
git commit -am "fix: test"
```

提交格式：`type(scope): some message`，其中scope可以省略，表示影响的模块

```sh
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```