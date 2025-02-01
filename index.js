class EmployeesList {
  constructor() {
    this.list = null;
  }

  creatEmployee(name) {
    return { name: name, next: null };
  }

  addEmployee(name) {
    const newEmployee = this.creatEmployee(name);
    if (this.list === null) {
      this.list = newEmployee;
      return;
    }
    let currentEmployee = this.list;
    while (currentEmployee.next !== null) {
      currentEmployee = currentEmployee.next;
    }
    const lastEmploee = currentEmployee;
    lastEmploee.next = newEmployee;
  }

  deleteEmployee(name) {
    if (this.list === null) {
      //Якщо наш лист пустий
      return; //метод зупиняється
    }

    if (this.list.name === name) {
      // оброблємо особливий випадок з пеершим співробітником
      this.list = this.list.next;
    }

    let currentEmployee = this.list;
    while (currentEmployee !== null && currentEmployee.next !== null) {
      if (currentEmployee.next.name === name) {
        currentEmployee.next = currentEmployee.next.next;
        return; //зупиняємо цикл, щоб зайвий раз не проходити цикл по наступним співробітникам
      }
      currentEmployee = currentEmployee.next;
    }
  }

  printEmploeesList() {
    const array = [];
    let currentEmployee = this.list;
    while (currentEmployee !== null) {
      array.push(currentEmployee.name);
      currentEmployee = currentEmployee.next;
    }
    console.log(array);
  }

  addEmployeeByPosition(name, position) {
    const newEmployee = this.creatEmployee(name);
    let currentEmployee = this.list;
    let currentEmployeePosition = 0;
    while (currentEmployee !== null) {
      currentEmployeePosition++;
      if (currentEmployeePosition === position) {
        newEmployee.next = currentEmployee.next;
        currentEmployee.next = newEmployee;
        return;
      }
      currentEmployee = currentEmployee.next;
    }
  }
  //{name: 'Roland', next: {name:'Bob',next:null}}
  //{name: 'Roland', next:{name: 'Nataliia',next:{name:'Bob',next:null}}}
}

const newEmployeeList = new EmployeesList();

newEmployeeList.printEmploeesList();
newEmployeeList.addEmployee("Roland");
newEmployeeList.printEmploeesList();
//{ name: 'Roland', next: null }
//['Roland']
newEmployeeList.addEmployee("Bob");
newEmployeeList.addEmployee("Smit");
newEmployeeList.printEmploeesList();
newEmployeeList.addEmployeeByPosition("Nataliia",1);
newEmployeeList.printEmploeesList();
//{ name: 'Roland', next: {name: 'Nataliia', next: null} }
//['Roland', 'Nataliia']
// newEmployeeList.addEmployee("Bob");
// newEmployeeList.printEmploeesList();
// newEmployeeList.addEmployee("Smit");
// newEmployeeList.printEmploeesList();
// //{name:'Roland', next:{name:'Nataliia',next:{name: 'Bob',next:null}}}
// newEmployeeList.deleteEmployee("Bob");
// //{ name: 'Roland', next: {name: 'Nataliia', next: null} }
// newEmployeeList.printEmploeesList();
// newEmployeeList.deleteEmployee("Roland");
// newEmployeeList.printEmploeesList();
// //{name: 'Nataliia', next: null}
// newEmployeeList.deleteEmployee("Nataliia");
// newEmployeeList.printEmploeesList();
//{ name: 'Roland', next: {name: 'Bob', next: null} }
