export default function() {
    return new Promise((resolve, reject) => {
        if (document.readyState === "complete") {
            return resolve();
        }
        document.addEventListener("DOMContentLoaded", () => {
            const interval = setInterval(() => {
                if (document.readyState === "complete") {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    })
}