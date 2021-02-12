import { useState } from "react";
import { isString, isFunction } from "@utils";

export default function useClasses(...initialState: (string|types.BoolMap)[]): [types.BoolMap, Function] {
    const [classes, setClasses] = useState<types.BoolMap>(() => {
        const objs = initialState.map((x: string|types.BoolMap) => {
            if (isString(x)) {
                return {[x as string]: true};
            } else {
                return x;
            }
        })

        return Object.assign({}, ...objs);
    });

    type ArgumentType = string|types.BoolMap|((x: types.BoolMap) => types.BoolMap);
    const setter = (mode: "set"|"update", ...args: ArgumentType[]) => {
        setClasses((classes: types.BoolMap) => {
            const objs = args.map((x: ArgumentType) => {
                if (isFunction(x)) {
                    return (x as Function)(classes);
                } else if (isString(x)) {
                    return {[x as string]: true};
                } else {
                    return x;
                }
            });

            if (mode === "set") {
                return Object.assign({}, ...objs);
            } else {
                return Object.assign({}, classes, ...objs);
            }
        });
    };

    return [classes, setter];
}

export const serializeClasses = (classes: types.BoolMap): string => {
    let fn = (key: keyof typeof classes) => classes[key];
    const keys = Object.keys(classes);
    const classArray = keys.filter(fn);
    const result = classArray.join(" ");
    return result;
}
