import { todoItemList } from "../script.js";
import { DELETE } from "./http.js";

// definisco una funzione per creare dinamicamente gli elementi html
export const createElement = (type, content, ...attrs) => {
  const element = document.createElement(type);
  element.textContent = content;

  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));

  return element;
};

export const qSA = (elements) => document.querySelectorAll(elements);

// creo un titolo per la pagina
export const titleEl = createElement("h1", "Todo List", {
  name: "class",
  value: "title",
});

// creo una input text element da cui inserire un nuovo TODO
export const inputTextEl = createElement(
  "input",
  "",
  { name: "type", value: "text" },
  { name: "placeholder", value: "Todo..." },
  { name: "class", value: "todo__input" }
);

// creo un button per scatenare la POST della nuova TODO
export const inputBtnEl = createElement(
  "input",
  "",
  { name: "type", value: "button" },
  { name: "value", value: "+" },
  { name: "class", value: "todo__add" }
);

export const rootEl = createElement("div", "", {
  name: "class",
  value: "root",
});

export const createTodoItem = ({ id, todo, completed }) => {
  const todoItem = createElement(
    "div",
    "",
    {
      name: "class",
      value: "todoItem",
    },
    {
      name: "id",
      value: id,
    }
  );

  const checkboxTodoItem = createElement(
    "input",
    "",
    {
      name: "type",
      value: "checkbox",
    },
    {
      name: "class",
      value: "checkboxTodo",
    },
    {
      name: "id",
      value: id,
    }
  );
  const textTodoItem = createElement("p", todo);

  const deleteBtnTodo = createElement(
    "button",
    "x",
    {
      name: "class",
      value: "deleteBtn",
    },
    {
      name: "id",
      value: id,
    }
  );

  todoItem.append(checkboxTodoItem, textTodoItem, deleteBtnTodo);

  if (completed) {
    todoItem.classList.add("todoItem__completed");
    checkboxTodoItem.checked = true;
  } else checkboxTodoItem.checked = false;

  return todoItem;
};

export const renderList = () => {
  rootEl.textContent = "";
  todoItemList.forEach((item) => rootEl.append(createTodoItem(item)));
  renderItems();
  deleteItems();
};

export const renderItems = () => {
  const checkboxEls = qSA(".checkboxTodo");
  checkboxEls.forEach((checkbox) =>
    checkbox.addEventListener("change", (evt) => {
      todoItemList.forEach((item) => {
        if (item.id === parseInt(evt.target.id)) {
          item.completed = !item.completed;
          checkbox.parentNode.classList.toggle("todoItem__completed");
          alert("eccolo");
          console.log(item, todoItemList.indexOf(item));
          if (item.completed) {
            todoItemList.push(
              todoItemList.splice(todoItemList.indexOf(item), 1)[0]
            );
            renderList();
          }

          // let a = todoItemList.find((b) => b.id === item.id);
          // a = {
          //   ...a,
          //   completed: true,
          // };
          // todoItemList.splice(index, 1);
          // todoItemList.push(a);

          // rootEl.textContent = "";

          // renderList();

          // renderItems();

          // deleteItems();
        }
      });
    })
  );
};

// implemento la chiamata DELETE
export const deleteItems = () => {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((button) =>
    button.addEventListener("click", (evt) => {
      if (confirm("Delete this item?")) {
        DELETE(`/${evt.target.id}`);

        todoItemList.forEach((item) => {
          if (item.id == evt.target.id) {
            const i = todoItemList.indexOf(item);
            todoItemList.splice(i, 1);
          }
        });
      }
    })
  );
};
