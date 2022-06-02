let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tab div");
let taskList = [];
let filterList = [];
let mode="all";

addButton.addEventListener("click", addTask);

for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) { 
        filter(event)});
}

function addTask() {

    let task = {
        id:randomIDGenerate(),
        taskValue : taskInput.value,
        isComplete : false
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let list = [];
    if(mode == "all") {
        list = taskList;
    } else if(mode == "ongoing" || mode == "done") {
        list = filterList;
    } 

    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `     
        <div class="task">
        <span class="task-done">
            ${list[i].taskValue}
        </span>
        <div class="button-area">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
        </div>
    </div>`;
        } else {
            resultHTML += `
        <div class="task">
        <span class="task">
            ${list[i].taskValue}
        </span>
        <div class="button-area">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
        </div>
    </div>`;
        }
        
    }

    document.getElementById("task-board").innerHTML = resultHTML;

}

function toggleComplete(id) {
    
    for(i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for(i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];

    document.getElementById("underline").style.width = event.target.offsetWidth + "px";
    document.getElementById("underline").style.left = event.target.offsetLeft  + "px";
    document.getElementById("underline").style.top = event.target.offsetTop + (event.target.offsetHeight - 2) + "px";
    if(mode == "all") {
        render();
    } else if(mode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();

    }
    
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}
