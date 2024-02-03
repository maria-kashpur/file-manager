import path from "node:path";
import { readdir, access } from "node:fs/promises";
import fs from "fs";

export default class NavigationServise {
  static async up() {
    try {
      const currentDirectory = process.cwd();
      const parentDirectory = path.resolve(currentDirectory, "..");

      if (currentDirectory !== parentDirectory) {
        await access(parentDirectory, fs.constants.F_OK);
        process.chdir(parentDirectory);
      }
    } catch (e) {
      throw new Error("error when setting up the working directory");
    }
  }

  static cd(pathToDirectory) {
    try {
      const currentDirectory = process.cwd();
      const absolutPathToDirectory = path.isAbsolute(pathToDirectory)
        ? pathToDirectory
        : path.resolve(currentDirectory, pathToDirectory);
      process.chdir(absolutPathToDirectory);
    } catch {
      throw new Error("incorrect dir path specified");
    }
  }

  static async ls() {
    try {
      const currentDirectory = process.cwd();
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
            : item.isSymbolicLink()
            ? "symbolic link"
            : "unknown";
          return { name, type };
        })
        .sort(
          (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
        );

      console.table(list);
    } catch {
      throw new Error(
        "error printing in console list of all files and folders in current directory"
      );
    }
  }
}
