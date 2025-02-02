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
      // оброблємо особливий випадок з першим співробітником
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
newEmployeeList.addEmployeeByPosition("Nataliia", 1);
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
//-----------------------------------------------------------------
/*
{
*1*: "first value",
*2*: "second value",
*3*: "third value"
}
 */
class Collection {
  constructor() {
    this.collection = {}; // створили пустий об'єкт
    this.length = 0;
    this.index = 1; // для створення димамічного ключа при додаванні
  }

  add(value) {
    this.collection[`*${this.index}*`] = value; //динамічні свойства
    this.index++;
    this.length++;
  }

  print() {
    console.log(this.collection);
  }

  [Symbol.iterator]() {
    let index2 = 1;
    return {
      next: () => {
        const key = `*${index2}*`;
        const result = {
          value: [key, this.collection[key]],
          done: false,
        };
        if (index2 > this.length) {
          result.done = true;
        }
        index2++;
        return result;
      },
    };
    //yield this.collection['*1*'];
    // yield  this.collection['*2*'];
    // yield  this.collection['*3*'];
  }
}

const myCollection = new Collection();
myCollection.print();
myCollection.add("first value");
myCollection.print();
myCollection.add("second value");
myCollection.print();
myCollection.add("third value");
myCollection.print();

for (const [key, value] of myCollection) {
  //console.log("key:", key);
  console.log("key:", key, "value:", value);
}
myCollection.add("fourth value");
myCollection.print();
