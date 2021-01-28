import React, { useEffect, useRef, FunctionComponent } from "react";
import { useClassName } from "@common/hooks";
import { BoolMap, TimeoutId, IntervalId } from "@common/types";
import "./ChangeTimeButton.scss";

const BASE_CLASSES = {"change-time-button": true, "button": true};
const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = { callback: Function; };

const ChangeTimeButton: FunctionComponent<PropsType> = (props) => {
    const {callback} = props;

    const [className, setClassName] = useClassName(BASE_CLASSES);
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<TimeoutId>();
    let intervalId = useRef<IntervalId>();

    const press = (e: any) => {
        e.preventDefault();

        setClassName((classes: BoolMap) => {
            return Object.assign({}, BASE_CLASSES, {pressed: true});
        });

        callback();
        timeoutId.current = setTimeout(() => {
            const id = setInterval(callback, CHANGE_TIME_REPEAT_PERIOD);
            // @Note: Why do we have to do this?
            intervalId.current = (id as unknown) as TimeoutId;
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        setClassName((classes: BoolMap) => {
            return Object.assign({}, BASE_CLASSES, {unpressed: classes.pressed});
        });

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend",   release);
    }, []);

    return (
        <a className={className} onMouseDown={press} onMouseUp={release}
         onMouseLeave={release} ref={anchorRef}>
            {props.children}
        </a>
    );
}

export default ChangeTimeButton;
