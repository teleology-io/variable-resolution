
const VariableType = {
  AB: 'ab',
  TEXT: 'text',
  BOOL: 'boolean',
  NUMBER: 'number',
  JSON: 'json',
  SCHEDULED: 'scheduled'
}

type Variable = {
  name: string
  type: (typeof VariableType)[keyof typeof VariableType],
  value: any
  rollout: number
  overrides: any
}

const parseValue = (value: any) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const string = (value: any): number => {
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

const xor = (a: string, b: string) => string(a) ^ string(b);

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const resolveVariable = (variable: Variable, uid: string, fallback_value?: any) => {
  // const percentile = 100 * variable.rollout
  const overrides = variable.overrides || ({} as any);

  if (overrides[uid]) return overrides[uid]

  // create a hash from unique and path
  const hash = xor(variable.name, uid);

  switch (variable.type) {
    case VariableType.AB: {
      // Get a value from the array 
      if (Array.isArray(variable.value)) {
        const percentile = mod(hash, variable.value.length);
        return variable.value[percentile];
      }
      return variable.value
    }
    default: {
      return parseValue(variable.value || fallback_value)
    }
  }
}