import {
  createTodoItem,
  inputBtnEl,
  inputTextEl,
  rootEl,
  titleEl,
  deleteItems,
  renderItems,
  renderList,
} from "./utils/fn.js";
import { GET, POST } from "./utils/http.js";

// creo un array di oggetti dove salvare gli elementi che trovo con la GET da poter manipolare con DELETE e POST fake
export let todoItemList = [];

let inputValueText = "";

document.body.append(titleEl, inputTextEl, inputBtnEl, rootEl);

// faccio la chiamata GET per popolare la lista
GET()
  .then(({ todos }) =>
    todos.forEach((todo) => {
      todoItemList.push(todo);
      rootEl.append(createTodoItem(todo));
    })
  )
  .then(() => renderItems())
  .then(() => deleteItems());

// try/catch su GET
// fetch("https://dummyjson.com/todoss").then((res) => {
//   try {
//     if (res.ok) {
//       return res.json();
//     } else {
//       throw new Error("Endpoint errato");
//     }
//   } catch (err) {
//     console.log(err);
//     return {
//       todos: [
//         {
//           todo: "Lista non disponibile",
//         },
//       ],
//     };
//   } finally {
//     // qui va il finally
//   }
// });

// mi salvo il valore di input text
inputTextEl.addEventListener("change", (evt) => {
  inputValueText = evt.target.value;
});

inputBtnEl.addEventListener("click", () => {
  if (inputValueText != "") {
    // svuoto il text input
    inputTextEl.value = "";

    // faccio partire la POST per verificare che funzioni
    POST("/add", {
      todo: inputValueText,
      completed: false,
      userId: Math.floor(Math.random() * 100),
    });
    // dato che la POST viene solo simulata uso l'array di appoggio per listare effettivamente il nuovo item
    todoItemList.unshift({
      id: todoItemList.length + 1,
      todo: inputValueText,
      completed: false,
      userId: Math.floor(Math.random() * 100),
    });

    // cancello tutto per non duplicare gli elementi
    rootEl.textContent = "";
    // svuoto il valore della variabile inputValueText
    inputValueText = "";
    // render della nuova lista a partire dall'array di appoggio
    renderList();

    renderItems();

    deleteItems();
  }
});
