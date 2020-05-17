import React from 'react';

const buildFindData = (data) => {
    const dataByDateAndName = new Map();
    data.forEach((dataPoint) => {
        const {date, name} = dataPoint;
        if (!dataByDateAndName.get(date)) {
            dataByDateAndName.set(date, {[name]: dataPoint});
        } else {
            const nextGroup = {
                ...dataByDateAndName.get(date),
                [name]: dataPoint,
            };
            dataByDateAndName.set(date, nextGroup);
        }
    });
    const finder = ({date, name}) => {
        try {
            return dataByDateAndName.get(date)[name];
        } catch (e) {
            return null;
        }
    };
    return finder;
};

const makeKeyframes = (data, numOfSlice) => {
    const findData = buildFindData(data);
    const nameSet = new Set(data.map(({name}) => name));

    const nameList = [...nameSet];
    const dateSet = new Set(data.map(({date}) => date));
    const dateList = [...dateSet];

    const frames = dateList.map((date) => ({
        date,
        data: nameList.map((name) => {
            const dataPoint = findData({date, name});
            return {
                ...dataPoint,
                value: dataPoint ? dataPoint.value : 0,
            };
        }),
    }));

    const keyframes = frames
        .reduce((result, frame, idx) => {
            const prev = frame;
            const next = idx !== frames.length - 1 ? frames[idx + 1] : null;
            if (!next) {
                result.push({...frame, date: new Date(frame.date)});
            } else {
                const prevTimestamp = new Date(prev.date).getTime();
                const nextTimestamp = new Date(next.date).getTime();
                const diff = nextTimestamp - prevTimestamp;
                for (let i = 0; i < numOfSlice; i++) {
                    const sliceDate = new Date(prevTimestamp + (diff * i) / numOfSlice);
                    const sliceData = frame.data.map(({name, value, ...others}) => {
                        const prevValue = value;
                        const nextDataPoint = findData({date: next.date, name});
                        const nextValue = nextDataPoint ? nextDataPoint.value : 0;
                        const sliceValue = prevValue + ((nextValue - prevValue) * i) / numOfSlice;
                        return {
                            name,
                            value: sliceValue,
                            ...others,
                        };
                    });
                    result.push({
                        date: sliceDate,
                        data: sliceData,
                    });
                }
            }
            return result;
        }, [])
        .map(({date, data}) => {
            return {
                date,
                data: data.sort((a, b) => b.value - a.value),
            };
        });
    return keyframes;
};

export {makeKeyframes};
