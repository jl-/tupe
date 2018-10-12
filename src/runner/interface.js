export default function exposeInterface (runner) {
    const api = ::runner.addCase;

    api.before = ::runner.addBeforeHook;
    api.after = ::runner.addAfterHook;
    api.beforeEach = ::runner.addBeforeEachHook;
    api.afterEach = ::runner.addAfterEachHook;

    return api;
}
