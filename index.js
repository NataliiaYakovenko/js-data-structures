class EmployeesList {
  constructor() {
    this.list = null; //зберігає посилання на перший елемент списку
  }
  // Кожен співробітник є object з двома властивостями:
  //його ім'я та посилання на наступного співробітника в списку
  createEmployee(name) {
    return { name: name, next: null }; //Спочатку це null, бо він не має наступного співробітника.
  }

  addEmployee(name) {
    const newEmployee = this.createEmployee(name);
    if (this.list === null) {
      this.list = newEmployee;
      return;
    }
    //Якщо список не порожній, то перебираємо всі елементи списку
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
      array.push(currentEmployee.name); //додає їхні імена до масиву array
      currentEmployee = currentEmployee.next;
    }
    console.log(array);
  }

  //додає співробітника на певну позицію в списку
  addEmployeeByPosition(name, position) {
    const newEmployee = this.createEmployee(name);
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
console.log(newEmployeeList);
//{ name: 'Roland', next: null }
//['Roland']
newEmployeeList.addEmployee("Bob");
newEmployeeList.addEmployee("Smit");
newEmployeeList.printEmploeesList();
console.log(newEmployeeList);
newEmployeeList.addEmployeeByPosition("Nataliia", 1);
newEmployeeList.printEmploeesList();
console.log(newEmployeeList);
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
console.log(
  "//---------------------------------------------------------------------------"
);
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
    this.length = 0; // де будуть зберігатися елементи
    this.index = 1; // для створення димамічного ключа при додаванні
  }

  add(value) {
    this.collection[`*${this.index}*`] = value; //динамічні властивості
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
console.log(
  "//---------------------------------------------------------------------------"
);

/*
()
{}
[]
<>

() - true
)( - false

{}[] - true
{[}] - false

<()> - true

)    - false

*/

const checkBrackets = (string) => {
  const object = {
    roundBracketStatus: 0,
    curlyBracketStatus: 0,
    squareBracketStatus: 0,
    moreLessBracketStatus: 0,
    currentOpenBracket: "",
  };

  for (let i = 0; i < string.length; i++) {
    let isValidRound = checkCurrentSymbol(
      object,
      "roundBracketStatus",
      string[i],
      "(",
      ")"
    );
    if (isValidRound === false) {
      return false;
    }

    let isValidCurly = checkCurrentSymbol(
      object,
      "curlyBracketStatus",
      string[i],
      "{",
      "}"
    );
    if (isValidCurly === false) {
      return false;
    }

   let isValidSquare = checkCurrentSymbol(
      object,
      "squareBracketStatus",
      string[i],
      "[",
      "]"
    );
    if (isValidSquare === false) {
      return false;
    }

   let isValidMoreLess = checkCurrentSymbol(
      object,
      "moreLessBracketStatus",
      string[i],
      "<",
      ">"
    );
    if (isValidMoreLess === false) {
      return false;
    }
  }

  return (
    object.roundBracketStatus === 0 &&
    object.curlyBracketStatus === 0 &&
    object.squareBracketStatus === 0 &&
    object.moreLessBracketStatus === 0
  );
};

const checkCurrentSymbol = (object, prop, item, openSymbol, closeSymbol) => {
  if (item === openSymbol) {
    object[prop]++;
    object.currentOpenBracket = openSymbol;
  } else if (item === closeSymbol) {
    if (
      object.currentOpenBracket !== openSymbol &&
      object.currentOpenBracket !== ""
    ) {
      return false;
    }
    object.currentOpenBracket = "";
    object[prop]--;
  }
  if (object[prop] === -1) {
    return false;
  }
  return true;
};

console.log(
  checkBrackets("Roland (Jan)"),
  "true",
  checkBrackets("Roland (Jan))"),
  "false",
  checkBrackets("Roland ((Jan))"),
  "true",
  checkBrackets("Roland )Jan("),
  "false",
  checkBrackets("Roland (Jan()"),
  "false",
  checkBrackets("Roland (Jan())"),
  "true"
);
console.log(
  checkBrackets("Roland {Jan}"),
  "true",
  checkBrackets("Roland {Jan}}"),
  "false",
  checkBrackets("Roland {{Jan}}"),
  "true",
  checkBrackets("Roland }Jan{"),
  "false",
  checkBrackets("Roland {Jan{}"),
  "false",
  checkBrackets("Roland {Jan{}}"),
  "true"
);
console.log(
  checkBrackets("Roland ({Jan})"),
  "true",
  checkBrackets("Roland (}Jan{)"),
  "false",
  checkBrackets("Roland {(Jan})"),
  "false",
  checkBrackets("Roland ({(Jan())})"),
  "true",
  checkBrackets("Roland Jan(){}(){}"),
  "true",
  checkBrackets("{(Roland) (Jan)}"),
  "true",
  checkBrackets("{(){}"),
  "false"
);
console.log(
  checkBrackets("Roland [Jan]"),
  "true",
  checkBrackets("Roland (]Jan[)"),
  "false",
  checkBrackets("({[]})"),
  "true",
  checkBrackets("({[}])"),
  "false"
);

console.log(
  checkBrackets("Roland <Jan>"),
  "true",
  checkBrackets("Roland (>Jan<)"),
  "false",
   checkBrackets("({<}>)"),
  "false",
   checkBrackets("(){}[]<>"),
   "true"
);
