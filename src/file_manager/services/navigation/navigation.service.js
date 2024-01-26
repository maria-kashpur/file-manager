import path from "node:path";
import { readdir } from "node:fs/promises";
import MessagesService from "../massage/message.service.js";

export default class NavigationServise {
  // Перейти из текущего каталога выше (когда вы находитесь в корневой папке, эта операция не должна менять рабочий каталог)
  // почитать внимательно доку, проверить все нюансы работы метода
  static up() {
    const currentDirectory = process.cwd();
    const parentDirectory = path.resolve(currentDirectory, "..");
    
    if (parentDirectory !== path.resolve(parentDirectory, "..")) {
      process.chdir(parentDirectory);
    } 
  }

  static cd(pathToDirectory) {
    const currentDirectory = process.cwd();
    const absolutPathToDirectory = path.isAbsolute(pathToDirectory) ? pathToDirectory : path.resolve(currentDirectory, pathToDirectory);
    try {
      process.chdir(absolutPathToDirectory);
    } catch {
      MessagesService.errorExecutionOfOperation()
    }
  }

  static async ls() {
    const currentDirectory = process.cwd();
    try {
      const filesAndFolders = await readdir(currentDirectory, {
        withFileTypes: true,
      });

      const list = filesAndFolders
        .map((item) => {
          const { name } = item;
          const type = item.isDirectory()
            ? "directory"
            : item.isFile()
            ? "file"
            : item.isSymbolicLinc()
            ? "symbolic link"
            : "unknown";
          return { name, type };
        })
        .sort(
          (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
        );

      console.table(list);
    } catch (error) {
      MessagesService.errorExecutionOfOperation();
    }
  }
}
