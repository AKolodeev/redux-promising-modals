export const safelyCallFunction = func => (...args) => {
    if (typeof func !== 'function') return false;

    return func(...args);
};

export const getActionValues = action => action.payload && action.payload.values;
