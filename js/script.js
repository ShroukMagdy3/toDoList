var newTask =document.querySelector("#newTask")
var add= document.querySelector("#add")
var mainIndex=0;
var taskContainer= [];
var addMode = true


if(localStorage.getItem("tasks") != null){
    taskContainer = JSON.parse(localStorage.getItem("tasks"))
    console.log(taskContainer); 
    display();
}

add.addEventListener("click" , function(){
    addTo()
    display()
    clear()
})

// add
function addTo(){
    if(addMode){
        var task ={
            name:newTask.value 
        }
        taskContainer.push(task)
        localStorage.setItem("tasks" , JSON.stringify(taskContainer))
    }
    else{
        update(task)
        clear()
    }
}

function clear(){
    newTask.value=""
}


function display(){
    var cartoona=""
    for(var i = 0 ; i < taskContainer.length; i++){
        cartoona += `
        <tr class="fw-normal">
                                        <td>${i+1}</td>
                                        <td>
                                            <span>${taskContainer[i].name}</span>
                                        </td>
                                        <td>
                                            <a style="cursor: pointer;" class="update" onclick ="patch(${i})"><i
                                                    class="fas fa-pen-nib fa-lg text-warning me-3"></i></a>
                                        </td>
                                        <td>
                                            <a style="cursor: pointer;" onclick ="deleteTask(${i})" class="delete"><i
                                                    class="fas fa-trash-alt fa-lg text-danger"></i></a>
                                        </td>
                                    </tr>
        `
    }
    console.log(cartoona);
    
    document.querySelector("#allTasks").innerHTML = cartoona
}


// delete
function deleteTask(index){
    taskContainer.splice(index , 1)
    console.log(taskContainer);
    display()
    localStorage.setItem("tasks" , JSON.stringify(taskContainer))
}
// update
function patch(index){
    addMode=false
    mainIndex =index
    newTask.value = taskContainer[mainIndex].name;
    add.innerHTML="Update"
    add.classList.remove("btn", "btn-primary", "ms-2");
    add.classList.add( "btn" ,"btn-warning", "ms-2");
}

function update(task){
    taskContainer.splice(mainIndex ,1 , task)
    add.innerHTML="Add"
    add.classList.remove( "btn" ,"btn-warning", "ms-2");
    add.classList.add("btn", "btn-primary", "ms-2");
    addMode = true;
    
}
