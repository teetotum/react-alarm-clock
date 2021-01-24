import React, { useState, useEffect, useRef } from "react";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import { useForceUpdate } from "@common/hooks";
import { TimeoutId, IntervalId, Action, Unit } from "@common/types";
import "./ChangeTimeButton.scss";

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
    let classes    = useRef<string[]>(["button"]);
    const forceUpdate = useForceUpdate();

    const {unit, action, changeTime} = props;
    const icon = (action === "increase") ?
        <PlusIcon  className="icon" /> :
        <MinusIcon className="icon" />;

    const press = (e: any) => {
        e.preventDefault();

        let currentTarget = e.currentTarget;
        let anchor = currentTarget as HTMLAnchorElement;
        let action = anchor.dataset.action as Action;
        let unit   = anchor.dataset.unit   as Unit;

        classes.current = replace(classes.current, "fadeout", "fadein", true);
        changeTime(action, unit);

        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(() => {
                changeTime(action, unit);
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        classes.current = replace(classes.current, "fadein", "fadeout", false);
        forceUpdate();

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend",   release);
    }, []);

    let className = classes.current.join(" ");

    return (
        <a className={className} data-action={action} data-unit={unit}
           onMouseDown={press} onMouseUp={release} onMouseLeave={release}
           ref={anchorRef}>
            {icon}
        </a>
    );
}

const replace = (arr: string[], x: string, y: string, insert: boolean) => {
    let result = arr.slice();
    let index = result.indexOf(x);
    if (index > -1) {
        result.splice(index, 1, y);
    } else if (insert) {
        result.push(y);
    }
    return result;
}
