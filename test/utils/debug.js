import test from 'ava';
import td from 'testdouble';

const random = `${Math.random()}`;
const random2 = `${Math.random()}`;

// replace dependencies
const debug = td.replace('debug');
td.replace('../../package', { name: random });

// require the test file target
const target = require('../../src/utils/debug').default;

test('prefix debug scope with package name', t => {
    target(random2);

    const info = td.explain(debug);
    t.is(info.calls[0].args[0], `${random}:${random2}`);
});
