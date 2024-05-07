const electron = require("electron");
const url = require("url");
const path = require("path");
const { protocol } = require("electron");

const {app, BrowserWindow} = electron;
let mainWindow;

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