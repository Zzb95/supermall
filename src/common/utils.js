export function debounce(func, delay) {
    let timer = null;

    return function (...args) {
        // 先判断timer是否有值，如果有值的话就先清楚掉
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}