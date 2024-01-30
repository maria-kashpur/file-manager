import fs, { createReadStream } from "fs";
import { parse, isAbsolute, resolve } from "path";
import MessagesService from "../../services/massage/message.service.js";

export default class FilesService {
  // Прочитайте файл и распечатайте его содержимое в консоли (следует использовать поток Readable):
  static async cat(pathToFile) {
    const currentDirectory = process.cwd();
    const absolutPathToFile = isAbsolute(pathToFile)
      ? pathToFile
      : resolve(currentDirectory, pathToFile);

    console.log(pathToFile);
    console.log(absolutPathToFile);

    try {
      const rl = createReadStream(absolutPathToFile);
      rl.pipe(process.stdout);
    } catch {
      MessagesService.errorExecutionOfOperation();
    }
  }

  // Создайте пустой файл в текущем рабочем каталоге
  static async add(newFileName) {
    console.log("add is success");
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
