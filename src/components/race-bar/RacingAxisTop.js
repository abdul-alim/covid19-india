import React, { forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "react-spring";
import AxisTop from "./AxisTop";

const AnimatedAxisTop = animated(AxisTop);

const RacingAxisTop = forwardRef(({domainMax, xMax}, ref) => {
    const prevDomainMaxRef = useRef(domainMax);
    const prevDomainMax = prevDomainMaxRef.current;
    const springProps = useSpring({
        from: {domainMax: prevDomainMax},
        to: {domainMax},
        ref,
    });
    return <AnimatedAxisTop xMax={xMax} {...springProps} />;
});

RacingAxisTop.propTypes = {
    domainMax: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,
};

export default RacingAxisTop;
