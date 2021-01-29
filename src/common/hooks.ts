import { useState, useRef } from "react";
import { isString, isFunction } from "@common/utils";
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

export function useClassName(...initial: (string|BoolMap)[]): [string, Function, Function] {
    const init = (): BoolMap => {
        let objs = [];
        for (let i = 0; i < initial.length; i++) {
            let x = initial[i];
            if (isString(x)) {
                objs.push({[x as string]: true});
            } else {
                objs.push(x);
            }
        }
        return Object.assign({}, ...objs);
    }

    const [classes, setClasses] = useState<BoolMap>(init);

    const serialize = (classes: BoolMap): string => {
        type KeyType = keyof typeof classes;
        let fn = (key: KeyType) => classes[key];

        const keys = Object.keys(classes);
        const classArray = keys.filter(fn);
        const result = classArray.join(" ");
        return result;
    }

    type FunctionType = (obj: BoolMap) => BoolMap;
    type ArgumentType = BoolMap|FunctionType;
    const set = (arg: ArgumentType) => {
        let newState: BoolMap;
        if (isFunction(arg)) {
            newState = (arg as Function)(classes);
        } else {
            newState = arg as BoolMap;
        }
        setClasses(newState);
    }

    const update = (arg: ArgumentType) => {
        let delta: BoolMap;
        if (isFunction(arg)) {
            delta = (arg as Function)(classes);
        } else {
            delta = (arg as BoolMap);
        }
        setClasses(Object.assign({}, classes, delta));
    }

    return [serialize(classes), set, update];
}
