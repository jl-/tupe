# Tupe

<!-- Badges -->
![licence](https://badgen.net/badge/licence/MIT/blue)
[![npm version](https://badgen.net/npm/v/tupe)](https://www.npmjs.com/package/tupe)
[![npm downloads](https://badgen.net/npm/dm/tupe)](https://www.npmjs.com/package/tupe)

##### [API](#api) | [Congiguration](#configuration) | [FAQ](#faq)

> A generic unit-testing framework for front-end.➰ 

## Features
- [AVA](https://github.com/avajs/ava) like api
- isolation
- concurrency
- power-assert support

## Motivations


## API

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

## FAQ
