import { team } from "./team";
export const _LOCAL_FILES = {
    "id_rsa": "Nice try!",
};

export const _REMOTE_FILES = {
    "README.md": "https://raw.githubusercontent.com/vitlug/website/main/README.md",
    "welcome.htm": "https://raw.githubusercontent.com/vitlug/website/main/welcome.htm",
};

export const _FILES = {
    ..._LOCAL_FILES,
    ..._REMOTE_FILES,
}

export const _DIRS = {
    "~": ["id_rsa", "welcome.htm", "README.md"],
    "bin": ["zsh"],
    "home": Object.keys(team).concat("guest", "root").sort(),
    "/": ["bin", "home"],
};

let _FULL_PATHS = {};
for (const [key, values] of Object.entries(_DIRS)) {
    for (const value of values) {
        switch (key) {
            case "~":
                _FULL_PATHS[value] = `${key}/${value}`;
                break;
            case "/":
                _FULL_PATHS[value] = `/${value}`;
                break;
            default:
                _FULL_PATHS[value] = `/${key}/${value}`;
        }
    }
}


export function preloadFiles() {
    for (let kv of Object.entries(_REMOTE_FILES)) {
        _loadFile(kv[0]);
    }

    for (let kv of Object.entries(_LOCAL_FILES)) {
        _insertFileToDOM(kv[0], kv[1]);
    }
}

function _loadFile(name) {
    fetch(_REMOTE_FILES[name])
        .then(response => response.text())
        .then((body) => _insertFileToDOM(name, body));
}

function _insertFileToDOM(name, txt) {
    const parentDiv = document.getElementById("files-all");
    let div = document.createElement("div");
    div.id = name;
    div.innerText = txt;
    parentDiv.appendChild(div);
}

export function getFileContents(filename) {
    console.log(filename);
    const div = document.getElementById(filename);
    return div.innerHTML
        .replaceAll("<br>", "\r\n")
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<");
}