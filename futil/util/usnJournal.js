const fs = require('fs');

async function runCommandAnalyzer(pathToTxt) {
    try {
        const content = fs.readFileSync(pathToTxt).toString("utf-8");
        const regex = /[0-9]{1,}\,[\s\S]*?\,[0-9]{1,}((\,)?)\s*[0-9a-zA-Z]{1,}\,[\s\S]*?\s*\|\s*[\s\S]*?\"\,\"[\s\S]*?\"\,[0-9a-zA-Z]{1,}\,\"[\s\S]*?\,[0-9a-zA-Z]{1,}\,[0-9a-zA-Z]{1,}\,[0-9a-zA-Z]{1,}\,\"[\s\S]*?[0-9]{1,}\,[0-9]{1,}\,[0-9]{1,}\,[0-9]{1,}/g;
        const result = content.match(regex) || [];
        return result.map(item => item.trim()).map(e => {
            const items = e.split("|")[0].split(',');
            const fileName = items[1];
            const operation = items[3];
            const date = (e.split('|')[1].match(/[0-9]{1,}\/[0-9]{1,}\/[0-9]{1,}\s*[0-9]{1,}\:[0-9]{1,}\:[0-9]{1,}/g) || [])[0];
            return {
                fileName,
                operation,
                date
            }
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

module.exports = runCommandAnalyzer;
