function makeCumulative(obj, key) {
    let prev = 0;
    obj.forEach((row) => {
        row[key] += prev;
        prev = row[key];
    });
}

function dailyTrend(history, xKey, keys, cumulative, count) {
    let series = keys.map((key) => {
        return history.map((row, i) => {
            if (xKey === '$index') {
                return [i, row[key]];
            }
            return [row[xKey], row[key]];
        });
    });

    if (cumulative) {
        series.forEach((s) => {
            makeCumulative(s, 1);
        });
    }

    if (count) {
        series = series.map((s) => s.slice(-count));
    }

    return series;
}

export {dailyTrend, makeCumulative};
