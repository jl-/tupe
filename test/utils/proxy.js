import test from 'ava';
import td from 'testdouble';
import { intercept } from '../../src/utils/proxy';

test.beforeEach(t => {
    t.context.fallback = {
        foo: td.func(),
        random: `${Math.random()}`
    };
    t.context.random = `${Math.random()}`;
});

test('props from middleman matched first', t => {
    const target = intercept(t.context.fallback, {
        random: t.context.random
    });
    t.is(target.random, t.context.random);
})

test('match props from fallback if not in middleman', t => {
    const target = intercept(t.context.fallback, {});
    target.foo();
    const info = td.explain(t.context.fallback.foo);
    t.is(info.callCount, 1);
})
