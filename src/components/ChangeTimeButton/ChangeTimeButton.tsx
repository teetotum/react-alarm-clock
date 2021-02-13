import React, {
    useState,
    useEffect,
    useRef,
    memo,
    useMemo
} from "react";
import useConstructor from "@hooks/useConstructor";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import AudioManager from "@business/AudioManager";
import Sound from "@business/Sound";
import buttonSound from "./button.mp3";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    type: types.ChangeTimeButtonType;
    disabled: boolean;
    onPress: (type: types.ChangeTimeButtonType) => void;
    className: string|types.BoolDictionary;
};

const ChangeTimeButton = memo((props: PropsType) => {
    const [pressed, setPressed] = useState<boolean>(false);
    const [classes, setClasses] = useClasses({changeTimeButton: true, button: true});
    useEffect(() => setClasses("update", props.className), [props.className]);

    const anchorRef  = useRef<HTMLAnchorElement>();
    const timeoutId  = useRef<number>();
    const intervalId = useRef<number>();
    const sound      = useRef<Sound>();

    useConstructor(() => {
        const audioContext = AudioManager.instance().context
        sound.current = new Sound(audioContext, buttonSound);
    });

    const action = (type: types.ChangeTimeButtonType) => {
        props.onPress(type);
        sound.current.play()
    }

    const press = (e: any) => {
        e.preventDefault();

        if (props.disabled) {
            return;
        }

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        setPressed(true);

        setClasses("update", {
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__disabled: false
        });

        action(props.type);

        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                action(props.type);
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        if (!pressed || props.disabled) {
            return;
        }

        setPressed(false);

        setClasses("update", (classes: types.BoolDictionary) => {
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
        setClasses("update", {
            changeTimeButton__disabled: props.disabled,
            changeTimeButton__pressed: false,
            changeTimeButton__unpressed: false
        });

        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend", release);

        return () => {
            anchorRef.current.removeEventListener("touchstart", press);
            anchorRef.current.removeEventListener("touchend", release);
        }
    }, [props.disabled]);

    // @@Note: Maybe it's silly to memoize this, since we probably
    // won't change the type once it is first set.
    const icon = useMemo(() => {
        if (props.type === "h+" || props.type === "m+") {
            return <PlusIcon className="button_icon"/>;
        } else {
            return <MinusIcon className="button_icon"/>;
        }
    }, [props.type]);

    return (
        <span
            onMouseDown={press}
            onMouseUp={release}
            onMouseLeave={release}
            ref={anchorRef}
            className={serializeClasses(classes)}
        >
            {icon}
        </span>
    );
});

export default ChangeTimeButton;
