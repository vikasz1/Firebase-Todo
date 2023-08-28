import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-vikasz1-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingItem = ref(database, "tasks");

onValue(shoppingItem, function (snapshot) {
  if (snapshot.exists()){

  let tasksArray = Object.entries(snapshot.val());
  clearShoppingList();
  
  for (let i = 0; i < tasksArray.length; i++) {
    let currentItem = tasksArray[i];
    let currentId = currentItem[0];
    let currentItemValue = currentItem[1];
    addItemToList(shoppingList, currentItem);
  }
  console.log(tasksArray);
}
else{
  clearShoppingList()
  addItemToList(shoppingItem,["item","No Items Left"])
}
});

// console.log(database);

const btn = document.getElementById("add-button");
const inputText = document.getElementById("input-field");
const shoppingList = document.getElementById("shopping-list");

function clearInputField(field) {
  field.value = "";
}

function addItemToList(list, item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newElement = document.createElement("li");
  newElement.textContent = itemValue;

  newElement.addEventListener("click", () => {
    let taskToDelete = ref(database, `tasks/${itemId}`);
    remove(taskToDelete);
    // console.log(itemId);
  });

  shoppingList.append(newElement);
}

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

btn.addEventListener("click", (e) => {
  let inputValue = inputText.value;
  console.log(inputValue);
  if (inputValue) {
    clearInputField(inputText);
    push(shoppingItem, inputValue);
  }
});
