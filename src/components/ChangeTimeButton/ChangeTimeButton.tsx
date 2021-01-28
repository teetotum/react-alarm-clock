import React, { useEffect, useRef, memo, FunctionComponent} from "react";
import { useClassName } from "@common/hooks";
import { BoolMap } from "@common/types";
import "./ChangeTimeButton.scss";

const BASE_CLASSES = {"change-time-button": true, "button": true};
const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = { callback: Function; };

const ChangeTimeButton: FunctionComponent<PropsType> = memo((props) => {
    const {callback} = props;

    const [className, setClassName] = useClassName(BASE_CLASSES);
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<number>();
    let intervalId = useRef<number>();

    const press = (e: any) => {
        e.preventDefault();

        setClassName((classes: BoolMap) => {
            return Object.assign({}, BASE_CLASSES, {pressed: true});
        });

        callback();
        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(callback, CHANGE_TIME_REPEAT_PERIOD);
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
});

export default ChangeTimeButton;
