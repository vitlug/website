
// import  { getFileContents } from "./fs"
import { team } from "./team";
// import { portfolio } from "./portfolio";
import { help } from "./help";
// import { colorText } from "../utils";

export const whoisRoot = "Root Ventures is a hard tech seed fund in San Francisco with $150M AUM. We are engineers leading the first venture rounds for technical founders solving hard problems. Our typical check size is $1-2M. We don't mind leading, co-leading, or following. We aim to be your best partner and the investor who best understands your product and your technology. With 2/3 of our fund in reserve, we also want to be your longest this.term partner, investing in every round, and bridging between rounds when we have to. Try %whois% and one of avidan, kane, chrissy, lee, emily, or laelah to learn more about our team.";

// export const commands = {

export class commands {
  constructor(termimal) {
    this.term = termimal
  }

  help() {
    const maxCmdLength = Math.max(...Object.keys(help).map(x => x.length));
    Object.entries(help).forEach(function (kv) {
      const cmd = kv[0];
      const desc = kv[1];
      if (this.term.cols >= 80) {
        const rightPad = maxCmdLength - cmd.length + 2;
        const sep = " ".repeat(rightPad);
        this.term.stylePrint(`${cmd}${sep}${desc}`);
      } else {
        if (cmd != 'help') { // skip second leading newline
          this.term.writeln("");
        }
        this.term.stylePrint(cmd);
        this.term.stylePrint(desc);
      }
    })
  }

  whois(args) {
    const name = args[0];
    const people = Object.keys(team);

    if (!name) {
      this.term.stylePrint("%whois%: Learn about the firm, or a partner - usage:\r\n");
      this.term.stylePrint("%whois% root");
      for (let p of people) {
      this.term.stylePrint(`%whois% ${p}`);
      }
    } else if (name == "root") {
      const description = whoisRoot;
      this.term.printArt("rootvc-square");
      this.term.stylePrint(description);
    } else if (Object.keys(team).includes(name)) {
      const person = team[name];
      this.term.printArt(name);
      this.term.stylePrint(`\r\n${person["name"]}, ${person["title"]} - ${name}@root.vc`);
      this.term.stylePrint(`${person["linkedin"]}\r\n`);
      this.term.stylePrint(person["description"]);
    } else {
      this.term.stylePrint(`User ${name || ''} not found. Try:\r\n`);
      this.term.stylePrint("%whois% root");
      for (let p of people) {
        this.term.stylePrint(`%whois% ${p}`);
      }
    }
  }

  // tldr (args) {
  //   const name = (args[0] || "");
  //   if (!name) {
  //     const companies = Object.keys(portfolio);
  //     this.term.stylePrint("%tldr%: Learn about a portfolio company - usage:\r\n");
  //     for (c of companies.sort()) {
  //       const data = portfolio[c];
  //       const tabs = c.length > 10 ? "\t" : "\t\t";
  //       const sep = this.term.cols >= 76 ? tabs : "\r\n";
  //       this.term.stylePrint(`%tldr% ${c}${sep}${data["url"]}`);
  //       if (this.term.cols < 76 && c != companies[companies.length - 1]) {
  //         this.term.writeln("");
  //       }
  //     }
  //   } else if (!portfolio[name]) {
  //     this.term.stylePrint(`Portfolio company ${name} not found. Should we talk to them? Email us: hello@root.vc`);
  //   } else {
  //     const company = portfolio[name];
  //     this.term.cols >= 60 ? this.term.printArt(name) : this.term.writeln("");
  //     this.term.stylePrint(company["name"]);
  //     this.term.stylePrint(company["url"]);
  //     if (company["memo"]) {
  //       this.term.stylePrint(`Investment Memo: ${company["memo"]}`);
  //     }
  //     this.term.stylePrint("");
  //     this.term.stylePrint(company["description"]);
  //     if (company["demo"]) {
  //       this.term.stylePrint(`Try it with command: %${name}%`);
  //     }
  //   }
  // },

  // git: function () {
  //   this.term.displayURL("https://github.com/rootvc/cli-website");
  // },

//   function test() {
//   this.term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
// }

// email: function () {
//   this.term.command("pine");
// },

// github: function () {
//   this.term.displayURL("https://github.com/rootvc");
// },

twitter() {
  this.term.displayURL("https://twitter.com/rootvc");
  this.term.displayURL("https://twitter.com/machinepix");
}

instagram() {
  this.term.displayURL("https://instagram.com/machinepix/");
}

insta() {
  this.term.command("instagram");
}

other() {
  this.term.stylePrint("Yeah, I didn't literally mean %other%. I mean try some Linux commands");
}

echo(args) {
  const message = args.join(" ");
  this.term.stylePrint(message);
}

say(args) {
  const message = args.join(" ");
  this.term.stylePrint(`(Robot voice): ${message}`);
}
}

  // pwd: function () {
  //   this.term.stylePrint("/" + this.term.cwd.replaceAll("~", `home/${this.term.user}`));
  // },

  // ls: function () {
  //   this.term.stylePrint(_filesHere().join("   "));
  // },

  // I am so, so sorry for this code.
  // cd: function (args) {
  //   let dir = args[0] || "~";
  //   if (dir != "/") {
  //     // strip trailing slash
  //     dir = dir.replace(/\/$/, "");
  //   }

  //   switch (dir) {
  //     case "~":
  //       this.term.cwd = "~";
  //       break;
  //     case "..":
  //       if (this.term.cwd == "~") {
  //         this.term.command("cd /home");
  //       } else if (["home", "bin"].includes(this.term.cwd)) {
  //         this.term.command("cd /");
  //       }
  //       break;
  //     case "../..":
  //     case "../../..":
  //     case "../../../..":
  //     case "/":
  //       this.term.cwd = "/";
  //       break;
  //     case "home":
  //       if (this.term.cwd == "/") {
  //         this.term.command("cd /home");
  //       } else {
  //         this.term.stylePrint(`You do not have permission to access this directory`);
  //       }
  //       break;
  //     case "/home":
  //       this.term.cwd = "home";
  //       break;
  //     case "guest":
  //     case "root":
  //       if (this.term.cwd == "home") {
  //         if (this.term.user == dir) {
  //           this.term.command("cd ~");
  //         } else {
  //           this.term.stylePrint(`You do not have permission to access this directory`);
  //         }
  //       } else {
  //         this.term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case "../home/avidan":
  //     case "../home/kane":
  //     case "../home/chrissy":
  //     case "../home/lee":
  //     case "../home/emily":
  //     case "../home/laelah":
  //       if (this.term.cwd == "~" || this.term.cwd == "bin") {
  //         this.term.command(`cd ${dir.split("/")[2]}`);
  //       } else {
  //         this.term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case "/home/avidan":
  //     case "/home/kane":
  //     case "/home/chrissy":
  //     case "/home/lee":
  //     case "/home/emily":
  //     case "/home/laelah":
  //     case "avidan":
  //     case "kane":
  //     case "chrissy":
  //     case "lee":
  //     case "emily":
  //     case "laelah":
  //       this.term.stylePrint(`You do not have permission to access this directory`);
  //       break;
  //     case "/bin":
  //       this.term.cwd = "bin";
  //       break;
  //     case "bin":
  //       if (this.term.cwd == "/") {
  //         this.term.cwd = "bin";
  //       } else {
  //         this.term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case ".":
  //       break;
  //     default:
  //       this.term.stylePrint(`No such directory: ${dir}`);
  //       break;
  //   }
  // },

  // zsh: function () {
  //   this.term.init(this.term.user);
  // },

  // cat: function (args) {
  //   const filename = args[0];

  //   if (_filesHere().includes(filename)) {
  //     this.term.writeln(getFileContents(filename));
  //   } else {
  //     this.term.stylePrint(`No such file: ${filename}`);
  //   }
  //   if (filename == "id_rsa") {
  //     this.term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
  //   }
  // },

  // grep: function (args) {
  //   const q = args[0];
  //   const filename = args[1];

  //   if (filename == "id_rsa") {
  //     this.term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
  //   }

  //   if (!q || !filename) {
  //     this.term.stylePrint("usage: %grep% [pattern] [filename]");
  //     return;
  //   }

  //   if (_filesHere().includes(filename)) {
  //     var file = getFileContents(filename);
  //     const matches = file.matchAll(q);
  //     for (match of matches) {
  //       file = file.replaceAll(match[0], colorText(match[0], "files"));
  //     }
  //     this.term.writeln(file);
  //   } else {
  //     this.term.stylePrint(`No such file or directory: ${filename}`);
  //   }
  // },

  // finger: function (args) {
  //   const user = args[0];

  //   switch (user) {
  //     case 'guest':
  //       this.term.stylePrint("Login: guest            Name: Guest");
  //       this.term.stylePrint("Directory: /home/guest  Shell: /bin/zsh");
  //       break;
  //     case 'root':
  //       this.term.stylePrint("Login: root             Name: That's Us!");
  //       this.term.stylePrint("Directory: /home/root   Shell: /bin/zsh");
  //       break;
  //     case 'avidan':
  //     case 'kane':
  //     case 'chrissy':
  //     case 'lee':
  //     case 'emily':
  //     case 'laelah':
  //       this.term.stylePrint(`Login: ${user}   Name: ${team[user]["name"]}`);
  //       this.term.stylePrint(`Directory: /home/${user}   Shell: /bin/zsh`);
  //       break;
  //     default:
  //       this.term.stylePrint(user ? `%finger%: ${user}: no such user` : "usage: %finger% [user]");
  //       break;
  //   }
  // },

  // groups: function (args) {
  //   const user = args[0];

  //   switch (user) {
  //     case 'guest':
  //       this.term.stylePrint("guest lps founders engineers investors");
  //       break;
  //     case 'root':
  //       this.term.stylePrint("wheel investors engineers hardtech firms");
  //       break;
  //     case 'avidan':
  //       this.term.stylePrint("wheel investors engineers managingpartner handypersons tinkers agtech foodtech foodies coffeesnobs");
  //       break;
  //     case 'kane':
  //       this.term.stylePrint("wheel investors engineers partners tinkers mcad motorcyclists gearheads machinepix sportshooters gamers");
  //       break;
  //     case 'chrissy':
  //       this.term.stylePrint("wheel investors engineers partners electrical manufacturing ecad wearables healthtech gearheads automotive sportshooters");
  //       break;
  //     case 'lee':
  //       this.term.stylePrint("wheel investors engineers partners software devtools data ai+ml gamers winesnobs");
  //       break;
  //     case 'emily':
  //       this.term.stylePrint("wheel investors engineers principals mechanical space automotive winesnobs");
  //       break;
  //     case 'laelah':
  //       this.term.stylePrint("wheel admin operations miracleworkers gamers");
  //       break;
  //     default:
  //       this.term.stylePrint(user ? `%groups%: ${user}: no such user` : "usage: %groups% [user]");
  //       break;
  //   }
  // },

  // gzip: function () {
  //   this.term.stylePrint("What are you going to do with a zip file on a fake this.terminal, seriously?");
  // },

  // free: function () {
  //   this.term.stylePrint("Honestly, our memory isn't what it used to be");
  // },

  // tail: function (args) {
  //   this.term.command(`cat ${args.join(" ")}`);
  // },

  // less: function (args) {
  //   this.term.command(`cat ${args.join(" ")}`);
  // },

  // head: function (args) {
  //   this.term.command(`cat ${args.join(" ")}`);
  // },

  // open: function (args) {
  //   if (args[0].split(".")[1] == "htm") {
  //     this.term.openURL(`./${args[0]}`, false);
  //   } else {
  //     this.term.command(`cat ${args.join(" ")}`);
  //   }
  // },

  // more: function (args) {
  //   this.term.command(`cat ${args.join(" ")}`);
  // },

  // emacs: function () {
  //   this.term.stylePrint("%emacs% not installed. try: %vi%");
  // },

  // vim: function () {
  //   this.term.stylePrint("%vim% not installed. try: %emacs%");
  // },

  // vi: function () {
  //   this.term.stylePrint("%vi% not installed. try: %emacs%");
  // },

  // pico: function () {
  //   this.term.stylePrint("%pico% not installed. try: %vi% or %emacs%");
  // },

  // nano: function () {
  //   this.term.stylePrint("%nano% not installed. try: %vi% or %emacs%");
  // },

  // pine: function () {
  //   this.term.openURL("mailto:hello@root.vc");
  // },

  // curl: function (args) {
  //   this.term.stylePrint(`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource ${args[0]}.`);
  // },

  // ftp: function (args) {
  //   this.term.command(`curl ${args.join(" ")}`);
  // },

  // ssh: function (args) {
  //   this.term.command(`curl ${args.join(" ")}`);
  // },

  // sftp: function (args) {
  //   this.term.command(`curl ${args.join(" ")}`);
  // },

  // scp: function (args) {
  //   this.term.stylePrint(`████████████ Request Blocked: The ███████████ Policy disallows reading the ██████ resource ${args[0]}.`);
  // },

  // rm: function () {
  //   this.term.stylePrint("I can't let you do that, Dave");
  // },

  // mkdir: function () {
  //   this.term.stylePrint("Come on, don't mess with our immaculate file system");
  // },

  // alias: function () {
  //   this.term.stylePrint("Just call me HAL");
  // },

  // df: function () {
  //   this.term.stylePrint("Nice try. Just get a Dropbox");
  // },

  // kill: function () {
  //   this.term.stylePrint("Easy, killer");
  // },

  // locate: function () {
  //   this.term.stylePrint("Root Ventures");
  //   this.term.stylePrint("2670 Harrison St");
  //   this.term.stylePrint("San Francisco, CA 94110");
  // },

  // history: function () {
  //   this.term.history.forEach((element, index) => {
  //     this.term.stylePrint(`${1000 + index}  ${element}`);
  //   })
  // },

  // find: function (args) {
  //   const file = args[0];
  //   if (Object.keys(_FILES).includes(file)) {
  //     this.term.stylePrint(_FULL_PATHS[file]);
  //   } else {
  //     this.term.stylePrint(`%find%: ${file}: No such file or directory`);
  //   }
  // },

  // fdisk: function () {
  //   this.term.command("rm");
  // },

  // chown: function () {
  //   this.term.stylePrint("You do not have permission to %chown%");
  // },

  // chmod: function () {
  //   this.term.stylePrint("You do not have permission to %chmod%");
  // },

  // mv: function (args) {
  //   const src = args[0];

  //   if (_filesHere().includes(src)) {
  //     this.term.stylePrint(`You do not have permission to move file ${src}`);
  //   } else {
  //     this.term.stylePrint(`%mv%: ${src}: No such file or directory`);
  //   }
  // },

  // cp: function (args) {
  //   const src = args[0];

  //   if (_filesHere().includes(src)) {
  //     this.term.stylePrint(`You do not have permission to copy file ${src}`);
  //   } else {
  //     this.term.stylePrint(`%cp%: ${src}: No such file or directory`);
  //   }
  // },

  // touch: function () {
  //   this.term.stylePrint("You can't %touch% this");
  // },

  // sudo: function (args) {
  //   if (this.term.user == "root") {
  //     this.term.command(args.join(" "));
  //   }
  //   else {
  //     this.term.stylePrint(`${colorText(this.term.user, "user")} is not in the sudoers file. This incident will be reported`);
  //   }
  // },

  // su: function (args) {
  //   user = args[0] || "root";

  //   if (user == "root" || user == "guest") {
  //     this.term.user = user;
  //     this.term.command("cd ~");
  //   } else {
  //     this.term.stylePrint("su: Sorry");
  //   }
  // },

  // quit: function () {
  //   this.term.command("exit");
  // },

  // stop: function () {
  //   this.term.command("exit");
  // },

  // whoami: function () {
  //   this.term.stylePrint(this.term.user);
  // },

  // passwd: function () {
  //   this.term.stylePrint("Wow. Maybe don't enter your password into a sketchy web-based this.term.command prompt?");
  // },

  // man: function (args) {
  //   this.term.command(`tldr ${args}`);
  // },

  // woman: function (args) {
  //   this.term.command(`tldr ${args}`);
  // },

  // ping: function () {
  //   this.term.stylePrint("pong");
  // },

  // ps: function () {
  //   this.term.stylePrint("PID TTY       TIME CMD");
  //   this.term.stylePrint("424 ttys00 0:00.33 %-zsh%");
  //   this.term.stylePrint("158 ttys01 0:09.70 %/bin/npm start%");
  //   this.term.stylePrint("767 ttys02 0:00.02 %/bin/sh%");
  //   this.term.stylePrint("337 ttys03 0:13.37 %/bin/cgminer -o pwn.d%");
  // },

  // uname: function (args) {
  //   switch (args[0]) {
  //     case "-a":
  //       this.term.stylePrint("RootPC rootpc 0.0.1 RootPC Kernel Version 0.0.1 root:xnu-31415.926.5~3/RELEASE_X86_64 x86_64");
  //       break;
  //     case "-mrs":
  //       this.term.stylePrint("RootPC 0.0.1 x86_64");
  //       break;
  //     default:
  //       this.term.stylePrint("RootPC");
  //   }
  // },

  // top: function () {
  //   this.term.command("ps");
  // },

  // exit: function () {
  //   this.term.command("open welcome.htm");
  // },

  // clear: function () {
  //   this.term.init();
  // },

  // zed: function () {
  //   this.term.stylePrint("Coming soon! ;)");
  // },

  // ge: function () {
  //   this.term.command("great_expectations");
  // },

  // great_expectations: function () {
  //   this.term.command("superconductive");
  // },

  // privacy: function () {
  //   this.term.command("privacy_dynamics");
  // },

  // ln: function () {
  //   this.term.command("alan");
  // },

  // anycloud: function () {
  //   this.term.stylePrint("https://docs.anycloudapp.com/documentation/tutorials/aws-node");
  // },

  // eval: function (args) {
  //   this.term.stylePrint("please instead build a webstore with macros. in the meantime, the result is: " + eval(args.join(" ")));
  // }


// // Add commands for company demos
// for (kv of Object.entries(portfolio)) {
//   const key = kv[0];
//   const val = kv[1];

//   if (val["demo"]) {
//     commands[key] = () => this.term.displayURL(val["demo"]);
//   }
// }

// function _filesHere() {
//   return _DIRS[this.term.cwd].filter((e) => e != 'README.md' || this.term.user == "root");
// }
