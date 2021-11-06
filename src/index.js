// import _ from 'lodash';
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
term.write('Hello from mxterm.js $ ')
extend(term,fitAddon);
runRootTerminal(term);
