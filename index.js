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

// //When a user starts the application then they are prompted to enter the **team manager**’s:
// //  * Name
// //  * Employee ID
// //  * Email address
// //  * Office number

const promptManager = async () => {
  return await inquirer.prompt([
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
};

const init = async () => {
  const teamMembers = [];

  // manager's info
  const managerInfo = await promptManager();
  const manager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber);
  teamMembers.push(manager);

  // loop to add more employees until user decides to finish
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
      const promptEngineer = async () => {
        return await inquirer.prompt([
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
      }
      
      const engineer = new Engineer(promptEngineer.name, promptEngineer.id, promptEngineer.email, promptEngineer.github);
    } else if (answer.menu === 'Add an intern') {
      const promptIntern = async () => {
        return await inquirer.prompt([
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
        ])
      }
    }

    // //When a user enters those requirements then the user is presented with a menu with the option to:
    // // Add an engineer
    // // Add an intern
    // // Finish building the team

    {
    },

    // When a user selects the engineer option then a user is prompted to enter the following and then the user is taken back to the menu:
    //   Engineer's Name
    //   ID
    //   Email
    //   GitHub username

  };
