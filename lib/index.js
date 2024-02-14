"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveVariable = void 0;
const VariableType = {
    AB: 'ab',
    TEXT: 'text',
    BOOL: 'boolean',
    NUMBER: 'number',
    JSON: 'json',
    SCHEDULED: 'scheduled'
};
const parseValue = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return value;
    }
};
const string = (value) => {
    let hash = 0;
    if (value.length === 0) {
        return hash;
    }
    for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i);
        hash |= 0;
    }
    return hash;
};
const xor = (a, b) => string(a) ^ string(b);
const mod = (n, m) => ((n % m) + m) % m;
const resolveVariable = (variable, uid, fallback_value) => {
    // const percentile = 100 * variable.rollout
    const overrides = variable.overrides || {};
    if (overrides[uid])
        return overrides[uid];
    // create a hash from unique and path
    const hash = xor(variable.name, uid);
    switch (variable.type) {
        case VariableType.AB: {
            // Get a value from the array 
            if (Array.isArray(variable.value)) {
                const percentile = mod(hash, variable.value.length);
                return variable.value[percentile];
            }
            return variable.value;
        }
        default: {
            return parseValue(variable.value || fallback_value);
        }
    }
};
exports.resolveVariable = resolveVariable;
