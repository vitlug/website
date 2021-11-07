import { _DIRS } from "../config/fs";
export function colorText(text, color) {
    const colors = {
        "command": "\x1b[1;35m",
        "hyperlink": "\x1b[1;34m",
        "user": "\x1b[1;33m",
        "prompt": "\x1b[1;32m",
    }
    return `${colors[color] || ""}${text}\x1b[0;38m`;
}


export function filesHere(term) {
    return _DIRS[term.cwd].filter((e) => e != 'README.md' || term.user == "root");
}
