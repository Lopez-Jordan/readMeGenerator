const inquirer = require('inquirer');
const fs = require('fs');

// ask for all the input
// generate the readme with the input

function collectInfo(){
    return inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: "What is the title of your project?"
        },
        {
          type: 'input',
          name: 'description',
          message: 'What is the description of your project?',
        },
        {
          type: 'input',
          name: 'installation',
          message: 'What are the installation instructions?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'What is the usage information?'
        },
        {
            type: 'list',
            name: 'license',
            message: "what license would you like to use?",
            choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'ISC', 'None'],
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'What are the contribution guidelines?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What are the test instructions?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
      ]);
}

function generateReadMe(answers) {
  let licenseBadge = '';
  if (answers.license !== 'None') {
    licenseBadge = `![License](https://img.shields.io/badge/license-${encodeURIComponent(answers.license)}-brightgreen)`;
  }

  return `
${licenseBadge}

# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This application is covered under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For questions about the project, you can reach me via:
- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: ${answers.email}
    `;
}

    
    

function init() {
    collectInfo()
      .then((answers) => {
        fs.writeFile('readme.md', generateReadMe(answers), (err) => {
          err ? console.log("error with readme gen") : console.log("success!");
        });
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }
  
init();










// -1: email address: -desc (throw in questions w/ a para talking about how to reach me)
// 0: github username -desc (throw in questions w/ a link to the github)
// 1: title of project -desc
// 2: Description -desc 
// 3: Table of Contents
// 4: Installation -desc 
// 5: Usage -desc
// 6: License -options for a badge (near top of readme) (add a notice hear of the license)
// 7: Contributing -desc
// 8: Tests -desc
// 9: Questions