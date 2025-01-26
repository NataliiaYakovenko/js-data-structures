class EmployeesList {
  constructor() {
    this.head = null;
  }

  creatEmployee(name) {
    return { name: name, next: null };
  }

  addEmployee(name) {
    const newEmployee = this.creatEmployee(name);
    if (this.head === null) {
      this.head = newEmployee;
      return ;
    }
    let currentEmploee = this.head;
    while (currentEmploee.next !==null ) {
      currentEmploee = currentEmploee.next;
    }
    const lastEmploee = currentEmploee;
    lastEmploee.next = newEmployee;
  }

  printEmploeesList(){
   console.log(JSON.parse(JSON.stringify(this.head)));
  }

} 

const newEmployeeList = new EmployeesList();
newEmployeeList.printEmploeesList()
newEmployeeList.addEmployee("Roland");
newEmployeeList.printEmploeesList()
//{ name: 'Roland', next: null }
newEmployeeList.addEmployee("Nataliia");
newEmployeeList.printEmploeesList()
//{ name: 'Roland', next: {name: 'Nataliia', next: null} }
newEmployeeList.addEmployee("Bob");
newEmployeeList.printEmploeesList()
