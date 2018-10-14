# Tupe

<!-- Badges -->
![licence](https://badgen.net/badge/licence/MIT/blue)
[![npm version](https://badgen.net/npm/v/tupe)](https://www.npmjs.com/package/tupe)
[![npm downloads](https://badgen.net/npm/dm/tupe)](https://www.npmjs.com/package/tupe)

###### [API](/) | [FAQ](/)

> A decent runner for front-end Unit-Testing.


```javascript
import test from 'tupe';

// before, beforeEach, ...

test('some test', t => {
});

test('some test', async (t) => {
});

test('some test', (t, cb) => {
});

test('some test', t => {
    // return new Promise(...);
});
```
