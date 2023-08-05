const childProcess = require('child_process');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const regExp = /[a-z]\:\\([a-z\-0-9.\\]+)+\s*[0-9a-zA-Z\_]{1,}\s*[0-9a-z]{1,}(((\s[a-z0-9]{1,})+)?)/gi;
const abecedary_es = [..."abcdefghijklmnñopqrstuvwxyz 0123456789:<>/-:\\."];

const regPaths = {
    store: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Compatibility Assistant\\Store",
    cache: "HKEY_CLASSES_ROOT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\MuiCache",
    app: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FeatureUsage\\AppSwitched",
    osp: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU",
    arch: "HKEY_CURRENT_USER\\SOFTWARE\\WinRAR\\ArcHistory",
    cidsizemenu: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\CIDSizeMRU",
    user: "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\bam\\State\\UserSettings\\S-1-5-21-3717294198-4166066372-1238365284-1001",
    user2: "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\bam\\State\\UserSettings\\S-1-5-21-3717294198-4166066372-1238365284-1002",
    jump: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FeatureUsage\\ShowJumpView",
    run: "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU",
    tcp1: "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters",
    tcp2: "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces"
};

const tcpInvalid = [
    "TcpNoDelay",
    "WorldMaxTcpWindowsSize",
    "SackOpts",
    "TcpMaxDataRetransmissions",
    "Tcp1323Opts",
    "TcpMaxDupAcks",
    "TcpAckFrequency",
    "TcpTimedWaitDelay",
    "TcpNumConnections"
]

module.exports = function regEdit(type, operation) {
    return new Promise((resolve, reject) => {
        if (regPaths[type] && !type.toLowerCase().startsWith("tcp")) {
            if (operation === "list") {
                childProcess.exec('reg query "'+regPaths[type]+'"',
                    (error, stdout) => {
                        if (error) return reject(error);
                        const result = stdout.trim();
                        const items = result.match(regExp) || [];
                        const final = items.map(item => {
                            const line = item.split(" ").filter(e => e !== "").join(" ");
                            return line;
                        });
                        resolve({
                            items: [...new Set(final)],
                            legit: {valid: abecedary_es.some(e => final.some(item => !item.toLowerCase().includes(e.toLowerCase()))) }
                        })
                    });
            } else {
                const uuid = uuidv4();
                childProcess.exec('reg export "'+regPaths[type]+'" "'+path.join(__dirname, uuid+".txt")+'"',
                    (error) => {
                        if (error) return reject(error);
                        const content = fs.readFileSync(path.join(__dirname, uuid+".txt"), 'utf8');
                        fs.unlinkSync(path.join(__dirname, uuid+".txt"));
                        const result = content.trim().split("").filter(e => e === "\n" || [...abecedary_es].some(item => e.toLowerCase().includes(item))).join("");
                        return resolve(result);
                    });
            }
        } else if (type.toLowerCase().startsWith("tcp")) {
            childProcess.exec('reg query "'+regPaths[type]+'"',
                (error, stdout) => {
                    if (error) return reject(error);
                    const result = stdout.trim().split("\n");
                    const legitTcp = result.filter(item => tcpInvalid.some(e => !item.toLowerCase().includes(e.toLowerCase())));
                    resolve({
                        items:result,
                        legit: {
                            valid: legitTcp.length > 4
                        },
                    });
                });
        }
    });
}