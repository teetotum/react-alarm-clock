import { useRef } from "react";

export function useConstructor(callback: Function, args: any[] = []) {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) {
        return;
    } else {
        callback(...args);
        hasBeenCalled.current = true;
    }
}
