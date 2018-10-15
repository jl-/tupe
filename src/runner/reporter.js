export default function bindReporter (runner) {
    // fallback logger
    const log = console.log.bind(console);

    runner.on('suite:ready', global.onSuiteReady || log);

    runner.on('hook:finished', global.onHookFinished || log);

    runner.on('case:ready', global.onCaseReady || log);
    runner.on('case:finished', global.onCaseFinished || log);

    // suite finished
    runner.on('suite:finished', passed => (global.onSuiteFinished || log)(passed, global.__coverage__));

    return runner;
}
