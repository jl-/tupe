const defaults = {
    stream: process.stdout
};

export default function sanitize (options = {}) {
    return { ...defaults, ...options };
}
