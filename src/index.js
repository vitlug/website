import './styles/main.css'
import 'xterm/css/xterm.css'

import { Terminal } from "xterm";

import { FitAddon } from "xterm-addon-fit";
import  {WebLinksAddon} from "xterm-addon-web-links";

import {extend} from "./app/terminal-ext"
import {runRootTerminal} from "./app/terminal"




const term = new Terminal({ cursorBlink: true });
const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();

term.open(document.getElementById('terminal'));
term.loadAddon(fitAddon);
term.loadAddon(webLinksAddon);

extend(term,fitAddon);
runRootTerminal(term);
