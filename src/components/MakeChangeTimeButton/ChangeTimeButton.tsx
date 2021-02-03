import React, {
    memo,
    useEffect,
    useRef,
    FunctionComponent
} from "react";
import useClassName from "@hooks/useClassName";
import { BoolMap } from "@common/types";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    callback: Function;
    alarmIsSet: boolean;
    className: string|BoolMap;
};

const ChangeTimeButton: FunctionComponent<PropsType> = memo((props) => {
    const anchorRef  = useRef<HTMLAnchorElement>();
    const timeoutId  = useRef<number>();
    const intervalId = useRef<number>();

    const [className, setClassName] = useClassName({
        changeTimeButton: true,
        button: true,
    }, props.className);

    const press = (e: any) => {
        e.preventDefault();

        if (props.alarmIsSet) {
            return;
        }

        // @Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        setClassName("update", {
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__alarmIsSet: false
        });

        props.callback();

        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                props.callback();
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        if (props.alarmIsSet) {
            return;
        }

        setClassName("update", (classes: BoolMap) => {
            return {
                changeTimeButton__unpressed: classes.changeTimeButton__pressed,
                changeTimeButton__pressed: false,
                changeTimeButton__alarmIsSet: false
            };
        });

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        setClassName("update", {
            changeTimeButton__alarmIsSet: props.alarmIsSet,
            changeTimeButton__pressed: false,
            changeTimeButton__unpressed: false
        });

        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend", release);

        return () => {
            anchorRef.current.removeEventListener("touchstart", press);
            anchorRef.current.removeEventListener("touchend", release);
        }
    }, [props.alarmIsSet]);

    return (
        <span className={className} onMouseDown={press} onMouseUp={release}
         onMouseLeave={release} ref={anchorRef}>
            {props.children}
        </span>
    );
});

export default ChangeTimeButton;
