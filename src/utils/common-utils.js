/**
 *
 * @param xs
 * @param key
 * @return {*}
 */
export function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export function defined(obj) {
    return obj !== undefined;
}
