export function retrieveTime() {
    let time = null;
    const json = localStorage.getItem("time");
    if (json !== undefined) {
        time = JSON.parse(json);
    }
    return time;
}

export function storeTime(time: types.Time) {
    localStorage.setItem("time", JSON.stringify(time));
}
