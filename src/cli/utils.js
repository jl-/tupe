export function env (name, positive) {
    process.env[name] = positive || '';
}
