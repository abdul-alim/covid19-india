/**
 *
 * @param a
 * @param b
 * @return {number}
 */
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

/**
 *
 * @param a
 * @param b
 * @return {number}
 */
function descending(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

export {ascending, descending};
