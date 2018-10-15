import assert from './core';

export function create (ctx) {
    const instance = assert.bind(null);
    instance.context = ctx || Object.create(null);
    return instance;
}

export function inherit (from) {
    const ctx = from && from.context;
    return create(Object.assign(Object.create(null), ctx));
}

export default { create, inherit };
