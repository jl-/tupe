# Tupe

<!-- Badges -->
![licence](https://badgen.net/badge/licence/MIT/blue)
[![npm version](https://badgen.net/npm/v/tupe)](https://www.npmjs.com/package/tupe)
[![npm downloads](https://badgen.net/npm/dm/tupe)](https://www.npmjs.com/package/tupe)

##### [API](#api) | [Congiguration](#configuration) | [Examples](#examples) | [FAQ](#faq)

> A generic unit-testing framework for front-end.➰ 

## Features
- [AVA](https://github.com/avajs/ava) like api
- isolation
- concurrency
- power-assert support

## Motivations


## Examples

```javascript
import test from 'tupe';

test('hello tupe!', t => {
    const who = { name: 'Tupe!' };
    t(who.name === 'Tupe!');
});

test('async waiting...', async t => {
    const answer = true;
    await new Promise(r => setTimeout(r, 1500));
    t(answer === true);
});

test('misspell my name ?', t => {
    const who = { name: 'Hello Tupe!' };
    t(who.name === 'Hel' + 'o Tupe~');
});

test('use callback ?', (t, done) => {
    setTimeout(() => {
        t('dump' === 'dump');
        done();
    }, 1500);
});

test('array assert', t => {
    const runners = ['AVA', 'Tupe'];
    t(runners.indexOf('Tupe') === 0);
});
```

![render1539627393699](https://user-images.githubusercontent.com/6291986/46970445-ac375700-d0eb-11e8-8125-8be313035aa0.gif)

## FAQ
