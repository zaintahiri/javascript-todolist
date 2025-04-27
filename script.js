let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let records = document.getElementById("records");
document.getElementById("btnAddTask").addEventListener("click", () => {
  let inputTask = document.getElementById("inputTask");
  const inputText = inputTask.value.trim();
  if (inputText == "") return;
  const record = { userid: Date.now(), task: inputText, completed: false };
  tasks.push(record);
  saveTasksLocalStorage();
  inputTask.value = "";
});
function showTask() {
  let parsedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (parsedTasks && parsedTasks.length > 0) {
    tasks = parsedTasks;

    records.innerHTML = ``;
    tasks.forEach((rec) => {
      //   records.innerHTML = `${records.innerHTML}<div class="record">
      //             <label>${rec.task}</label>
      //             <button class="delete">Delete</button>
      //           </div>`;
      const li = document.createElement("li");
      li.setAttribute("data-id", rec.userid);
      if (rec.completed) {
        console.log("Completed : " + rec.completed);
        li.classList.add("recordCompleted");
        li.innerHTML = `<span style='text-decoration: line-through;text-decoration-color: green;'>${rec.task}</span>
        <button class="delete">Delete</button>
        `;
      } else {
        li.classList.add("record");
        li.innerHTML = `<span>${rec.task}</span>
        <button class="delete">Delete</button>
        `;
      }

      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
        else {
          rec.completed = !rec.completed;
          saveTasksLocalStorage();
        }
      });
      li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation(); // prevent toggle from firing
        console.log("The highlighted id is " + rec.userid);
        tasks =
          tasks.filter((t) => t.userid.toString() !== rec.userid.toString()) ||
          [];
        saveTasksLocalStorage();
      });
      records.append(li);
    });
  } else {
    records.innerHTML = ``;
  }
}

function saveTasksLocalStorage() {
  console.log("saveTasksLocalStorage is called");
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTask();
}

showTask();
