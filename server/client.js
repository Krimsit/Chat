import chalk from 'chalk';
import io from 'socket.io-client';
import inquirer from 'inquirer';
import readline from 'readline';

const socket = io('http://localhost:3000');
let login = null

const handleStartup = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "login",
      message: chalk.cyan("Введите ник: "),
      prefix: ""
    },
  ]).then((option) => {
    if (!!option.login) {
      login = option.login
      socket.emit("join", { login: login });
    } else {
      console.log(`${chalk.red('[ERROR]')} Введите ваш ник!`)
      handleStartup()
    }
  })
}

const handleSendMessage = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "message",
      message: chalk.bold("> "),
      prefix: ""
    },
  ]).then((option) => {
    readline.moveCursor(process.stdout, 0, -1)
    readline.clearLine(process.stdout, 1)
    socket.emit("message", { login: login, message: option.message });
  })
}

const handlePrintInfo = (message) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(message);
  process.stdout.write("> ")
}

socket.on('connect', () => {
  handleStartup()

  socket.on('join', (data) => {
    handlePrintInfo(`${chalk.blue('[INFO]')} Пользователь с ником ${chalk.bold(data.login)} присоединился к чату`)
  });

  socket.on('message', (data) => {
    handlePrintInfo(`${chalk.bold.yellow(data.login)}: ${data.message}`)
  });

  socket.on("SUCCESS:JOIN", (data) => {
    console.log(`${chalk.green('[SUCCESS]')} Вы успешно присоединились к чату под ником ${data.login}`);
    handleSendMessage(login)
  })

  socket.on("SUCCESS:MESSAGE", (data) => {
    console.log(`${chalk.bold.yellow("Вы")}: ${data.message}`);
    handleSendMessage(login)
  })
});

