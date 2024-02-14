![npm version](https://img.shields.io/npm/v/@teleology/variable-resolution.svg) ![npm license](https://img.shields.io/npm/l/@teleology/variable-resolution.svg)
# @teleology/variable-resolution 

A tiny javascript template rendering engine


## Installation

```sh
npm i -D @teleology/variable-resolution
```
or
```sh
yarn add -D @teleology/variable-resolution
```

## Usage

Anything within `{{ }}` will be treated as javascript. Whitespace will be ignored. In the advent that a function is referenced without any parameters, it will be invoked with the context object.

Example:
```javascript
const { slim } = require('@teleology/variable-resolution');

const template = `
    Hey {{ user.name }}, how are you doing?? 
    Haven't seen you since the vacation in {{ user.lastKnownLocation }}.
`;

const context = {
    user: {
        name: 'McTester',
        lastKnownLocation: 'Japan'
    },
};

console.log(slim(template, context));
```

Output:
```bash

    Hey McTester, how are you doing?? 
    Haven't seen you since the vacation in Japan.

```

## Parameter Injection

Example:
```javascript
const context = {
  a: 'New York',
  z: 'Spain',
}

const template = `From {{ a }} to {{ z }}.`;

slim(template, context); 
```

Output:
```bash
From New York to Spain.
```

## Regular Function

Example:
```javascript
const context = {
  add: (a, b, c) => a + b + c,
}

const template = `Addition: {{ add(2, '3', 1.4) }}`;

slim(template, context); 
```

Output:
```bash
Addition: 231.4
```

## Contextual Function Params

Example:
```javascript
const context = {
  bikeWheels: (a, b) => a * b,
  BIKE_TIRES: 2,
}

const template = `All 3 of them had, {{ bikeWheels(3, BIKE_TIRES) }} tires!`;

slim(template, context); 
```

Output:
```bash
All 3 of them had, 6 tires!
```

## Experimental 

An experimental async functionality is included in this build. This will allow async functions to be used within the template. 

```javascript
const { slimAsync } = require('@teleology/variable-resolution');

const template = `
    Hey {{ user.name }}, how are you doing?? 
    Haven't seen you since the vacation in {{ lastKnownLocation }}.
`;

const context = {
  user: {
    name: 'McTester',
  },
  lastKnownLocation: async () =>
    new Promise((res) => {
      res('Japan');
    }),
};

(async () => {
  console.log(await slimAsync(template, context));
})();
```

Output:
```bash

    Hey McTester, how are you doing?? 
    Haven't seen you since the vacation in Japan.

```