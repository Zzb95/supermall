import axios from 'axios'

/**
 * 方式1
 * @param {配置} config 
 * @param {成功的函数} success 
 * @param {失败的函数} failure 
 */
/* export function request(config, success, failure) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/hy',
        timeout: 5000
    });

    // 发送真正的网络请求
    instance(config)
        .then(res => {
            success(res);
        })
        .catch(err => {
            failure(err);
        })
} */


/**
 * 方式2
 * @param {配置} config 
 */
/* export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/hy',
        timeout: 5000
    });

    // 发送真正的网络请求
    instance(config.baseConfig)
        .then(res => {
            config.success(res);
        })
        .catch(err => {
            config.failure(err);
        })
} */

/**
 * 方式3：推荐使用这种方式
 */
/* export function request(config) {
    return new Promise((resolve, reject) => {
        // 1、创建axios的实例
        const instance = axios.create({
            baseURL: 'http://123.207.32.32:8000/api/hy',
            timeout: 5000
        });

        // 发送真正的网络请求
        instance(config)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
} */

/**
 * 方式4：这种方式，简写的方式
 */
export function request(config) {
    // 1、创建axios的实例
    const instance = axios.create({
        //baseURL: 'http://123.207.32.32:8000/api/hy',
        baseURL: 'http://106.54.54.237:8000/api/hy',
        timeout: 5000
    });

    // 2. axios的拦截器
    // 2.1 请求拦截的作用
    // axios.interceptors 全局拦截
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
    });

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data; // 返回data
    }, err => {
    })

    return instance(config)
}

/**
 * 当以后更改的时候，只需要更改此文件夹
 */