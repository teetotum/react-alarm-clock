import { useState } from "react";
import { isString, isFunction } from "@utils";

type SetClassNameArgument = string|types.BoolMap|((x: types.BoolMap) => types.BoolMap);

export default function useClassName(...initialState: (string|types.BoolMap)[]): [string, Function] {
    const [classes, setClasses] = useState<types.BoolMap>(() => init(initialState));

    const setClassName = (mode: "set"|"update", ...args: SetClassNameArgument[]) => {
        const objs = args.map((x: SetClassNameArgument) => {
            if (isFunction(x)) {
                return (x as Function)(classes);
            } else if (isString(x)) {
                return {[x as string]: true};
            } else {
                return x;
            }
        });

        let newState;
        if (mode === "set") {
            newState = Object.assign({}, ...objs);
        } else {
            newState = Object.assign({}, classes, ...objs);
        }

        setClasses(newState);
    };

    return [serialize(classes), setClassName];
}

const init = (initialState: (string|types.BoolMap)[]): types.BoolMap => {
    let objs = initialState.map((x: string|types.BoolMap) => {
        if (isString(x)) {
            return {[x as string]: true};
        } else {
            return x;
        }
    });

    return Object.assign({}, ...objs);
}

const serialize = (classes: types.BoolMap): string => {
    let fn = (key: keyof typeof classes) => classes[key];
    const keys = Object.keys(classes);
    const classArray = keys.filter(fn);
    const result = classArray.join(" ");
    return result;
}
