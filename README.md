# wboot-packages
 wboot-vue3中引用的第三方包和依赖, 同步更新自[jeect-boot](https://github.com/jeecgboot/JeecgBoot/tree/v3.7.3/jeecgboot-vue3/src)

包目录：
开源组件库
- libs
    - api
    - assets
    - components
    - design
    - directives
    - enums
    - hooks
    - layouts
    - locales
    - logics
    - router
    - settings
    - store
    - utils
    - views
自定义公共组件
- common

同步命令：

```
npm run sync

```

说明：每次运行同步命令的时候会同步最新版本的组件库，并且创建对应的版本分支，同时master分支为最新的版本分支
项目中引用的话需要引用指定的版本分支

子模块操作方法：https://my.oschina.net/emacs_8915127/blog/17571658

项目中添加子仓库方法：
```
git submodule add https://github.com/wangyuanzcm/wboot-packages.git packages

```
添加 submodule 后，你需要检出它的最新提交：


```
git submodule update --init --recursive

```

项目中更新子仓库的方法：
```
git submodule update

```

如果你想更新到上游仓库的最新 commit，可以进入 submodule 目录并执行：
```
cd path-to-submodule
git pull origin main
```
其中main为项目中使用的实际分支

如果你想从项目中删除 submodule，你需要执行以下步骤：

从 .gitmodules 文件中删除 submodule 相关条目。
从 .git/config 文件中删除 submodule 相关条目。
删除 submodule 目录。
提交更改到父仓库。
```
# 删除 .gitmodules 中的条目
vi .gitmodules
# 删除 .git/config 中的条目
vi .git/config
# 删除 submodule 目录
rm -rf path-to-submodule
# 提交更改
git commit -am "Removed submodule path-to-submodule"
```

3.1 指定子模块的版本
当你添加一个子模块时，Git 会记录子模块的最新提交。你可以通过编辑 .gitmodules 文件来指定子模块的特定版本，如下所示：
```
[submodule "path-to-submodule"]
	path = path-to-submodule
	url = url-of-submodule-repository
	branch = specific-branch
	commit = specific-commit-hash
```
在这里，branch 和 commit 可以用来指定子模块的特定分支或提交。

如果你想更新子模块到特定的版本，可以执行以下命令：

git submodule update --remote path-to-submodule
