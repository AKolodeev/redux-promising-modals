export const safelyCallFunction = (func) => (...args) => {
    if (typeof func !== 'function') {
        return false;
    }

    return func(...args);
};

export const getActionValues = (action) => action.payload && action.payload.values;

export const rotateArray = (array, clockwise = true) => {
    const startPos = clockwise ? array.length - 1 : 0;
    const arrayCopy = array.slice();
    const firstElem = arrayCopy.splice(startPos, startPos + 1);
    return clockwise ? firstElem.concat(arrayCopy) : arrayCopy.concat(firstElem);
};

export const toArray = (element) => [].concat(element);
