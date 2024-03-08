let taskobject=[
    // {
    //     text : "Learn HTML",
    //     uniqueno : 1,
    // },
    // {
    //     text : "Learn CSS",
    //     uniqueno : 2,
    // },
    // {
    //     text : "Learn JAVASCRIPT",
    //     uniqueno : 3,
    // }
];
let todocount=0;

let con=document.getElementById("con");
document.body.appendChild(con);

let mainh1=document.createElement("h1");
mainh1.textContent="Todos";
mainh1.style.textAlign="center";
con.appendChild(mainh1);

let subh1=document.createElement("h1");
subh1.textContent="Create Task";
con.appendChild(subh1);

let inputElement=document.createElement("input");
inputElement.id="inputElementid";
inputElement.setAttribute("type","text");
inputElement.setAttribute("placeholder","What needs to be done");
inputElement.classList.add("inputstyle");
con.appendChild(inputElement);

let butcon=document.createElement("div");
butcon.classList.add("d-flex","flex-column");
con.appendChild(butcon);

let but1=document.createElement("button");
but1.textContent="Add";
but1.classList.add("butstyle");
butcon.appendChild(but1);

let subh2=document.createElement("h1");
subh2.textContent="My Tasks";
con.appendChild(subh2);

let taskconmain = document.createElement("ul");
taskconmain.id = "taskconmain";
con.appendChild(taskconmain);

let savebut=document.createElement("button");
savebut.classList.add("btn","btn-primary")
savebut.textContent="Save";
savebut.id="Savebutton";
con.appendChild(savebut);



function getTodoList()
{
    let stringifiedtodo=localStorage.getItem("todoList");
    let parsedtodo=JSON.parse(stringifiedtodo);
    if(parsedtodo===null)
    {
        return [];
    }
    else 
    {
        return parsedtodo;
    }
}



taskobject=getTodoList();
todocount=taskobject.length;




savebut.onclick=function()
{
   localStorage.setItem("todoList",JSON.stringify(taskobject)); 
};



function addtodo()
{
    let userinput=document.getElementById("inputElementid");
    let inputis=userinput.value;
    if(inputis==="")
    {
        alert("enter valid text");
        return;
    }
    todocount=todocount+1;
    let newtodo={
        text : inputis ,
        uniqueno : todocount,
        isChecked : false
    };
    taskobject.push(newtodo);
    tasktodo(newtodo);
    userinput.value="";
}




but1.onclick=function()
{
    addtodo();
}


function todoStatus(checkboxId,labelId,todoId)
{
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex=taskobject.findIndex(function(eachItem)
    {
        let eachItemId="todo"+eachItem.uniqueno;
        if(eachItemId===todoId)
        {
            return true;
        }
        else 
        {
            return false;
        }
    });

    let object=taskobject[todoObjectIndex];
    if(object.isChecked===true)
    {
        object.isChecked=false;
    }
    else 
    {
        object.isChecked=true;
    }
}


function onDeleteTodo(todoId) 
{
    let todoElement = document.getElementById(todoId);
    taskconmain.removeChild(todoElement);
  
    let deleteElementIndex = taskobject.findIndex(function(eachTodo) {
      let eachTodoId = "todo" + eachTodo.uniqueno;
      if (eachTodoId === todoId) {
        return true;
      } else {
        return false;
      }
    });
  
    taskobject.splice(deleteElementIndex, 1);
}
  




function tasktodo(todo)
{


    let todoId = "todo" + todo.uniqueno;
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;


    
    let taskcon=document.createElement("li");
    taskcon.id=todoId;
    taskcon.classList.add("d-flex","flex-row","mb-3");
    taskconmain.appendChild(taskcon);



    let check=document.createElement("input");
    check.setAttribute("type","checkbox");
    check.id=checkboxId;
    check.checked=todo.isChecked;
    taskcon.appendChild(check);

    check.onclick=function()
    {
        todoStatus(checkboxId,labelId,todoId);
    }




    let labelcon=document.createElement("div");
    labelcon.classList.add("d-flex","flex-row","labelcon","justify-content-between");
    taskcon.appendChild(labelcon);




    let tasktext=document.createElement("label");
    tasktext.textContent=todo.text;
    tasktext.setAttribute("for",checkboxId);
    //tasktext.classList.add("labelcon");
    tasktext.id=labelId;
    if(todo.isChecked==true)
    {
        tasktext.classList.add("checked");
    }
    labelcon.appendChild(tasktext);





    let deletecon=document.createElement("div");
    deletecon.classList.add("deletestyle");
    labelcon.appendChild(deletecon);

    let deleteicon=document.createElement("i");
    deleteicon.classList.add("far","fa-trash-alt","delete-icon",);


    deleteicon.onclick=function()
    {
        onDeleteTodo(todoId);
    }

    deletecon.appendChild(deleteicon);

}
for(let todo of taskobject)
{
    tasktodo(todo);
}





