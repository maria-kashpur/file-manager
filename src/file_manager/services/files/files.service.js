import { promises as fs, createReadStream, createWriteStream } from "fs";
import path, { parse, isAbsolute, resolve } from "path";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import {pipeline} from 'stream/promises'
export default class FilesService {
  static #getAbsolutPath(source) {
    const currentDirectory = process.cwd();
    return isAbsolute(source) ? source : resolve(currentDirectory, source);
  }

  static async #check(source, value) {
    try {
      const statSource = await fs.stat(source);
      if (value === "file") {
        return statSource.isFile();
      } else if (value === "dir") {
        return statSource.isDirectory();
      }
      return false;
    } catch {
      return false;
    }
  }

  static async cat(pathToFile) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);
    return new Promise((resolve, reject) => {
      const rs = createReadStream(absolutPathToFile);
      rs.pipe(process.stdout);
      rs.on("error", () => reject(new Error("reading error")));
      rs.on("end", resolve);
    });
  }

  static async add(newFileName) {
    const currentDirectory = process.cwd();
    const absolutPathToFile = path.resolve(currentDirectory, newFileName);
    await fs.writeFile(absolutPathToFile, "", { flag: "wx" });
  }

  static async rn(pathToFile, newFileName) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);

    const isFile = await this.#check(absolutPathToFile, "file");
    if (!isFile) throw new Error("incorrect file path specified");

    const { dir } = path.parse(absolutPathToFile);
    const newFilePath = resolve(dir, newFileName);

    const isValidNewName = !(await this.#check(newFilePath, "file"));
    if (!isValidNewName) throw new Error("such a file already exists");

    await fs.rename(absolutPathToFile, newFilePath);
  }

  static async cp(pathToFile, pathToNewDir) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);
    const absolutPathToNewDir = this.#getAbsolutPath(pathToNewDir);

    if (!(await this.#check(absolutPathToFile, "file")))
      throw new Error("incorrect file path specified");
    if (!(await this.#check(absolutPathToNewDir, "dir")))
      throw new Error("incorrect dir path specified");

    const fileName = parse(absolutPathToFile).base;
    const newFilePath = resolve(absolutPathToNewDir, fileName);

    return new Promise((resolve, reject) => {
      const rs = createReadStream(absolutPathToFile);
      const ws = createWriteStream(newFilePath, { flags: "wx" });
      rs.on("error", () => reject(new Error("reading error")));
      ws.on("error", () => reject(new Error("writing error")));
      ws.on("close", resolve);
      rs.pipe(ws);
    });
  }

  static async mv(pathToFile, pathToNewDir) {
    await this.cp(pathToFile, pathToNewDir).then(
      async () => await this.rm(pathToFile)
    );
  }

  static async rm(pathToFile) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);
    await fs.rm(absolutPathToFile);
  }

  static async hash(pathToFile) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);
    return new Promise((resolve, reject) => {
      const rs = createReadStream(absolutPathToFile);
      const hash = createHash("sha256");

      rs.on("data", (chunk) => {
        hash.update(chunk);
      });

      rs.on("end", () => {
        const resultHash = hash.digest("hex");
        console.log(resultHash);
        return resolve;
      });

      rs.on("error", () => reject(new Error("reading error")));
    });
  }

  static async zip(action, pathToFile, pathToDestination) {
    const absolutPathToFile = this.#getAbsolutPath(pathToFile);
    const absolutPathToDestination = this.#getAbsolutPath(pathToDestination);


    return new Promise(async (resolve, reject) => {
      const brotliStreem = (action === "decompress") ? createBrotliDecompress() : createBrotliCompress();
      const rs = createReadStream(absolutPathToFile);
      const ws = createWriteStream(absolutPathToDestination);
      brotliStreem.on("error", (e) => reject(new Error(`error brotliStreem: ${e.message}`)));
      rs.on("error", () => reject(new Error("error rs")));
      ws.on("error", () => reject(new Error('error ws')));
      ws.on("close", resolve);
      await pipeline(rs, brotliStreem, ws, (e) => {
        if (e) {
          reject(`Pipeline failed: ${e.message}`);
        }
      });
    })
  }
}
