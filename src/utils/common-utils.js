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

export function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @param number
 * @param decimal
 * @return {number}
 */
export function toFixedNumber(number, decimal) {
    var tenToD = Math.pow(10, decimal);
    return +(Math.round((number + Number.EPSILON) * tenToD) / tenToD).toFixed(decimal);
}

/**
 *
 * @param current
 * @param previous
 * @return {string}
 */
export function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = Math.max(0, current - previous),
        r,
        fixRelative = (num, str) => {
            let t0 = num > 1 ? 's' : '';
            if (str === 'day' && num === 1) {
                return 'Yesterday';
            }
            return `${num} ${str}${t0} ago`;
        };

    if (elapsed < msPerMinute) {
        return `${Math.round(elapsed / 1000)} seconds ago`;
    } else if (elapsed < msPerHour) {
        r = Math.round(elapsed / msPerMinute);
        return fixRelative(r, 'minute');
    } else if (elapsed < msPerDay) {
        return fixRelative(Math.round(elapsed / msPerHour), 'hour');
    } else if (elapsed < msPerMonth) {
        return fixRelative(Math.round(elapsed / msPerDay), 'day');
    } else if (elapsed < msPerYear) {
        return fixRelative(Math.round(elapsed / msPerMonth), 'month');
    } else {
        return fixRelative(Math.round(elapsed / msPerYear), 'year');
    }
}

/**
 *
 * @param json
 * @return {any}
 */
export function clone(json) {
    return JSON.parse(JSON.stringify(json));
}

export const IS_MOBILE_DEVICE = window.innerWidth < 769;
