// localStorage

/**
 * 设置缓存
 * @param key
 * @param content
 */
export const setStore = (key, content) => {
    if (!key) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(key, content);
};

/**
 * 获取缓存
 * @param key
 * @returns {string}
 */
export const getStore = (key) => {
    if (!key) {
        return;
    }
    return window.localStorage.getItem(key);
};

/**
 * 删除缓存信息
 * @param key
 */
export const removeStore = (key) => {
    if (!key) return;
    return window.localStorage.removeItem(key);
};