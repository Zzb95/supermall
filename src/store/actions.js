import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context, payload) {
        // payload新添加的商品
        /* let oldPorduct = null;
        for (let item of state.cartList) {
            if (item.iid === payload.iid) {
                oldPorduct = item;
            }
        } */

        // 1、查找之前的数组中是否有该商品
        let oldPorduct = context.state.cartList.find(item => {
            console.log(item);
            return item.iid === payload.iid;
        });

        // 判断oldPorduct是否存在
        if (oldPorduct) {
            // oldPorduct.count += 1;
            context.commit(ADD_COUNTER, oldPorduct);
        } else {
            payload.count = 1;
            // context.state.cartList.push(payload);
            context.commit(ADD_TO_CART, payload);
        }
    }
}