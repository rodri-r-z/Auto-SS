const fs = require('fs');
const path = require('path');

const dirs = ["C:\\Windows\\Prefetch", "C:\\Users\\rodri\\AppData\\Local\\Temp"];
const searchWords = [
    "JNATivehook", "Rar$EX", "minecraft", "autoclick",
    "killaura",  "wurst", "huzuni", "trojan", "ransom", 
    "impact", "vape", "meteor", "dream", "whiteout", 
    "raven", "macros", "host", "client", ".jar", ".exe",
    ".jre", "click", "Itami"
];

function analyzePaths() {
    const result = [];
    const now = Date.now();
    for(const dir of dirs) {
        const files = fs.readdirSync(dir);
        for(const file of files) {
            for(const word of searchWords) {
                if(file.toLowerCase().includes(word)) {
                    result.push({
                        file:{
                            path: path.join(dir, file),
                            name: file,
                        },
                        dir,
                        word
                    })
                }
            }
        }
    }
    const after = Date.now();
    return({
        result,
        time: after - now
    });
}

module.exports = analyzePaths;