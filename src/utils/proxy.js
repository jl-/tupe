export function intercept (source, middleman) {
    return new Proxy(middleman, {
        get (target, prop) {
            return (prop in target ? target : source)[prop];
        }
    });
}
