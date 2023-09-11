let ulContainer=document.getElementById("todolistContain");
let newtodo=null;
let buttonEL=document.getElementById("addbtn");
let saveBtnEl=document.getElementById("saveBtn");

function gettodoLIstfromLocalStrrage() {
    let stringfiedTodolist=localStorage.getItem("todolistinfo");
    let parsedValue=JSON.parse(stringfiedTodolist);
    if(parsedValue===null) {
        return [];
    }else {
        return parsedValue;
    }
}

let todolist=gettodoLIstfromLocalStrrage();
saveBtnEl.onclick=function() {
    localStorage.setItem("todolistinfo",JSON.stringify(todolist));
    
}

function onStatusChange(labelID,inputCheckboxID) {

    let labelEl=document.getElementById(labelID);
    let checkBoxEl=document.getElementById(inputCheckboxID);

    if(checkBoxEl.checked===true) {
        labelEl.classList.add("stylechange");
    }else {
        labelEl.classList.remove("stylechange");
    }

}


let countEl=todolist.length;

function onremoveListElementp(listitemID) {


    let listEL=document.getElementById(listitemID);
    

    ulContainer.removeChild(listEL);

}

function createAndAppendTodo(todo) {

    let listitemID="listITEM"+todo.uniqueID;

    let inputCheckboxID="inputCheckbox"+todo.uniqueID;

    let deleteItemID="deleteICon"+todo.uniqueID;

    let labelID="labelID"+todo.uniqueID;

    let listContainerEl=document.createElement("li");
    listContainerEl.id=listitemID;
    listContainerEl.classList.add("d-flex","flex-row","stylinglistEl");
    ulContainer.appendChild(listContainerEl);

    let inputEl=document.createElement("input");
    inputEl.id=inputCheckboxID;
    inputEl.classList.add("checkboxstyle");
    inputEl.type="checkbox";
    listContainerEl.appendChild(inputEl);

    inputEl.onclick=function() {
        onStatusChange(labelID,inputCheckboxID);
    }

    let labeldiv=document.createElement("div");
    listContainerEl.appendChild(labeldiv);

    let labelEl=document.createElement("label");
    labelEl.setAttribute("for",inputCheckboxID);
    labelEl.id=labelID;
    labelEl.classList.add("taskEL");
    labelEl.textContent=todo.text;
    labeldiv.appendChild(labelEl);

    let delContainerEL=document.createElement("div");
    listContainerEl.appendChild(delContainerEL);
    delContainerEL.classList.add("ml-auto");

    

    let deleteEL=document.createElement("i");
    deleteEL.classList.add("fa-solid","fa-trash-can");
    deleteEL.id=deleteItemID;
    deleteEL.classList.add("trashCan");
    delContainerEL.appendChild(deleteEL);

    deleteEL.onclick=function() {
        onremoveListElementp(listitemID);
    }
}

for(let todo of todolist) {
    createAndAppendTodo(todo);
}



function createNewTodo() {
    let inputElement=document.getElementById("inputEL");
    if (inputElement.value==="") {
        alert("!! Please Enter a Item !!");
        return;
    }
    countEl++;
    let newtodo={

        text: inputElement.value,
        uniqueID: countEl

    }
    todolist.push(newtodo);
    createAndAppendTodo(newtodo);
    
    inputElement.value="";

}
buttonEL.onclick=function() {
    createNewTodo(newtodo);
}
