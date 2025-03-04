# wboot-packages
 wboot-vue3中引用的第三方包和依赖, 同步更新自[jeect-boot](https://github.com/jeecgboot/JeecgBoot/tree/v3.7.3/jeecgboot-vue3/src)

项目结构
```
wboot-packages
├─ build    jeecg-boot源build文件夹
├─ common   通用文件夹，用于存放通用组件，函数，资源的文件夹
├─ libs     jeecg-boot-vue3中的源src文件夹内容
├─ package.json
├─ patchs   补丁文件夹，用于替换libs中需要修改部分文件
├─ README.md
└─ scripts  脚本文件

```

同步命令：

```
npm run sync xxx(需要同步的文件夹目录绝对路径)

```

说明：每次运行同步命令的时候会同步最新版本的组件库，并且创建对应的版本分支，同时master分支为最新的版本分支
项目中引用的话需要引用指定的版本分支

由于开源代码仓库不规范，需要手动打补丁，替换对应引用路径
1. import { DB_DICT_DATA_KEY } from '/src/enums/cacheEnum'; 替换引用路径中的/src/为/@/，最终结果为：import { DB_DICT_DATA_KEY } from '/@/enums/cacheEnum';


Q&A：
1. 为什么不直接同步git仓库
git仓库中文件太多，脚本操作容易发生下载失败的情况，反而直接copy更方便一点
2. 为什么打patch，而不是直接修改文件内容





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
