const {GlobalKeyboardListener} = require("node-global-key-listener");
const v = new GlobalKeyboardListener();

module.exports = function keyPress(callback) {
    v.addListener(function (e) {
        callback(e);
    });    
}