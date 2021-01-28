import { useState, useRef } from "react";
import { isFunction } from "@common/utils";
import { BoolMap } from "@common/types";

export function useConstructor(callback: Function, args: any[] = []) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback(...args);
        hasBeenCalled.current = true;
    }
}

export function useClassName(initial: BoolMap): [string, Function] {
    const [classes, setClasses] = useState<BoolMap>(initial);

    const serialize = (classes: BoolMap): string => {
        type KeyType = keyof typeof classes;
        let fn = (key: KeyType) => classes[key];

        const keys = Object.keys(classes);
        const classArray = keys.filter(fn);
        const result = classArray.join(" ");
        return result;
    }

    type ArgumentType = BoolMap|((obj: BoolMap) => BoolMap);
    const setter = (arg: ArgumentType) => {
        if (isFunction(arg)) {
            setClasses((arg as Function)(classes));
        } else {
            setClasses(arg as BoolMap);
        }
    }

    return [serialize(classes), setter];
}
