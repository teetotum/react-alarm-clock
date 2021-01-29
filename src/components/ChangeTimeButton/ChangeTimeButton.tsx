import React, { useEffect, useRef, memo, FunctionComponent} from "react";
import { useClassName } from "@common/hooks";
import { BoolMap } from "@common/types";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    callback: Function;
    disabled: boolean;
    className: (string|BoolMap);
};

const ChangeTimeButton: FunctionComponent<PropsType> = memo((props) => {
    let anchorRef  = useRef<HTMLAnchorElement>();
    let timeoutId  = useRef<number>();
    let intervalId = useRef<number>();

    const [className, setClassName, updateClassName] = useClassName({
        changeTimeButton__pressed: false,
        changeTimeButton__unpressed: false,
        changeTimeButton: true,
        button: true,
    }, props.className);

    useEffect(() => updateClassName({
        changeTimeButton__disabled: props.disabled,
        changeTimeButton__pressed: false,
        changeTimeBUtton__unpressed: false
    }), [props.disabled]);

    const press = (e: any) => {
        e.preventDefault();

        if (props.disabled) return;

        updateClassName({
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__disabled: false
        });

        props.callback();
        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(props.callback, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        if (props.disabled) return;

        updateClassName((classes: BoolMap) => {
            return {
                changeTimeButton__unpressed: classes.changeTimeButton__pressed,
                changeTimeButton__pressed: false,
                changeTimeButton__disabled: false
            };
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
