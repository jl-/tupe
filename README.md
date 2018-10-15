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

test('Hello Tupe', t => {
    const who = { name: 'Hello Tupe!' };
    t(who.name === 'Hel' + 'o Tupe~');
});

test('Is Unit-Testing Awesome?', async t => {
    const answer = true;
    await new Promise(r => setTimeout(r, 1000));
    t(answer === true);
});

test('Unit-Testing Runners', t => {
    const runners = ['AVA', 'Tupe'];
    t(runners.indexOf('Tupe') === 0);
});
```

<img width="712" alt="screen shot 2018-10-16 at 12 37 27 am" src="https://user-images.githubusercontent.com/6291986/46964846-c5380c00-d0db-11e8-8a77-d85d45565188.png">

## FAQ
