import React, { useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { scaleBand, scaleLinear, scaleOrdinal } from "@vx/scale";
import { Group } from "@vx/group";
import RacingAxisTop from "./RacingAxisTop";
import RacingBarGroup from "./RacingBarGroup";
import { getStyle } from "../../utils/common-utils";
import { COLOR_ARRAY3 } from "../../constants/colors";

const RacingBarChart = React.forwardRef(({parentRef, keyframes, categories, onStart, onStop}, ref) => {
    const [{frameIdx, animationKey, playing}, setAnimation] = useState({
        frameIdx: 0,
        animationKey: 0,
        playing: false,
    });
    const updateFrameRef = useRef();
    // when replay, increment the key to rerender the chart.
    useEffect(() => {
        if (!updateFrameRef.current && playing) {
            updateFrameRef.current = setTimeout(() => {
                setAnimation(({frameIdx: prevFrameIdx, playing, ...others}) => {
                    const isLastFrame = prevFrameIdx === keyframes.length - 1;
                    const nextFrameIdx = isLastFrame ? prevFrameIdx : prevFrameIdx + 1;
                    return {
                        ...others,
                        frameIdx: playing ? nextFrameIdx : prevFrameIdx,
                        playing: !!(playing && !isLastFrame),
                    };
                });
                updateFrameRef.current = null;
            }, 250);
        }
    });

    const [chartDimension, setChartDimension] = useState({width: 0, height: 0});

    useEffect(() => {
        if (parentRef.current) {
            setChartDimension({
                width: getStyle(parentRef.current, 'width'),
                height: getStyle(parentRef.current, 'height'),
            });
        }
    }, [parentRef]);

    let numOfBars = 10,
        width = chartDimension.width,
        height = chartDimension.height,
        margin = {
            top: 30,
            right: 60,
            bottom: 10,
            left: 110,
        },
        colorScale = scaleOrdinal(COLOR_ARRAY3).domain(categories).range(COLOR_ARRAY3);

    const barGroupRef = useRef();
    const axisRef = useRef();
    useImperativeHandle(ref, () => ({
        replay: () => {
            clearTimeout(updateFrameRef.current);
            updateFrameRef.current = null;
            setAnimation(({animationKey, ...others}) => ({
                ...others,
                frameIdx: 0,
                animationKey: animationKey + 1,
                playing: true,
            }));
        },
        start: () => {
            setAnimation((animation) => ({
                ...animation,
                playing: true,
            }));
        },
        stop: () => {
            setAnimation((animation) => ({
                ...animation,
                playing: false,
            }));
            barGroupRef.current.stop();
            axisRef.current.stop();
        },
        playing,
    }));
    const prevPlayingRef = useRef(playing);

    useEffect(() => {
        if (prevPlayingRef.current !== playing) {
            if (playing) {
                onStart();
            } else {
                onStop();
            }
        }
        prevPlayingRef.current = playing;
    }, [onStart, onStop, playing]);

    useLayoutEffect(() => {
        if (barGroupRef.current) {
            if (playing) {
                barGroupRef.current.start();
                axisRef.current.start();
            }
        }
    });
    const frame = keyframes[frameIdx];
    const {date: currentDate, data: frameData} = frame;
    const values = frameData.map(({value}) => value);
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const domainMax = Math.max(...values);
    const xScale = scaleLinear({
        domain: [0, domainMax],
        range: [0, xMax],
    });
    const yScale = useMemo(
        () =>
            scaleBand({
                domain: Array(numOfBars)
                    .fill(0)
                    .map((_, idx) => idx),
                range: [0, yMax],
                padding: 0.1,
            }),
        [numOfBars, yMax]
    );

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    let dateObj = currentDate;
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();

    let dateInYear = month + '\n' + day + ',' + year;

    return (
        parentRef.current && (
            <svg width={width} height={height} className='race-bar-svg'>
                <Group top={margin.top} left={margin.left} key={animationKey}>
                    <RacingBarGroup
                        frameData={frameData.slice(0, numOfBars)}
                        xScale={xScale}
                        yScale={yScale}
                        colorScale={colorScale}
                        ref={barGroupRef}
                    />
                    <text textAnchor="end" x={xMax + margin.right - 10} y={yMax} className='md:text-2xl text-xl'>
                        {dateInYear}
                    </text>
                    <line x1={0} y1={0} x2={0} y2={yMax} stroke="black" />
                    <RacingAxisTop domainMax={domainMax} xMax={xMax} ref={axisRef} />
                </Group>
            </svg>
        )
    );
});

RacingBarChart.defaultProps = {
    width: 600,
    height: 450,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 100,
    },
};

export default RacingBarChart;
