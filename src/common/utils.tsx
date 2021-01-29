export function isFunction(obj: any) {
    return obj && Object.prototype.toString.call(obj) === '[object Function]';
}

export function isString(obj: any) {
    return Object.prototype.toString.call(obj) === "[object String]";
}
