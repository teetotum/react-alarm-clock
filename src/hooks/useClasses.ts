import { useState } from "react";
import { isObject, isString, isFunction } from "@src/utils";

type Spec = {[key: string]: {init: boolean; group: number; precedence: number;}};
type StringSet = Set<string>;
type SetClassesArgument = string|types.BoolDictionary|UpdateFunction;
type SetClassesFunction = (...args: SetClassesArgument[]) => void;
type UseClassesFunction = (...initialState: string[]) => [StringSet, SetClassesFunction];
type UpdateFunction = (x: StringSet) => string|string[]|types.BoolDictionary;
type SerializeClassesFunction = (state: StringSet) => string;

export default function makeUseClasses(spec: Spec): [UseClassesFunction, SerializeClassesFunction] {
    const specGroups = groupByGroup(spec, Object.keys(spec));

    const useClasses = (...initialState: string[]): [StringSet, SetClassesFunction] => {
        initialState.forEach((className: string) => {
            console.assert(className in spec, `${className} not in spec.`);
        });

        const [classes, _setClasses] = useState<StringSet>(() => {
            const defaultState = Object.keys(spec).filter((key: string) => spec[key].init);
            return new Set([...defaultState, ...initialState]);
        });

        const setClasses = (...args: SetClassesArgument[]) => {
            _setClasses((oldState: StringSet) => {
                let [diff, toRemove] = parseArguments(oldState, ...args);

                let diffGroups = groupByGroup(spec, [...diff]);
                for (let key of Object.keys(diffGroups)) {
                    const group = parseInt(key);
                    if (group === 0) return;

                    const specArray = specGroups[group];
                    const diffArray = diffGroups[group];
                    const filtered = specArray.filter((key: string) => !diffArray.includes(key));
                    toRemove = [...toRemove, ...filtered];
                }

                const merged = new Set([...oldState, ...diff]);
                const filtered = [...merged].filter((key: string) => !toRemove.includes(key));
                const newState = new Set(filtered);
                return newState;
            });
        };

        return [classes, setClasses];
    }

    const serializeClasses = (state: StringSet): string => {
        const sorted = [...state].sort((a: string, b: string) => {
            return spec[a].precedence - spec[b].precedence
        });
        const result = sorted.join(" ");
        return result;
    }

    return [useClasses, serializeClasses];
}

const parseArguments = ( oldState: StringSet, ...args: SetClassesArgument[]): [StringSet, string[]] => {
    let diff = new Set<string>();
    const toRemove: string[] = [];

    for (let x of args) {
        const value = isFunction(x) ? (x as UpdateFunction)(oldState) : x;

        if (isString(value)) {
            diff.add(value as string);
        } else if (Array.isArray(value)) {
            diff = new Set([...diff, ...(value as string[])]);
        } else {
            for (let key of Object.keys(value)) {
                if ((value as types.BoolDictionary)[key]) {
                    diff.add(key)
                } else {
                    toRemove.push(key);
                }
            }
        }
    }

    return [diff, toRemove];
}

const groupByGroup = (spec: Spec, keys: string[]) => {
    let result: {[key: number]: string[]} = {}

    keys.forEach((key: string) => {
        const group = spec[key].group;
        if (group in result) {
            result[group].push(key);
        } else {
            result[group] = [key];
        }
    });

    return result;
}
