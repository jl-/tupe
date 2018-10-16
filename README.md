# Tupe

<!-- Badges -->
![licence](https://badgen.net/badge/licence/MIT/blue)
[![npm version](https://badgen.net/npm/v/tupe)](https://www.npmjs.com/package/tupe)
[![npm downloads](https://badgen.net/npm/dm/tupe)](https://www.npmjs.com/package/tupe)

##### [API](#api) | [Congiguration](#configuration) | [Examples](#examples) | [FAQ](#faq)

> A generic unit-testing runner for front-end.➰ 

## Features
- 🚀 Blazing fast: Tupe use the great [Parcel](https://github.com/parcel-bundler/parcel) as bundler, and [Puppeteer](https://github.com/GoogleChrome/puppeteer) as runtime environment under the hook, making it fast on both bundle-time and runtime.
- 🌓 Isolation & 🎎 Concurrency: Each test file is bundled and run as a isolated new tab on puppeteer concurrently. 
- 🎨 Descriptive assertion: bonus with [Power-Assert](https://github.com/power-assert-js/power-assert) builtin.
- 🐦 Configuration-Free: almost no configuration, except for some basic babel setup, which might agrees to your project setup already
- ❄️ Simplicity. use the standard assert interface.

## Motivations
There are already tons of unit-testing runner/framework for JavaScript.
- some requires a bit configuration, like karma, not simple enough.
- when it comes to front-end code testing that requires a browser environment, many of them utilize jsdom, which is a subset emulation of a web browser for use in nodejs environment. That's awesome, but would it be great and more reliable if our code runs in a real-world browser?
- features like concurrency and isolation are great. You should definitely try out AVA and Jest, they are awesome. But again, they don't seems to bundle for a real-world browser? Correct me if I'm wrong, thanks~
- Puppeteer is born, which seems to be a perfect fit for browser-side JavaScript testing. Maybe we can try it out and learn how to build a unit test runner, And have all the fun along the way, that's the whole point.~.

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
