export const browserOptions = {
    timeout: 12000,
    handleSIGINT: false,
    ignoreHTTPSErrors: true,
    args: [
        '--disable-gpu',
        '--ignore-certificate-errors',
        '--force-device-scale-factor'
    ]
};

export default function mergeOptions (...options) {
    return Object.assign({}, browserOptions, ...options);
}
