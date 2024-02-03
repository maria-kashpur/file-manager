export default class MessagesService {
  static greetings(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
  }

  static goodbye(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  }

  static workingDirectory() {
    console.log(`\nYou are currently in ${process.cwd()}\n`);
  }

  static unknownOperation() {
    console.log(`Invalid input.`);
  }

  static errorExecutionOfOperation() {
    console.log(`Operation failed.`);
  }
}
