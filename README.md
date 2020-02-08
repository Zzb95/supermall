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
        4、文档地址：https://ustbhuangyi.github.io/better-scroll/doc/api.html

        5、卸载better-scroll：npm uninstall better-scroll
        6、指定版本npm install better-scroll@1.13.2 --save
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

# 上拉加载更多的功能

# tabControl的吸顶效果
    一、获取到tabControl的offsetTop
        1、必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControll的offsetTop
        2、但是，如果直接在mounted中获取tabControl的offsetTop，那么值是不正确的
        3、如何获取正确的值了？
        （1）监听HomeSwiper中img的加载完成
        （2）加载完成后，发出事件，在Home.vue中，获取正确的值
        （3）补充：
            为了不让HomeSwiper多次发出事件
            可以使用isLoad的变量进行状态的记录
        （4）注意：
            这里不进行多次调用和debouce的区别
    二、监听滚动 动态的改变tabControl的样式
        1、问题：动态的改变tabControl的样式时，会出现两个问题：
            问题1：下面的商品内容，会突然间上移
            问题2：tabControl虽然设置了fixed，但是也随着Better-Scroll一起滚出去了
        2、其他方案来解决停留问题：
            （1）在最上面，多复制了一份PlaceHolderTabControl组件对象，利用它来是嫌停留效果
            （2）当用户滚动到一定位置时，PlaceHolderTabControl显示出来
            （3）当用户滚动没有达到一定位置时，PlaceHolderTabControl隐藏起来

# 让Home保持原来的状态
    一、让Home不要随意的销毁掉
        使用keep-alive
    二、让Home中的内容保持原来的位置
        1、离开时，保存一个位置信息
        2、进来时，将位置设置为原来保存的位置saveY信息即可
            注意：最好回来时，进行一次refresh()

# 如何将时间戳转成时间格式化字符串（常用）
    时间戳：1535694719（秒）
    1、将时间戳转成Date对象
    const date = new Date(1535694719 * 1000)
    2、将date进行格式化，转成对应的字符串
        date.getYear() + date.getMonth() + 1
        date -> FormatString(太常用)
        fmt.format(date, 'yyyy-MM-dd hh:mm:ss')
        y: year 年
        M: Month 月
        d: day 日
        h: hours 小时 有一些语言区分h和H(h(12小时制)/H(24小时制))
        m: minutes 分钟
        s: seconds 秒钟

# mixin 混入

# 标题和内容的联动效果
一、点击标题，滚动到对应的主题
    在detail中监听标题的点击，获取index
    滚动到对应的主题：
        1、获取所有主题的offsetTop
        2、问题：在哪里才能获取到正确的offsetTop
        （1）created肯定不行，压根不能获取元素
        （2）mounted也不行，数据还没有获取到
        （3）获取到数据的回调中也不行，DOM还没有渲染完
        （4）$.nextTick也不行，因为图片的高度没有被计算在内
        （5）在图片加载完成后，获取的高度才是正确

二、内容滚动，显示正确的标题
    (this.currentIndex != i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))
    条件成立：this.currentIndex = i
    条件一：防止赋值的过程过于频繁
    条件二：((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))
        条件1：(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
        * 判断区间：在0和某个数字之间
        条件2：(i === length - 1 && positionY >= this.themeTopYs[i])
        判断大于等于：i === length - 1
    hack做法：
        this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
    空间换时间

# 底部工具栏的封装

# 详情页的回到顶部
    home.vue和detail.vue回到顶部: mixin

# 使用vuex
    数组常用的方法有哪些？
    push/pop/unshift/shift/sort/reverse/map/filter/reduce/join

# 点击加入购物车
    一、监听加入购物车按钮的点击，并且获取商品信息
        1、监听
        2、获取商品信息：iid/price/image/title/desc
    二、将商品添加到Vuex中
        1、安装Vuex
        2、配置Vuex
        3、定义mutations，将商品添加到state.cartList
        4、重构代码
            （1）将mutations中的代码抽取到actions中(定义两个mutations)
            （2）将mutations/actions单独抽取到文件中

# 购物车的展示
    一、购物车的导航栏的展示

    二、购物车商品的展示
        1、CartList -> Scroll(滚动问题)
        2、CartListItem -> CheckButton
    三、商品的选中和不选中切换
        1、修改模型对象，改变选中和不选中
    四、底部工具栏的汇总
        1、全选按钮
        2、计算总价格
        3、去计算

# 购物车的全选按钮
    一、显示的状态
        1、判断是否有一个不选中，全选就是不选中
    二、点击全选按钮
        1、如果原来都是选中，点击一次，全部不选中
        2、如果原来都是不选中（某些不选中），全部选中

# 添加购物车弹窗
    一、Vuex的补充
        1、Actions可以返回一个Promise
        2、mapActions的映射关系
    二、Toast（吐司）封装
        1、普通封装方式
        2、插件封装方式

# 补充一些细节
    一、fastClick——解决移动端300ms延迟
        1、安装
            通过npm install fastclick --save 进行安装
        2、导入
            在main.js中导入
            import FastClick from 'fastclick'
        3、调用attach函数
            FastClick.attach(document.body);

    二、图片的懒加载
        1、什么是图片懒加载？
        图片需要显示在屏幕上
        2、使用vue-lazyload：
        （1）安装
            npm install vue-lazyload --save
        （2）导入
            import VueLazyLoad from 'vue-lazyload'
        （3）Vue.use
            Vue.use(VueLazyLoad);
        （4）修改img :src -> v-lazy
# npm install postcss-px-to-viewport --save-dev

