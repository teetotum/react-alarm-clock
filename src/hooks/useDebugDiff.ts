import React, { useEffect, useRef } from "react";
import { isFunction } from "@utils";

export const useDebugSelectedDiff = (id: string, selected: string, ...objs: types.AnyDictionary[]): void => {
    const idRef = useRef<string>(id);
    const oldDiff = useRef<types.AnyDictionary>(() => {
        return Object.assign({}, ...objs);
    });

    useEffect(function() {
        if (selected !== null && idRef.current !== null && selected !== idRef.current) {
            return;
        }

        console.log("----------------");

        const newDiff: types.AnyDictionary = Object.assign({}, ...objs);
        Object.keys(newDiff).forEach((key: string) => {
            const oldValue = oldDiff.current[key];
            const newValue = newDiff[key];

            if (oldValue !== newValue) {
                console.log(`>>> ${key} changed!`);
                console.log("Before it was ", oldValue);
                console.log("Now it is ",     newValue);
            }
        });

        oldDiff.current = newDiff;
    }, [idRef, objs]);
}

export const useDebugDiff = (...objs: types.AnyDictionary[]): void => {
    return useDebugSelectedDiff(null, null, ...objs);
}
