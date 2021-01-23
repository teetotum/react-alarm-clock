import React, { useEffect, useRef } from "react";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import { TimeoutId, IntervalId, Action, Unit } from "@common/types";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    action: Action,
    unit: Unit,
    changeTime: (action: Action, unit: Unit) => void;
};

export default function ChangeTimeButton(props: PropsType) {
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<TimeoutId>();
    let intervalId = useRef<IntervalId>();


    const {unit, action, changeTime} = props;
    const icon = (action === "increase") ?
        <PlusIcon  className="icon" /> :
        <MinusIcon className="icon" />;

    const _changeTime = (e: any) => {
        e.preventDefault();

        let currentTarget = e.currentTarget;
        let anchor = currentTarget as HTMLAnchorElement;
        let action = anchor.dataset.action as Action;
        let unit   = anchor.dataset.unit   as Unit;

        changeTime(action, unit);

        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => {
                changeTime(action, unit);
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const clear = (e: any) => {
        e.preventDefault();

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", _changeTime);
        anchorRef.current.addEventListener("touchend",   clear);
    }, []);

    return (
        <a className="button" data-action={action} data-unit={unit}
           onMouseDown={_changeTime} onMouseUp={clear} onMouseLeave={clear}
           ref={anchorRef}>
            {icon}
        </a>
    );
}
