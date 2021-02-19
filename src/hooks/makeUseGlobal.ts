import { useState, useEffect } from "react";

export default function makeUseGlobal<T>(initialState: T) {
    let globalState = initialState;
    const listeners = new Set();

    const setState = (value: T) => {
        globalState = value;
        listeners.forEach((listener: Function) => {
            listener();
        });
    }

    return (): [T, Function] => {
        const [state, _setState] = useState<T>(globalState);

        useEffect(() => {
            const listener = () => {
                _setState(globalState);
            }
            listeners.add(listener);
            listener();

            return () => {
                return () => listeners.delete(listener);
            }
        }, []);

        return [state, setState];
    }
}
