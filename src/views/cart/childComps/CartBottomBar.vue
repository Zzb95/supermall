<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button 
                :is-checked="isSelectAll" 
                class="check-button" 
                @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    import {mapGetters} from 'vuex'

    export default {
        name: 'CartButtomBar',
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                /* return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked;
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count;
                }, 0).toFixed(2) */
                return '￥' + this.cartList.filter(item => {
                    return item.checked;
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count;
                }, 0).toFixed(2)
            },
            checkLength() {
               /*  return this.$store.state.cartList.filter(item => {
                    return item.checked;
                }).length; */
                return this.cartList.filter(item => {
                    return item.checked;
                }).length;
            },
            isSelectAll() {
                if (this.cartList.length === 0) {
                    return false;
                }

                // 先找没有被选中的元素，如果有的话就取反，表示没有全选
                // 1、使用filter
                // return !this.cartList.filter(item => !item.checked).length;

                // 2、使用find
                // return !this.cartList.find(item => !item.checked);

                // 3、普通遍历
                for (let item of this.cartList) {
                    if (!item.checked) {
                        return false;
                    }
                }

                return true;
            }
        },
        methods: {
            checkClick() {
                // 全部选中的时候
                /* if (this.isSelectAll) {
                    this.cartList.forEach(item => item.checked = false);
                } else {
                    // 部分或全部不选中
                    this.cartList.forEach(item => item.checked = true);
                } */

                this.cartList.forEach(item => item.checked = !this.isSelectAll);
            },
            calcClick() {
                if (!this.isSelectAll) {
                    
                }
            }
        }
    }
</script>
<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;

        height: 40px;
        line-height: 40px;

        background: #eee;
    }

    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 90px;
    }

    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 20px;
        flex: 1;
    }

    .calculate {
        width: 90px;
        background: red;
        color: #fff;
        text-align: center;
    }
</style>