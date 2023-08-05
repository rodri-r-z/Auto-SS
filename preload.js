// futils
const isVirtualMachine = require("./futil/util/virtualMachine"); //v
const usnJournal = require("./futil/util/usnJournal");
const checkUsersMenu = require("./futil/util/users"); //v
const usbPlugs = require("./futil/util/usbPlugs"); //v
const showHiddenIcons = require("./futil/util/showHiddenIcons"); //v
const searchTemp = require("./futil/util/searchTemp"); // --
const regEdit = require("./futil/util/regEdit"); //v
const recycleBin = require("./futil/util/recycleBin"); //v
const openRecentEls = require("./futil/util/openRecentEls"); //v
const keyboardEvent = require("./futil/util/keyboardEvent");
const firewall = require("./futil/util/firewall"); //v
const dnsCheck = require("./futil/util/dnsCheck"); //v
const controlPanel = require("./futil/util/controlPanel"); //v
const cmdServices = require("./futil/util/cmdServices");
const research = require("./futil/util/research"); //v

// modules
const http = require("http");
const { Server } = require("socket.io");
const portscanner = require("portscanner");
const fs = require("fs");
const path = require("path");
const os = require("os");

const server = http.createServer(function(_, res) {
    res.statusCode = 200;
});
const ws = new Server(server);
ws.on("connection", (socket) => {
    socket.on("research path", path => {
        path = path.replace(/\%user\%/g, os.userInfo().username);
        if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
            socket.emit("research", research(path));
        } else {
            console.log("failed");
            socket.emit("error", "Path not found or is not a directory");
        }
    });
    socket.on("check cmd", () => {
        cmdServices().then(e => socket.emit("check cmd", e));
    });
    socket.on("open control panel", () => {
        controlPanel();
    });
    socket.on("check dns", () => {
        dnsCheck().then(e => socket.emit("check dns", e));
    });
    socket.on("list firewall", () => {
        firewall().then(e => socket.emit("list firewall", e));
    });
    /*keyboardEvent(function(...args) {
        socket.emit("keyboard event", ...args);
    });*/
    socket.on("open recent", () => {
        openRecentEls()
    });
    socket.on("open recycle bin", () => {
        recycleBin();
    });
    socket.on("check regedit", (type, operation) => {
        try {
            regEdit(type, operation).then(e => socket.emit("check regedit", e)).catch(e => socket.emit("error", e));
        } catch (e) {
            socket.emit("error", e);
        }
    });
    socket.on("analyze temp dir", () => {
        socket.emit("analyze temp dir", searchTemp());
    });
    socket.on("open hidden icons", () => {
        showHiddenIcons();
    });
    socket.on("check usb plugs", () => {
        socket.emit("check usb plugs", usbPlugs());
    });
    usbPlugs(function(...args) {
        socket.emit("usb change", ...args);
    });
    socket.on("check users menu", () => {
        checkUsersMenu();
    });
    socket.on("check usn journal", (type) => {
        if (!fs.existsSync(type)) {
            return socket.emit("error", "Path not found or is not a directory");
        }
        usnJournal(type).then(e => socket.emit("check usn journal", e)).catch(e => socket.emit("error", e));
    });
    socket.on("check virtual machine", () => {
        socket.emit("check virtual machine", isVirtualMachine());
    });
});
let isDocumentLoaded = false;
document.addEventListener("DOMContentLoaded", () => {
    isDocumentLoaded = true;
});
portscanner.findAPortNotInUse(1000, 9999, function(err, ports) {
    if (err) {
        console.log("error");
        return;
    }
    const renderer = fs.readFileSync(path.join(__dirname, "renderer.js"), "utf8");
    if (isDocumentLoaded) {
        const sc = document.createElement("script");
        sc.src = "http://localhost:"+ports+"/socket.io/socket.io.min.js";
        document.body.appendChild(sc);
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            const sc = document.createElement("script");
            sc.src = "http://localhost:"+ports+"/socket.io/socket.io.min.js";
            document.body.appendChild(sc);
        });
    }
    fs.writeFileSync(path.join(__dirname, "renderer.js"), renderer.replace(/const \_\_\_\_BRYDGET\_INIT\_VALUES\_\_PORT \= [0-9]{1,}((\;)?)/, "const ____BRYDGET_INIT_VALUES__PORT = " + ports+";"));
    console.log("listening on port "+ports);
    server.listen(ports);
})