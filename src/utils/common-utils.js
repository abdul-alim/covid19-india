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
export const IS_SINGLE_COLUMN = window.innerWidth < 1620;

/**
 *
 * @param url
 * @param message
 * @return {Window}
 */
function shareURL(url, message) {
    const shareUri = `https://www.addtoany.com/share#url=${encodeURI(url)}&title=${encodeURI(message)}`;
    const h = 500;
    const w = 500;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    return window.open(
        shareUri,
        document.title,
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
            w +
            ', height=' +
            h +
            ', top=' +
            top +
            ', left=' +
            left
    );
}

export function shareTheApp() {
    const message = document.title,
        url = window.location.href;

    if (navigator.share !== undefined) {
        navigator
            .share({
                title: message,
                text: message,
                url: url,
            })
            .then()
            .catch((error) => {});
    } else {
        shareURL(url, message);
    }
}

export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export function isTouchDevice() {
    return window.ontouchstart !== undefined;
}
