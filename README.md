## Tupe
Unit-Testing Framework.

```javascript
import test from 'tupe';

// before, beforeEach, ...

test('some test', t => {
    t(1 === 2);
});

test('some test', async (t) => {
    // 
});

test('some test', (t, cb) => {
    // cb('err message');
});

test('some test', t => {
    // return new Promise(...);
});
```
