import  {promises as fs, createReadStream } from "fs";
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
  static rn(pathToFile, new_filename) {
    console.log("rn is success");
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
