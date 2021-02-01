import { useState } from "react";
import { isString, isFunction } from "@common/utils";
import { BoolMap } from "@common/types";

type SetClassNameArgument = string|BoolMap|((x: BoolMap) => BoolMap);

export default function useClassName(...initialState: (string|BoolMap)[]): [string, Function] {
    const [classes, setClasses] = useState<BoolMap>(() => init(initialState));

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

const init = (initialState: (string|BoolMap)[]): BoolMap => {
    let objs = initialState.map((x: string|BoolMap) => {
        if (isString(x)) {
            return {[x as string]: true};
        } else {
            return x;
        }
    });

    return Object.assign({}, ...objs);
}

const serialize = (classes: BoolMap): string => {
    let fn = (key: keyof typeof classes) => classes[key];
    const keys = Object.keys(classes);
    const classArray = keys.filter(fn);
    const result = classArray.join(" ");
    return result;
}
