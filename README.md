# supermall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 修改配置文件
    创建文件vue.config.js和editorconfig
    一定要加上editorconfig文件，代码书写的一些规范

# 修改小图标
    在public文件夹下的favicon.ico
    BASE_URL是文件的相对路径，不用管，打包的时候没有了

# 轮播图

# Better-Scroll
    一、有时候无法向下拖动，出现卡顿的现象
    存在问题：
        因为数据是异步加载的，有时候在生成内容的时候会去计算一个高度，但是计算的时候还未加载完成数据，
    就会造成自动计算的高度与实际内容的高度不匹配的情况，就会出现无法下拉的问题
    解决方法：
        加载完成后，执行scroll的刷新方法refresh()

# ref
    ref如果绑定在组件中的，那么通过“this.$ref.refname”获取到的是一个组件对象、
    ref如果绑定在普通的元素中，那么通过“this.$ref.refname”获取到的是一个元素对象

# 无法确定高度的时候两种解决方式
    1、根据calc属性进行计算
    2、使用绝对定位


