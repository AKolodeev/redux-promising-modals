export const getActionValues = (action) => action.payload && action.payload.values;

export const safelyResolveWithActionValues = (resolve, action) => {
    if (typeof resolve !== 'function') {
        return false;
    }

    const values = getActionValues(action);

    return resolve(values);
};

export function rotateClockwise<T>(array: T[]) {
    if (array.length === 0) {
        return array;
    }

    const copy = array.slice();
    const movedElement = copy.pop() as T;

    return [movedElement, ...copy];
}

export function rotateCounterClockwise<T>(array: T[]) {
    if (array.length === 0) {
        return array;
    }

    const copy = array.slice();
    const movedElement = copy.shift() as T;

    return copy.concat(movedElement);
}

export function toArray<T>(element: T | T[]) {
    return ([] as T[]).concat(element);
}
