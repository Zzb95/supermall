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
    二、解决首页中Better-Scroll可滚动区域的问题
        1、Better-Scroll在决定有多少区域可以滚动时，是根据一个属性scrollerHeight决定的
        （1）scrollerHeight属性是根据放Better-Scroll的content中的子组件的高度决定的
        （2）但是在我们的首页中，刚开始计算scrollerHeight属性时，是没有将图片计算在内的
        （3）所以，计算出来的告诉是错误的高度
        （4）后来图片加载进来之后有了新的高度，但是scrollerHeight属性并没有进行更新
        （5）所以滚动出现了问题
        2、如何解决这个问题？
        （1）监听每一张图片是否加载完成，只要有一张图片加载完成了，就执行一次refresh()
        （2）如何监听图片加载完成了？
            a.原生的js监听图片
                img.onload = function() {}
            b.vue中监听 直接在img标签里面加上@load=“方法”
        （3）调用scroll的refresh()方法
        3、如何将GoodsListItem中的事件传入到Home.vue中
        （1）因为涉及到非父子组件的通信，所以这里我们选择了事件总线
        （2）bus -> 公共汽车/总线
        （3）包含了三步：
            a.Vue.prototype.$bus = new Vue();
            b.this.$bus.$emit('事件名称', '参数');
            c.this.$bus.$on('事件名称', '回调函数(参数)')
        4、
# ref
    ref如果绑定在组件中的，那么通过“this.$ref.refname”获取到的是一个组件对象、
    ref如果绑定在普通的元素中，那么通过“this.$ref.refname”获取到的是一个元素对象

# 无法确定高度的时候两种解决方式
    1、根据calc属性进行计算
    2、使用绝对定位

# 事件总线
    是管理事件的，跟vuex不一样，vuex是管理状态的
    // 可以使用new出来的Vue发射事件和监听事件
    Vue.prototype.$bus = new Vue();
    // 发射事件
    this.$bus.$emit('aaa');
    // 监听事件
    this.$bus.$on('aaa');

# 防抖函数
    一、对refresh非常频繁的问题，进行防抖操作
    1、防抖debounce/节流throtter
    2、防抖函数起作用的过程
    （1）如果我们直接执行refresh，那么refresh函数会被执行30次
    （2）可以将refresh函数传入到debounce函数中，生成一个新的函数
    （3）之后在调用非常频繁的时候，就使用新生成的函数
    （4）而新生成的函数，并不会非常频繁的调用，如果下一次执行来的非常快，那么会将上一次取消掉


