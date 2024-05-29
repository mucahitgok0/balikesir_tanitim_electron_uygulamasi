//elektorn ve gerekli modülleri yükleme
const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow} = electron;
let mainWindow;
//uygulama hazır olduğunda final.html'i çalıştıracak kod
file://
app.on('ready', () =>{
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "final.html"),
            protocol: "file",
            slashes: true
        })
    )
})