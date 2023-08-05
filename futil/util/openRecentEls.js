const childProcess = require('child_process');
const os = require('os');

module.exports = () => childProcess.exec("explorer C:\\Users\\{{user}}\\Searches\\Indexed Locations.search-ms".replace('{{user}}', os.userInfo().username));