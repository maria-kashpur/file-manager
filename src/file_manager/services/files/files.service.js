import fs from "fs";

import { parse } from "path";

export default class FilesService {
  // Прочитайте файл и распечатайте его содержимое в консоли (следует использовать поток Readable):
  static async cat(pathToFile) {
    console.log("cat is success");
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
