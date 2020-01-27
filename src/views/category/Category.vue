<template>
    <div class="wrapper" ref="aaaa">
        <ul class="content">
            <button @click="btnClick">按钮</button>
            <li>分类列表1</li>
            <li>分类列表2</li>
            <li>分类列表3</li>
            <li>分类列表4</li>
            <li>分类列表5</li>
            <li>分类列表6</li>
            <li>分类列表7</li>
            <li>分类列表8</li>
            <li>分类列表9</li>
            <li>分类列表10</li>
            <li>分类列表11</li>
            <li>分类列表12</li>
            <li>分类列表13</li>
            <li>分类列表14</li>
            <li>分类列表15</li>
            <li>分类列表16</li>
            <li>分类列表17</li>
            <li>分类列表18</li>
            <li>分类列表19</li>
            <li>分类列表20</li>
            <li>分类列表21</li>
            <li>分类列表22</li>
            <li>分类列表23</li>
            <li>分类列表24</li>
            <li>分类列表25</li>
            <li>分类列表26</li>
            <li>分类列表27</li>
            <li>分类列表28</li>
            <li>分类列表29</li>
            <li>分类列表30</li>
            <li>分类列表31</li>
            <li>分类列表32</li>
            <li>分类列表33</li>
            <li>分类列表34</li>
            <li>分类列表35</li>
            <li>分类列表36</li>
            <li>分类列表37</li>
            <li>分类列表38</li>
            <li>分类列表39</li>
            <li>分类列表40</li>
            <li>分类列表41</li>
            <li>分类列表42</li>
            <li>分类列表43</li>
            <li>分类列表44</li>
            <li>分类列表45</li>
            <li>分类列表46</li>
            <li>分类列表47</li>
            <li>分类列表48</li>
            <li>分类列表49</li>
            <li>分类列表50</li>
            <li>分类列表1</li>
            <li>分类列表2</li>
            <li>分类列表3</li>
            <li>分类列表4</li>
            <li>分类列表5</li>
            <li>分类列表6</li>
            <li>分类列表7</li>
            <li>分类列表8</li>
            <li>分类列表9</li>
            <li>分类列表10</li>
            <li>分类列表11</li>
            <li>分类列表12</li>
            <li>分类列表13</li>
            <li>分类列表14</li>
            <li>分类列表15</li>
            <li>分类列表16</li>
            <li>分类列表17</li>
            <li>分类列表18</li>
            <li>分类列表19</li>
            <li>分类列表20</li>
            <li>分类列表21</li>
            <li>分类列表22</li>
            <li>分类列表23</li>
            <li>分类列表24</li>
            <li>分类列表25</li>
            <li>分类列表26</li>
            <li>分类列表27</li>
            <li>分类列表28</li>
            <li>分类列表29</li>
            <li>分类列表30</li>
            <li>分类列表31</li>
            <li>分类列表32</li>
            <li>分类列表33</li>
            <li>分类列表34</li>
            <li>分类列表35</li>
            <li>分类列表36</li>
            <li>分类列表37</li>
            <li>分类列表38</li>
            <li>分类列表39</li>
            <li>分类列表40</li>
            <li>分类列表41</li>
            <li>分类列表42</li>
            <li>分类列表43</li>
            <li>分类列表44</li>
            <li>分类列表45</li>
            <li>分类列表46</li>
            <li>分类列表47</li>
            <li>分类列表48</li>
            <li>分类列表49</li>
            <li>分类列表50</li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';


    export default {
        name: 'Category',
        data() {
            return {
                scroll: null
            }
        },
        // 组件创建完调用，还没有挂载模板，所以拿不到模板中的属性
        created() {
            /* console.log(this.$refs.aaaa);
            console.log(document.querySelector('.wrapper'))
            this.scroll = new BScroll('.wrapper', {

            }) */
        },
        mounted() {
            // 1、基本使用
            console.log(this.$refs.aaaa);
            console.log(document.querySelector('.wrapper'));
            this.scroll = new BScroll('.wrapper', {
                probeType: 3,
                pullUpLoad: true
            });

            this.scroll.on('scroll', (postion) => {
                console.log(postion);
            });

            this.scroll.on('pullingUp', () => {
                console.log('上拉加载更多');
            });
        },
        methods: {
            btnClick() {
                console.log('点击');
            }
        }
    }
</script>
<style scoped>
    .wrapper {
        height: 150px;
        background: red;
    }
</style>