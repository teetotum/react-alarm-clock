import { useState, useRef } from "react";
import { isFunction } from "@common/utils";

export function useConstructor(callback: Function, args: any[] = []) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback(...args);
        hasBeenCalled.current = true;
    }
}

// @nocommit: Think about the types more throughly.
export function useClassName(initial: Object): [string, Function] {
    const [classes, setClasses] = useState<Object>(initial);

    const serialize = (classes: Object): string => {
        type KeyType = keyof typeof classes;
        let fn = (key: KeyType) => classes[key];

        const keys = Object.keys(classes);
        const classArray = keys.filter(fn);
        const result = classArray.join(" ");
        return result;
    }

    type ArgumentType = Object|((obj: Object) => Object);
    const setter = (arg: ArgumentType) => {
        if (isFunction(arg)) {
            setClasses((arg as Function)(classes));
        } else {
            setClasses(arg as Object);
        }
    }

    return [serialize(classes), setter];
}
