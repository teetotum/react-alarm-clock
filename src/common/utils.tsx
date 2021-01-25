export function replace(arr: string[], x: string, y: string, insert: boolean) {
    let result = arr.slice();
    let index = result.indexOf(x);
    if (index > -1) {
        result.splice(index, 1, y);
    } else if (insert) {
        result.push(y);
    }
    return result;
}
