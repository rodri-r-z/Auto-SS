const { exec } = require('child_process');
const command = 'netsh advfirewall firewall show rule name=all';

module.exports = function firewall() {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                return reject(error);
            }
            const result = stdout.split('\n').map(line => line.trim());
            const rules = [];
            let final = [];
        
            let current = [];
            result.forEach((line) => {
                if (!line) {
                    rules.push(current);
                    current = [];
                    return;
                }
                current.push(line);
            });
            final = rules.map((rule) => {
                rule = rule.filter((item) => !item.startsWith("-"));
                const obj = {};
                for (const item of rule) {
                    const [key, value] = Buffer.from(item).toString("utf-8").split(":").map(item => item.trim());
                    obj[key] = value;
                }
                return obj;
            });
            resolve(final);
        });               
    })
}