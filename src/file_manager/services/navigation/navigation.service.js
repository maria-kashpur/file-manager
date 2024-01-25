import path from "node:path";

export default class NavigationServise {
  // Перейти из текущего каталога выше (когда вы находитесь в корневой папке, эта операция не должна менять рабочий каталог)
  static up() {
    console.log("up is success");
  }

  //Перейти в выделенную папку из текущего каталога ( path_to_directoryможет быть относительным или абсолютным)
  static cd(pathToDirectory) {
    console.log(`cd is success, params: ${pathToDirectory}`);
  }

  // Вывести в консоль список всех файлов и папок в текущем каталоге.
  static ls() {
    console.log("ls is success");
  }
}
