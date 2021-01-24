import { useState, useRef } from "react";

export function useConstructor(callback: Function, args: any[] = []) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback(...args);
        hasBeenCalled.current = true;
    }
}

export function useForceUpdate() {
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(prevCount => prevCount + 1);
    return increment;
}
