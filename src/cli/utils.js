export function setFlag (name, positive) {
    if (positive) {
        process.env[name] = 1;
    }
}
