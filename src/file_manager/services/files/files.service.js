import  {promises as fs, createReadStream, access } from "fs";
import path, { parse, isAbsolute, resolve } from "path";
import MessagesService from "../../services/massage/message.service.js";

export default class FilesService {
  // Прочитайте файл и распечатайте его содержимое в консоли (следует использовать поток Readable):
  static async cat(pathToFile) {
    const currentDirectory = process.cwd();
    const absolutPathToFile = isAbsolute(pathToFile)
      ? pathToFile
      : resolve(currentDirectory, pathToFile);
    try {
      const rl = createReadStream(absolutPathToFile);
      rl.pipe(process.stdout);
    } catch {
      MessagesService.errorExecutionOfOperation();
    }
  }

  static async add(newFileName) {
    const currentDirectory = process.cwd();
    const absolutPathToFile = path.join(currentDirectory, newFileName);
    try {
      await fs.writeFile(absolutPathToFile, "", { flag: "wx" });
    } catch {
      MessagesService.errorExecutionOfOperation();
    }
  }

  // Переименуйте файл (содержимое должно остаться неизменным):
   static async rn(pathToFile, newFileName) {
    const currentDirectory = process.cwd();
    const absolutPathToFile = isAbsolute(pathToFile)
          ? pathToFile
          : resolve(currentDirectory, pathToFile);
    const {dir, base} = path.parse(absolutPathToFile);
    const files = await fs.readdir(dir);
    const isValidNewName = !files.includes(newFileName);
    const isValidSource = files.includes(base);
    if (!isValidNewName || !isValidSource) {
      MessagesService.errorExecutionOfOperation();
      return;
    }
    try {
      await fs.rename(path.join(dir, base), path.join(dir, newFileName));
    } catch {
      MessagesService.errorExecutionOfOperation();
    }
  }

  // Скопировать файл (следует выполнять с использованием потоков с возможностью чтения и записи)
  static mv(pathToFile, pathToNewDir) {
    console.log("mv is success");
  }

  // Удалить файл
  static rm(pathToFile) {
    console.log("rm is success");
  }
}
