import * as os from "os";
import convertMHzToGHz from "../../utils/convertMHzToGHz.js";

export default class OSService {
  static eol() {
    const eolValue = JSON.stringify(os.EOL);
    console.log(
      `The operating system-specific end-of-line marker: ${eolValue}`
    );
  }

  static cpus() {
    const cpusList = os.cpus().map((cpu) => ({
      model: cpu.model.trim(),
      "clock rate, GHz": convertMHzToGHz(cpu.speed),
    }));
    const amountCpus = cpusList.length;

    console.log("Host machine CPUs info:");
    console.table(cpusList);
    console.log(`Overall amount of CPUs: ${amountCpus}`);
  }

  static homedir() {
    console.log(`Home directory: ${os.homedir}`);
  }

  static username() {
    const userName = os.userInfo().username;
    console.log(`Current system user name: ${userName}`);
  }

  static architecture() {
    console.log(`CPU architecture: ${os.arch()}`);
  }
}
