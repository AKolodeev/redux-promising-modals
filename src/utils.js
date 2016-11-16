export const safelyCallFunction = func => (...args) => {
    if (typeof func !== 'function') return false;

    return func(...args);
};

export const getActionValues = action => action.payload && action.payload.values;

export getNextType(types) {
    const newTypes = types.slice();
    const firstType = newTypes.shift();
    newTypes.pop(firstType);
    return newTypes;
} 

export getNextProp(props) {
    const newProps = props.slice();
    const firstProp = newTypes.shift();
    newProps.pop(firstProp);
    return newProps;
}

export getPrevType(types) {
    const newTypes = types.slice();
    const lastType = newTypes.pop();
    newTypes.unshift(lastType);
    return newTypes;
}

export getPrevProp(props) {
    const newProps = props.slice();
    const lastProp = newTypes.pop();
    newProps.unshift(lastProp);
    return newProps;
}
