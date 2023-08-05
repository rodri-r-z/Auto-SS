const HID = require('node-hid');
const udb = require("usb");
const devices = HID.devices();
const fs = require('fs');
const path = require('path');
const hidList = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "resources", "hid.json"), 'utf8'));

module.exports = function usbPlug(callback) {
    if (typeof callback === "function") {
        udb.usb.on("attach", (device) => {
            device.device = udb.findByIds('0x'+device.deviceDescriptor.idVendor.toString(16), '0x'+device.deviceDescriptor.idProduct.toString(16));
            callback(0, device)
        });
        udb.usb.on("detach", (...args) => callback(1, ...args));
    }

    const final = devices.map(device => {
        const name = device.product;
        const path = device.path;
        const usage = hidList[device.usage] || "Desconocido";
        return {
            device:{
                name,
                path,
                usage,
                manufacter: device.manufacturer || "Desconocido",
            },
            raw: device
        }
    });
    return final;
}