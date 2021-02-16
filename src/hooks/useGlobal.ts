import { useState, useEffect } from "react";

export default function createGlobalState<T>(initialState: T) {
    let globalState = initialState;
    const listeners = new Set();

    const setter = (value: T) => {
        globalState = value;
        listeners.forEach((listener: Function) => {
            listener();
        });
    }

    return (): [T, Function] => {
        const [state, setState] = useState<T>(globalState);

        useEffect(() => {
            const listener = () => {
                setState(globalState);
            }
            listeners.add(listener);
            listener();

            return () => {
                return () => listeners.delete(listener);
            }
        }, []);

        return [state, setter];
    }
}
