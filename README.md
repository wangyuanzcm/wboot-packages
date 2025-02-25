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


项目中添加子仓库方法：
```
git submodule add https://github.com/wangyuanzcm/wboot-packages.git packages

```