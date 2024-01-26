import path from "node:path";
import { readdir } from "node:fs/promises";
import MessagesService from "../massage/message.service.js";

export default class NavigationServise {
  // Перейти из текущего каталога выше (когда вы находитесь в корневой папке, эта операция не должна менять рабочий каталог)
  static up() {
    console.log("up is success");
  }

  //Перейти в выделенную папку из текущего каталога ( path_to_directoryможет быть относительным или абсолютным)
  static cd(pathToDirectory) {
    console.log(`cd is success, params: ${pathToDirectory}`);
  }

  static async ls(currentDirectory) {
    //  const currentDirectory = process.cwd();
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
