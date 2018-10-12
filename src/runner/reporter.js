export default function bindReporter (runner) {
    const log = console.log.bind(console);
    const error = console.error.bind(console);

    runner.on('case:passed', global.onCasePassed || global.onCaseFinished || log);
    runner.on('case:failed', global.onCaseFailed || global.onCaseFinished || error);
    runner.on('hook:passed', global.onHookPassed || global.onHookFinished || log);
    runner.on('hook:failed', global.onHookFailed || global.onHookFinished || error);
    runner.on('done', () => (global.onPageFinished || log)(global.__coverage__));

    return runner;
}
