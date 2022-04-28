// Ajout du DOM (Document Object Model)
const todoInput = document.querySelector(".todo-input"); // Récupérer les todos en local
const todoButton = document.querySelector(".todo-button"); // Récupérer les todos en local
const todoList = document.querySelector(".todo-list"); // Récupérer les todos en local
const filterOption = document.querySelector(".filter-todo"); // Charger les todos en local

// Ecoute des événements
document.addEventListener("DOMContentLoaded", getTodos); // Ecoute des événements
todoButton.addEventListener("click", addTodo); // Ecoute des événements pour le boutton
todoList.addEventListener("click", deleteTodo); // Ecoute des événements pour le filtre
filterOption.addEventListener("click", filterTodo); // Filtre les todos

// Fonctions

function addTodo(e) { // Ajouter un todo
  e.preventDefault(); // Empêcher le rechargement de la page
  const todoDiv = document.createElement("div"); // Créer un div
  todoDiv.classList.add("todo"); // Ajouter la class todo
  const newTodo = document.createElement("li"); // Créer un li
  newTodo.innerText = todoInput.value; // Ajouter le texte du todo
  saveLocalTodos(todoInput.value); // Sauvegarder le todo en local
  newTodo.classList.add("todo-item"); // Ajouter la class todo-item
  if (newTodo.innerText === "") { // Vérifier si le todo est vide
    alert("Merci d'entrer une TODO non-vide ):"); // Afficher un message d'erreur
  } else { // Sinon
    todoDiv.appendChild(newTodo); // Ajouter le todo dans le div
    todoInput.value = ""; // Réinitialiser le todo
    // Créer le boutton de suppression
    const completedButton = document.createElement("button"); // Créer le boutton 
    completedButton.innerHTML = `<i class="fas fa-check"></i>`; // Ajouter le boutton
    completedButton.classList.add("complete-btn"); // Ajouter la class complete-btn
    todoDiv.appendChild(completedButton); // Ajouter le boutton dans le div
    const trashButton = document.createElement("button"); // Créer le boutton poubelle
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`; // Ajouter le boutton poubelle
    trashButton.classList.add("trash-btn"); // Ajouter la class trash-btn
    todoDiv.appendChild(trashButton); // Ajouter le boutton dans le div
    todoList.appendChild(todoDiv); // Ajouter le div dans la liste
  }
}

function whitemode() {
  var element = document.body;
  element.classList.toggle("whitemode");
  alert("Mode blanc activé (Pas optimisé à 100%)");
   
}


function deleteTodo(e) { // Supprimer un todo
  const item = e.target; // Récupérer le todo

  if (item.classList[0] === "trash-btn") { // Vérifier si le boutton est la poubelle
    const todo = item.parentElement; // Récupérer le todo
    todo.classList.add("fall"); // Ajouter la class fall
    removeLocalTodos(todo); // Supprimer le todo en local
    todo.addEventListener("transitionend", e => { // Ecoute des événements
      todo.remove(); // Supprimer le todo
    });
  }
  if (item.classList[0] === "complete-btn") { // Vérifier si le boutton est le check
    const todo = item.parentElement; // Récupérer le todo
    todo.classList.toggle("completed"); // Ajouter la class completed
    console.log(todo); // Afficher le todo
  }
}

function filterTodo(e) { // Filtrer les todos
  const todos = todoList.childNodes; // Récupérer les todos
  todos.forEach(function(todo) { // Pour chaque todo
    switch (e.target.value) { // Vérifier le filtre
      case "all": // Tous les todos
        todo.style.display = "flex"; // Afficher le todo
        break; // Fin du switch
      case "completed": // Tous les todos terminés
        if (todo.classList.contains("completed")) { // Vérifier si le todo est terminé
          todo.style.display = "flex"; // Afficher le todo
        } else { // Sinon
          todo.style.display = "none"; // Cacher le todo
        } // Fin du switch
        break; // Fin du switch
      case "uncompleted": // Tous les todos non-terminés
        if (!todo.classList.contains("completed")) { // Vérifier si le todo n'est pas terminé
          todo.style.display = "flex"; // Afficher le todo
        } else { // Sinon
          todo.style.display = "none"; // Cacher le todo
        }
    }
  });
}

function tempAlert(){
  window.setTimeout('alert("Cache vidé correctement");windows.close();', 10);
  setTimeout(function(){
    window.location.reload();
  }, 10);

  localStorage.clear();
}


function saveLocalTodos(todo) { // Sauvegarder les todos en local
  let todos; // Créer un tableau
  if (localStorage.getItem("todos") === null) { // Vérifier si le todo est vide
    todos = []; // Créer un tableau
  } else { // Sinon
    todos = JSON.parse(localStorage.getItem("todos")); // Récupérer le todo en local
  } 
  todos.push(todo); // Ajouter le todo dans le tableau
  localStorage.setItem("todos", JSON.stringify(todos)); // Sauvegarder le todo en local
}
function removeLocalTodos(todo) { // Supprimer les todos en local
  let todos; // Créer un tableau
  if (localStorage.getItem("todos") === null) { // Vérifier si le todo est vide
    todos = []; // Créer un tableau
  } else { 
    todos = JSON.parse(localStorage.getItem("todos")); // Récupérer le todo en local
  }
  const todoIndex = todo.children[0].innerText; // Récupérer le todo
  todos.splice(todos.indexOf(todoIndex), 1); // Supprimer le todo
  localStorage.setItem("todos", JSON.stringify(todos)); // Sauvegarder le todo en local
}

function getTodos() { // Récupérer les todos en local
  let todos; // Créer un tableau
  if (localStorage.getItem("todos") === null) { // Vérifier si le todo est vide
    todos = []; // Créer un tableau
  } else { // Sinon
    todos = JSON.parse(localStorage.getItem("todos")); // Récupérer le todo en local
  }
  todos.forEach(function(todo) { // Pour chaque todo
    const todoDiv = document.createElement("div"); // Créer un div
    todoDiv.classList.add("todo"); // Ajouter la class todo
    const newTodo = document.createElement("li"); // Créer un li
    newTodo.innerText = todo; // Ajouter le todo
    newTodo.classList.add("todo-item"); // Ajouter la class todo-item
    todoDiv.appendChild(newTodo); // Ajouter le todo dans le div
    todoInput.value = ""; // Réinitialiser le todo
    const completedButton = document.createElement("button"); // Créer le boutton
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;  // Ajouter le boutton
    completedButton.classList.add("complete-btn"); // Ajouter la class complete-btn
    todoDiv.appendChild(completedButton); // Ajouter le boutton dans le div
    const trashButton = document.createElement("button"); // Créer le boutton poubelle
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`; // Ajouter le boutton poubelle
    trashButton.classList.add("trash-btn"); // Ajouter la class trash-btn
    todoDiv.appendChild(trashButton); // Ajouter le boutton dans le div
    todoList.appendChild(todoDiv);  // Ajouter le div dans la liste
  });
}
