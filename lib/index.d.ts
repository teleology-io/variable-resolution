declare const VariableType: {
    AB: string;
    TEXT: string;
    BOOL: string;
    NUMBER: string;
    JSON: string;
    SCHEDULED: string;
};
declare type Variable = {
    name: string;
    type: (typeof VariableType)[keyof typeof VariableType];
    value: any;
    rollout: number;
    overrides: any;
};
export declare const resolveVariable: (variable: Variable, uid: string, fallback_value?: any) => any;
export {};
