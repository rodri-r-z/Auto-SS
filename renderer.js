import promisifyLoaded from "./public/promisifyLoaded.js";
const ____BRYDGET_INIT_VALUES__PORT = 1000;
await promisifyLoaded();
const ws = io("ws://localhost:"+____BRYDGET_INIT_VALUES__PORT);

const data = {
    showSection: 0,
    screens:{
        vm: false,
        usb: false,
        usbChanged:false,
        analyzePath: false,
        cmdServices: false,
        dnsCheck: false,
        firewall: false,
        reg: {
            list: false,
            export: false
        },
        regedit: {
            cidsizemenu: {
                list: false,
                export: false
            },
            store: {
                list: false,
                export: false
            },
            cache: {
                list: false,
                export: false
            },
            app: {
                list: false,
                export: false
            },
            osp: {
                list: false,
                export: false
            },
            arch: {
                list: false,
                export: false
            },
            user: {
                list: false,
                export: false
            },
            user2: {
                list: false,
                export: false
            },
            jump: {
                list: false,
                export: false
            },
            run: {
                list: false,
                export: false
            },
            mru: {
                list: false,
                export: false
            },
            tcp1: {
                list: false,
                export: false
            },
            tcp2: {
                list: false,
                export: false
            }
        },
        usnJournal: false,
    },
    buttons:{
        usnJournal: false,
        vm: true,
        usb: true,
        analyzePath: true,
        cmdServices: true,
        dnsCheck: true,
        firewall: true,
        regedit: {
            cidsizemenu: {
                list: true,
                export: true
            },
            store: {
                list: true,
                export: true
            },
            cache: {
                list: true,
                export: true
            },
            app: {
                list: true,
                export: true
            },
            osp: {
                list: true,
                export: true
            },
            arch: {
                list: true,
                export: true
            },
            user: {
                list: true,
                export: true
            },
            user2: {
                list: true,
                export: true
            },
            jump: {
                list: true,
                export: true
            },
            run: {
                list: true,
                export: true
            },
            mru: {
                list: true,
                export: true
            },
            tcp1: {
                list: true,
                export: true
            },
            tcp2: {
                list: true,
                export: true
            }
        },
        usnJournal: true
    },
    results: {
        error: false,
        vm: {},
        usb:{},
        usbChanged:{},
        analyzePath: {},
        cmdServices: {},
        dnsCheck: {},
        firewall: {},
        reg: {
            list: {},
            export: ""
        },
        regedit: {
            cidsizemenu: {
                list: {},
                export: {}
            },
            store: {
                list: {},
                export: {}
            },
            cache: {
                list: {},
                export: {}
            },
            app: {
                list: {},
                export: {}
            },
            osp: {
                list: {},
                export: {}
            },
            arch: {
                list: {},
                export: {}
            },
            user: {
                list: {},
                export: {}
            },
            user2: {
                list: {},
                export: {}
            },
            jump: {
                list: {},
                export: {}
            },
            run: {
                list: {},
                export: {}
            },
            mru: {
                list: {},
                export: {}
            },
            tcp1: {
                list: {},
                export: {}
            },
            tcp2: {
                list: {},
                export: {}
            }
        },
        usnJournal: {}
    },
    inputs: {
        analyzeDirInput: "",
        searchMalwareInput: "",
        usnJournalInput: "",
        usnJournalPathInput: ""
    },
    socketRequest: {
        name: "",
        req: ""
    }
};

window.app = new Vue({
    el: "#root",
    data,
    methods: {
        analyzeDir() {
            ws.emit("research path", this.inputs.analyzeDirInput);
        },
        quickCompletions1MinecraftPath() {
            this.inputs.analyzeDirInput = "C:\\Users\\%user%\\AppData\\Roaming\\.minecraft";
        },
        quickCompletions1TempPath() {
            this.inputs.analyzeDirInput = "C:\\Users\\%user%\\AppData\\Local\\Temp";
        },
        changeSection(index) {
            this.showSection = index;
        },
        sendDetectVm() {
            ws.emit("check virtual machine");
            this.buttons.vm = false;
        },
        detectUSB() {
            ws.emit("check usb plugs");
            this.buttons.usb = false;
        },
        openControlPanel() {
            ws.emit("open control panel");
        },
        openHiddenIcons() {
            ws.emit("open hidden icons");
        },
        openRecentEls() {
            ws.emit("open recent");
        },
        openRecycleBin() {
            ws.emit("open recycle bin");
        },
        openUsersMenu() {
            ws.emit("check users menu");
        },
        analyzeDir() {
            if (!this.inputs.analyzeDirInput.trim()) return;
            this.buttons.analyzePath = false;
            ws.emit("research path", this.inputs.analyzeDirInput);
        },
        checkCmdServices() {
            ws.emit("check cmd");
        },
        checkDns() {
            ws.emit("check dns");
        },
        filterMalwareOutput(event) {
            const val = event.target.value;
            document.querySelectorAll(".fileRule").forEach(e => {
                const title = e.textContent.trim();
                if (val.trim() === "") {
                    return e.style.display = "block";
                }
                if (title.toLowerCase().includes(val.toLowerCase())) {
                    e.style.display = "block";
                } else {
                    e.style.display = "none";
                }
            });
        },
        filterDnsOutput(event) {
            const val = event.target.value;
            document.querySelectorAll(".dnsRule").forEach(e => {
                const title = e.querySelector("span");
                if (val.trim() === "") {
                    return e.style.display = "block";
                }
                if (title.innerHTML.toLowerCase().includes(val.toLowerCase())) {
                    e.style.display = "block";
                } else {
                    e.style.display = "none";
                }
            });
        },
        filterFirewallOutput(event) {
            const val = event.target.value;
            document.querySelectorAll(".firewallRule").forEach(e => {
                const title = e.textContent.trim();
                if (val.trim() === "") {
                    return e.style.display = "block";
                }
                if (title.toLowerCase().includes(val.toLowerCase())) {
                    e.style.display = "block";
                } else {
                    e.style.display = "none";
                }
            });
        },
        listFirewall() {
            ws.emit("list firewall");
        },
        listStore() {
            this.socketRequest.name = "store";
            this.socketRequest.req = "list";
            ws.emit("check regedit", "store", "list");
        },
        exportStore() {
            this.socketRequest.name = "store";
            this.socketRequest.req = "export";
            ws.emit("check regedit", "store", "export");
        },
        sendListToSocket(name, req) {
            this.socketRequest.name = name;
            this.socketRequest.req = req;
            this.buttons.regedit[name][req] = false;
            ws.emit("check regedit", name, req);
        },
        filterRegeditOutput(event) {
            const val = event.target.value;
            document.querySelectorAll(".regeditRule").forEach(e => {
                const title = e.textContent.trim();
                if (val.trim() === "") {
                    return e.style.display = "block";
                }
                if (title.toLowerCase().includes(val.toLowerCase())) {
                    e.style.display = "block";
                } else {
                    e.style.display = "none";
                }
            });
        },
        sendUsnJournalPathToSocket() {
            this.buttons.usnJournal = false;
            ws.emit("check usn journal", this.inputs.usnJournalPathInput);
        }
    },
    mounted() {
        ws.on("check usn journal", (e) => {
            this.screens.usnJournal = true;
            this.buttons.usnJournal = true;
            this.results.usnJournal = e;
        })
        ws.on("error", () => {
            this.buttons.usnJournal = true;
            if (this.socketRequest.name) this.buttons.regedit[this.socketRequest.name][this.socketRequest.req] = true;
            this.results.error = true;
        })
        ws.on("check regedit", e => {
            console.log(e);
            this.results.reg[this.socketRequest.req] = e;
            this.results.regedit[this.socketRequest.name][this.socketRequest.req] = e;
            this.screens.regedit[this.socketRequest.name][this.socketRequest.req] = true;
            this.buttons.regedit[this.socketRequest.name][this.socketRequest.req] = true;
            this.screens.reg[this.socketRequest.req] = true;
        });
        ws.on("usb change", (type, info) => {
            console.log(JSON.stringify(info, null ,4));
            this.results.usbChanged = {type, info};
            this.screens.usbChanged = true;
        });
        ws.on("check virtual machine", e => {
            this.results.vm = e;
            this.screens.vm = true;
            this.buttons.vm = true;
        });
        ws.on("check usb plugs", e => {
            this.results.usb = e;
            this.screens.usb = true;
            this.buttons.usb = true;
        });
        ws.on("research", e => {
            this.results.analyzePath = e;
            this.screens.analyzePath = true;
            this.buttons.analyzePath = true;
        });
        ws.on("check cmd", e => {
            this.results.cmdServices = e;
            this.screens.cmdServices = true;
            this.buttons.cmdServices = true;
        });
        ws.on("check dns", e => {
            this.results.dnsCheck = e;
            this.screens.dnsCheck = true;
            this.buttons.dnsCheck = true;
        });
        ws.on("list firewall", e => {
            this.results.firewall = e;
            this.screens.firewall = true;
            this.buttons.firewall = true;
        })
    }
});