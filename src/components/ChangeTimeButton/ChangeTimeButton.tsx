import React, { useEffect, useRef, FunctionComponent } from "react";
import { useClassName } from "@common/hooks";
import { TimeoutId, IntervalId, ButtonAction, TimeUnit, ChangeTimeFunction } from "@common/types";
import { replace } from "@common/utils";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

const BASE_CLASSES = {
    "change-time-button": true,
    "button": true
};

type PropsType = {
    action: ButtonAction,
    unit: TimeUnit,
    changeTime: ChangeTimeFunction;
};

const ChangeTimeButton: FunctionComponent<PropsType> = (props) => {
    const {unit, action, changeTime} = props;

    const [className, setClassName] = useClassName(BASE_CLASSES);
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<TimeoutId>();
    let intervalId = useRef<IntervalId>();

    const press = (e: any) => {
        e.preventDefault();

        let currentTarget = e.currentTarget;
        let anchor = currentTarget as HTMLAnchorElement;
        let action = anchor.dataset.action as ButtonAction;
        let unit   = anchor.dataset.unit   as TimeUnit;

        setClassName((classes: Object) => {
            return Object.assign({}, BASE_CLASSES, {pressed: true});
        });

        changeTime(action, unit);

        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(
                () => changeTime(action, unit),
                CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        // @Typescript: Type classes appropriately.
        setClassName((classes: any) => {
            return Object.assign({}, BASE_CLASSES, {unpressed: classes["pressed"]});
        });

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend",   release);
    }, []);

    return (
        <a className={className} data-action={action} data-unit={unit}
            onMouseDown={press} onMouseUp={release} onMouseLeave={release}
            ref={anchorRef}>
            {props.children}
        </a>
    );
}

export default ChangeTimeButton;
