export default class MessagesService {
  static greetings(username = "User") {
    return `Welcome to the File Manager, ${username}!`;
  }

  static goodbye(username = "User") {
    return `Thank you for using File Manager, ${username}, goodbye!`;
  }

  static workingDirectory(dir) {
    return `You are currently in ${dir}.`;
  }

  static unknownOperation() {
    return `Invalid input`;
  }

  static errorExecutionOfOperation() {
    return `Operation failed`;
  }
}
