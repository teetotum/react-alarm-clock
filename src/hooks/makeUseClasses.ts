import { useState } from "react";
import { isString, isFunction } from "@src/utils";

type StringSet = Set<string>;
type GroupDictionary = {[key: number]: Set<string>};
type Spec = {[key: string]: {init: boolean; group: number; precedence: number;}};
type SetClassesArgument = string|types.BoolDictionary|UpdateFunction;
type SetClassesFunction = (...args: SetClassesArgument[]) => void;
type UseClassesFunction = (...initialState: string[]) => [StringSet, SetClassesFunction];
type UpdateFunction = (oldState: StringSet) => string|string[]|types.BoolDictionary;
type SerializeClassesFunction = (state: StringSet) => string;

export default function makeUseClasses(spec: Spec): [UseClassesFunction, SerializeClassesFunction] {
    const groups = getGroups(spec, Object.keys(spec));

    const useClasses = (...initialState: string[]): [StringSet, SetClassesFunction] => {
        checkNames(spec, ...initialState);

        const [classes, _setClasses] = useState<StringSet>(() => {
            const defaultState = Object.keys(spec).filter((key: string) => spec[key].init);
            return new Set([...defaultState, ...initialState]);
        });

        const setClasses = (...args: SetClassesArgument[]) => {
            _setClasses((oldState: StringSet) => {
                let [insert, remove] = parseArguments(oldState, ...args);

                checkNames(spec, ...insert);
                checkNames(spec, ...remove);

                const diff = getDiff(groups, getGroups(spec, [...insert]));
                remove = new Set([...remove, ...diff]);

                const newState = new Set([...oldState, ...insert].filter((key: string) => !remove.has(key)));
                return newState;
            });
        };

        return [classes, setClasses];
    }

    const serializeClasses = (state: StringSet) => {
        const sorted = [...state].sort((a: string, b: string) => {
            return spec[a].precedence - spec[b].precedence
        });
        const result = sorted.join(" ");
        return result;
    }

    return [useClasses, serializeClasses];
}

const parseArguments = (oldState: StringSet, ...args: SetClassesArgument[]) => {
    let insert = new Set<string>();
    let remove = new Set<string>();

    for (let x of args) {
        const value = isFunction(x) ? (x as UpdateFunction)(oldState) : x;

        if (isString(value)) {
            const name = value as string;
            insert.add(name);
        } else if (Array.isArray(value)) {
            const names = value as string[];
            insert = new Set([...insert, ...names]);
        } else {
            const dictionary = value as types.BoolDictionary;
            for (let key of Object.keys(value)) {
                (dictionary[key] ? insert : remove).add(key);
            }
        }
    }

    return [insert, remove];
}

const getDiff = (x: GroupDictionary, y: GroupDictionary): StringSet => {
    let result = new Set<string>();

    for (let key of Object.keys(y)) {
        const group = parseInt(key);
        if (group === 0) return;

        const a = x[group];
        const b = y[group];
        const c = [...a].filter((key: string) => !b.has(key));
        result = new Set([...result, ...c]);
    }

    return result;
}

const getGroups = (spec: Spec, keys: string[]) => {
    let result: {[key: number]: Set<string>} = {};

    for (let key of keys) {
        const group = spec[key].group;
        if (group in result) {
            result[group].add(key);
        } else {
            result[group] = new Set([key]);
        }
    }

    return result;
}

const checkNames = (spec: Spec,...names: string[]) => {
    for (let name of names) {
        console.assert(name in spec, `${name} not in spec.`);
    }
}
