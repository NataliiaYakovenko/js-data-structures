class LinkedList {
  constructor() {
    this.head = null; // Початок списку
  }

  // Вузол
  createNode(data) {
    return { data, next: null }; // Вузол містить дані та посилання на наступний елемент
  }

  // Додати елемент в кінець списку
  append(data) {
    //const newNode = this.createNode(data);
    const newNode = {data: 19,next: null}
    if (!this.head) {
      this.head = newNode;
    } else {
        //шукаємо останній елемент
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      //зв'язуємо новий елемент
      current.next = newNode; 
    }
  }

  // Видалити елемент зі списку
  deleteItem(data) {
    if (!this.head) return; // Список порожній
    if (this.head.data === data) {
      // Якщо видаляється перший елемент
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Додати елемент після певної позиції
  addNthElement(data, position) {
    const newNode = this.createNode(data);

    if (position === 0) {
      // Додати на початок
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let index = 0;

    //шукаємо в списку місце, де потрібно дадати новий вузел
    while (current && index < position) {
      current = current.next;
      index++;
    }
    //додаємо до списку новий елемент,зберігаємо ліву та праву частини списку
    if (current) {
      newNode.next = current.next;
      current.next = newNode;
    }
  }



  // Вивести список
  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }
}

// Приклад використання:
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
console.log("Початковий список:");
list.printList();

list.deleteItem(20);
console.log("Після видалення 20:");
list.printList();

list.addNthElement(25, 1);
console.log("Після додавання 25 після 1 позиції:");
list.printList();

