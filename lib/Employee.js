// TODO: Write code to define and export the Employee class

class Employee {
  // properties
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  // methods
  getName() {
    if (this.name === null) {
      return "No Name Provided";
    } else {
      return `${this.name}`;
    }
  }

  getId() {
    if (this.id === null) {
      return "No ID Provided";
    } else {
      return this.id;
    }
  }

  getEmail() {
    if (this.email === null) {
      return "No Email Provided"
    } else {
      return `${this.email}`;
    }
  }

  getRole(role = 'Employee') {
    return `${role}`;
  }

}

module.exports = Employee;