const childProcess = require('child_process');
const promosify = require("../libs/promisify");
const exec = promosify(childProcess.exec);
const matchRegexp = /(([0-9a-zA-Z]{1,}\.)+)[0-9a-zA-Z]{1,}/gi;

async function dns() {
    const data = await exec("ipconfig /displaydns");
    return (data || "").match(matchRegexp) || [];
}

module.exports = dns;