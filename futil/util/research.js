const fs = require('fs');
const path = require('path');
const natural = require('natural');
const bayesClassifier = natural.BayesClassifier.restore(JSON.parse(fs.readFileSync(__dirname+'/../resources/model.json').toString("utf-8")));

const bannedWords = [
    "xray",
    "x-ray",
    "x_ray",
    "reach",
    "wurst",
    "radar",
    "map",
    "radar",
    "pvp",
    "reach",
    "modify",
    "modifi",
    "kill",
    "impact",
    "fly",
    "flight",
    "jesus",
    "sneak",
    "bridge",
    "build",
    "click",
    "huzuni",
    "client",
    "process",
    "cheat",
    "hack",
    ".gg",
    ".lol",
    ".wtf",
    ".xyz",
    ".pro",
    ".net",
    ".rip",
    "JNATivehook", "Rar$EX"
];

function recursiveCheck(dir) {
    let preliminarResult = [];
    let filesScanned = 0;
    const now = Date.now();
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            const reslt = recursiveCheck(filePath);
            preliminarResult = preliminarResult.concat(reslt.preliminarResult);
            filesScanned += reslt.filesScanned;
        } else {
            for(const word of bannedWords) {
                if (file.toLowerCase().includes(word)) {
                    preliminarResult.push({
                        name: file,
                        path: filePath,
                        detecteBy: {
                            type:"name",
                            word
                        }
                    });
                }
            }
            const textExtensions = ['.txt', '.log', '.ini', '.json', '.yml', '.yaml'];
            if (textExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
                const contents = fs.readFileSync(filePath).toString("utf-8");
                for(const word of bannedWords) {
                    if (contents.toLowerCase().includes(word)) {
                        let aiStartedRunning = Date.now();
                        const ai = {
                            result: bayesClassifier.classify(filePath),
                            raw: bayesClassifier.getClassifications(filePath).map(e => {
                                    e.value = (parseFloat(e.value * 100)) + "%";
                                    return e;
                                }),
                            time: Date.now() - aiStartedRunning + "ms"
                        };
                        preliminarResult.push({
                            name: file,
                            path: filePath,
                            detecteBy: {
                                type: "content",
                                word
                            },
                            
                            /*content: {
                                lineIndex,
                                content: line
                            },*/
                            ai
                        });
                    }
                }
            }
            filesScanned++;
        }
    }
    const legitSoftware = preliminarResult.filter(e => e.ai?.result === "legit").length;
    const malwareSoftware = preliminarResult.filter(e => e.ai?.result === "malware").length;
    const scanPreliminar = {
        legit:legitSoftware,
        malware:malwareSoftware,
        result: malwareSoftware === legitSoftware ? "legit" : Math.max(legitSoftware, malwareSoftware) === malwareSoftware ? "malware" : "legit",
    }
    const after = Date.now();
    return {
        preliminarResult,
        filesScanned,
        scanPreliminar,
        timeTaken: after - now
    };
}


module.exports = recursiveCheck;