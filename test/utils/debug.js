import test from 'ava';
import td from 'testdouble';

test.beforeEach(t => {
    t.context.random = `${Math.random()}`;
    t.context.random2 = `${Math.random()}`;

    // replace dependencies
    t.context.debug = td.replace('debug');
    td.replace('../../package', { name: t.context.random });

    // require the test file target
    t.context.target = require('../../src/utils/debug').default;
});

test.afterEach(() => td.reset());

test('prefix debug scope with package name', t => {
    t.context.target(t.context.random2);

    const info = td.explain(t.context.debug);
    t.is(info.calls[0].args[0], `${t.context.random}:${t.context.random2}`);
});
