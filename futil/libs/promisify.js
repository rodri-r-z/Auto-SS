module.exports = function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, ...out) => {
                if (err) {
                    return reject(err);
                }
                resolve(...out);
            })
        })
    }
}