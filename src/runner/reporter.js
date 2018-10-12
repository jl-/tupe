export default function bindReporter (runner) {
    // logger
    const log = console.log.bind(console);
    const error = console.error.bind(console);

    // before hook
    runner.on('beforeHook:passed', global.onSpecFinished || log);
    runner.on('beforeHook:failed', global.onSpecFinished || error);

    // beforeEach hook
    runner.on('beforeEachHook:passed', global.onSpecFinished || log);
    runner.on('beforeEachHook:failed', global.onSpecFinished || error);

    // each case
    runner.on('case:passed', global.onSpecFinished || log);
    runner.on('case:failed', global.onSpecFinished || error);

    // afterEach hook
    runner.on('afterEachHook:passed', global.onSpecFinished || log);
    runner.on('afterEachHook:failed', global.onSpecFinished || error);

    // after hook
    runner.on('afterHook:passed', global.onSpecFinished || log);
    runner.on('afterHook:failed', global.onSpecFinished || error);

    // finished
    runner.on('done', passed => (global.onSuiteFinished || log)(passed, global.__coverage__));

    return runner;
}
