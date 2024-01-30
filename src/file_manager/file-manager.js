import * as readline from "node:readline/promises";
import { homedir } from "node:os";
import MessagesService from "./services/massage/message.service.js";
import NavigationServise from "./services/navigation/navigation.service.js";
import FilesService from "./services/files/files.service.js";
import OSService from "./services/os/os.service.js";
import ZipService from "./services/zip/zip.service.js";
import HashService from "./services/hash/hash.servise.js";
import { cwd } from "node:process";

export default class fileManager {
  constructor() {
    this.startingWorkingDirectory = process.cwd()
    console.log(this.startingWorkingDirectory)
    this.userName = "User";
    process.chdir(homedir());
  }

  setWorkingDir(value) {
    if (this.root === this.worknigDir) {
      return this.worknigDir
    }
    return this.worknigDir = value;
  }

  async init() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    process.chdir(homedir());
    this.#getUserName();
    MessagesService.greetings(this.userName);
    MessagesService.workingDirectory();


    rl.on("close", () => {
      MessagesService.goodbye(this.userName);
      process.exit();
    });

    rl.on("line", async (input) => {
      const operation = this.#parceInput(input);
      await this.#callOperation(operation, rl);
      MessagesService.workingDirectory();
    });
  }

  async #callOperation(operation, rl) {
    if (!operation || !operation.command) {
      MessagesService.unknownOperation();
      return;
    }

    const isValidParams = (params, validLength) => {
      let isValid = false;

      if (!(params instanceof Array)) return false;

      isValid = params.length === validLength;
      if (!isValid) {
        MessagesService.unknownOperation();
      }
      return isValid;
    };

    const { command, params } = operation;
    switch (command) {
      case ".exit":
        if (isValidParams(params, 0)) {
          rl.close();
        }
      case "up":
        if (isValidParams(params, 0)) {
          NavigationServise.up();
        }
        break;

      case "cd":
        if (isValidParams(params, 1)) NavigationServise.cd(...params);
        break;

      case "ls":
        if (isValidParams(params, 0))
          await NavigationServise.ls(this.worknigDir);
        break;

      case "cat":
        if (isValidParams(params, 1)) await FilesService.cat(...params);
        break;

      case "add":
        if (isValidParams(params, 1)) FilesService.add(...params);
        break;

      case "rn":
        if (isValidParams(params, 2)) await FilesService.rn(...params);
        break;

      case "mv":
        if (isValidParams(params, 2)) FilesService.add(...params);
        break;

      case "rm":
        if (isValidParams(params, 1)) await FilesService.rm(...params);
        break;

      case "os":
        if (isValidParams(params, 1)) {
          switch (params[0]) {
            case "--EOL":
              OSService.oel();
              break;
            case "--cpus":
              OSService.cpus();
              break;
            case "--homedir":
              OSService.homedir();
              break;
            case "--username":
              OSService.username();
              break;
            case "--architecture":
              OSService.architecture();
              break;
            default:
              MessagesService.unknownOperation();
              break;
          }
        }
        break;

      case "hash":
        if (isValidParams(params, 1)) HashService.hush(...params);
        break;

      case "compress":
        if (isValidParams(params, 2)) ZipService.compress(...params);

      case "compress":
        if (isValidParams(params, 2)) ZipService.decompress(...params);

      default:
        MessagesService.unknownOperation();
        break;
    }
  }

  #parceInput(input) {
    const operation = {
      command: null,
      params: [],
    };
    let data = input.trim().replace(/\s+/g, " ").split(" ");

    if (data.length === 0) return null;

    if (data.length === 1) {
      operation.command = data[0];
      return operation;
    }

    if (data.length > 1) {
      operation.command = data[0];
      operation.params = data.slice(1);
      return operation;
    }
  }

  #getUserName() {
    let name;
    const args = process.argv.slice(2);
    args.forEach((arg) => {
      if (arg.startsWith("--username")) {
        name = arg.split("=")[1].trim();
        return;
      }
    });
    if (name) {
      this.userName = name;
    }
  }

}
