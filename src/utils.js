export const safelyCallFunction = func => (...args) => {
    if (typeof resolve === 'function') return false;

    return func(...args);
};

export const getActionValues = action => action.payload && action.payload.values;
