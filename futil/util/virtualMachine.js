const os = require('os');

const isRunningInVM = () => {
    const cpus = os.cpus();
    return {
        value: cpus.some(cpu => cpu.model.includes('GenuineIntel') || cpu.model.includes('AuthenticAMD')),
        cpus
    };
};

module.exports = isRunningInVM;