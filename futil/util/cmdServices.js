const promisify = require("../libs/promisify");
const childProcess = require('child_process');

const process = promisify(childProcess.exec);
async function cmdServicesCheck() {
    const sysMain = (await process("sc query Sysmain")).includes("STOPPED");
    const dps = (await process("sc query DPS")).includes("STOPPED");
    const eventLog = (await process("sc query EventLog")).includes("STOPPED");
    const PcaSvc = (await process("sc query PcaSvc")).includes("STOPPED");
    const DiagTrack = (await process("sc query DiagTrack")).includes("STOPPED");
    const result = {
        errors: [],
        warning: false,
        services: []
    };
    if (sysMain) {
        result.errors.push("Sysmain");
    } else {
        result.services.push("Sysmain");
    }
    if (dps) {
        result.errors.push("DPS");
    } else {
        result.services.push("DPS");
    }
    if (eventLog) {
        result.errors.push("EventLog");
    } else {
        result.services.push("EventLog");
    }
    if (PcaSvc) {
        result.errors.push("PcaSvc");
    } else {
        result.services.push("PcaSvc");
    }
    if (DiagTrack) {
        result.warning = true;
    } else {
        result.services.push("DiagTrack");
    }
    return result;
}

module.exports = cmdServicesCheck;