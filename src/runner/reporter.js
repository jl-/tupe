export default function bindReporter (runner) {
    // logger
    const log = console.log.bind(console);
    const error = console.error.bind(console);

    // suite ready
    runner.on('suite:ready', global.onSuiteReady || log);

    // before hook
    runner.on('beforeHook:ready', global.onSpecReady || log);
    runner.on('beforeHook:passed', global.onSpecFinished || log);
    runner.on('beforeHook:failed', global.onSpecFinished || error);

    // beforeEach hook
    runner.on('beforeEachHook:ready', global.onSpecReady || log);
    runner.on('beforeEachHook:passed', global.onSpecFinished || log);
    runner.on('beforeEachHook:failed', global.onSpecFinished || error);

    // each case
    runner.on('case:ready', global.onSpecReady || log);
    runner.on('case:passed', global.onSpecFinished || log);
    runner.on('case:failed', global.onSpecFinished || error);

    // afterEach hook
    runner.on('afterEachHook:ready', global.onSpecReady || log);
    runner.on('afterEachHook:passed', global.onSpecFinished || log);
    runner.on('afterEachHook:failed', global.onSpecFinished || error);

    // after hook
    runner.on('afterHook:ready', global.onSpecReady || log);
    runner.on('afterHook:passed', global.onSpecFinished || log);
    runner.on('afterHook:failed', global.onSpecFinished || error);

    // suite finished
    runner.on('suite:finished', passed => (global.onSuiteFinished || log)(passed, global.__coverage__));

    return runner;
}
