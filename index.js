const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

class prompt {
  constructor() {
    this.teamMembers = [];
  }

  async getManager() {
    const managerInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the team manager's name.",
        validate: (answer) => {
          if (!answer || answer.length < 1) return console.log('Please provide an employee name.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter your team manager's ID.",
        validate: (value) => {
          const pass = value.match(/^[0-9]+$/);
          if (!pass) return console.log('Please enter a numeric ID for the manager.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your team manager's email?",
        validate: (value) => {
          const pass = value.match(/\S+@\S+\.\S+/);
          if (!pass) return console.log('Please enter a valid email address.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "What is your team manager's office number?"
      },
    ]);

    const manager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber);
    this.teamMembers.push(manager);
  };

  async getEngineer() {
    const engineerInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the engineer's name.",
        validate: (answer) => {
          if (!answer || answer.length < 1) return console.log('Please provide an employee name.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter your engineer's ID.",
        validate: (value) => {
          const pass = value.match(/^[0-9]+$/);
          if (!pass) return console.log('Please enter a numeric ID for the engineer.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your engineer's email?",
        validate: (value) => {
          const pass = value.match(/\S+@\S+\.\S+/);
          if (!pass) return console.log('Please enter a valid email address.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'github',
        message: "What is your engineer's GitHub username?"
      },
    ]);

    const engineer = new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github);
    this.teamMembers.push(engineer);
  }

  async getIntern() {
    const internInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the intern's name.",
        validate: (answer) => {
          if (!answer || answer.length < 1) return console.log('Please provide an employee name.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter your intern's ID.",
        validate: (value) => {
          const pass = value.match(/^[0-9]+$/);
          if (!pass) return console.log('Please enter a numeric ID for the intern.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What is your intern's email?",
        validate: (value) => {
          const pass = value.match(/\S+@\S+\.\S+/);
          if (!pass) return console.log('Please enter a valid email address.');
          return true;
        }
      },
      {
        type: 'input',
        name: 'school',
        message: "What school does the intern attend?"
      },
    ]);

    const intern = new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school)
    this.teamMembers.push(intern);
  }

  async init() {
    //manager's info
    await this.getManager();

    //  loop to add more employees until user decides to finish
    while (true) {
      const answer = await inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do next?',
        choices: [
          'Add an engineer',
          'Add an intern',
          'Finish building the team'
        ]
      });

      if (answer.menu === 'Add an engineer') {
        await this.getEngineer();
      } else if (answer.menu === 'Add an intern') {
        await this.getIntern();
      } else {
        break;
      };
    }

    // render HTML and write to file
    const html = render(this.teamMembers);
    if  (!fs.existsSync(OUTPUT_DIR)){
      fs.mkdirSync(OUTPUT_DIR);
      }
    fs.writeFile(outputPath, html, (err) => {
      if (err) {
        console.log('Error writing HTML file', err);
      }  else {
        console.log('Succesfully Team HTML file generated!');
    }
  });

  };
}

const teamPrompt = new prompt();
teamPrompt.init();