import React, { useEffect, useRef } from "react";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import { useForceUpdate, useClasses } from "@common/hooks";
import { TimeoutId, IntervalId, ButtonAction, TimeUnit } from "@common/types";
import { replace } from "@common/utils";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    action: ButtonAction,
    unit: TimeUnit,
    changeTime: (action: ButtonAction, unit: TimeUnit) => void;
};

export default function ChangeTimeButton(props: PropsType) {
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<TimeoutId>();
    let intervalId = useRef<IntervalId>();
    let classes    = useClasses("change-time-button", "button");
    const forceUpdate = useForceUpdate();

    const {unit, action, changeTime} = props;

    const press = (e: any) => {
        e.preventDefault();

        let currentTarget = e.currentTarget;
        let anchor = currentTarget as HTMLAnchorElement;
        let action = anchor.dataset.action as ButtonAction;
        let unit   = anchor.dataset.unit   as TimeUnit;

        classes.current = replace(classes.current, "unpressed", "pressed", true);

        changeTime(action, unit);
        timeoutId.current = setTimeout(() => {
            intervalId.current = setInterval(
                () => changeTime(action, unit),
                CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        classes.current = replace(classes.current, "pressed", "unpressed", false);
        forceUpdate();

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend",   release);
    }, []);

    let icon = (action === "increase") ?  <PlusIcon  className="icon"/> : <MinusIcon className="icon"/>
    let className = classes.current.join(" ");

    return (
        <a className={className} data-action={action} data-unit={unit}
            onMouseDown={press} onMouseUp={release} onMouseLeave={release}
            ref={anchorRef}>
            {icon}
        </a>
    );
}
