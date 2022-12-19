var tasks = [];
var task_list = document.getElementById("list");
var new_text = document.getElementById("second_box");

function add_task(task){
    tasks.push(task);
    render();
    show_noti("task_added");
    return;
}

function delete_task(taskId){
    var brand = tasks.filter((task) => {
        return task.Id !== taskId;
    })
    tasks = brand;
    render();
    show_noti("task_deleted");
    return;
}

function marking(d){
    var sth = tasks.filter((task) => {
        return task.Id === d;
    })
    sth.Done = !sth.Done;
    show_noti("marking_success");
    return;
}

function show_noti(message){
    alert(message);
    return;
}

function render(){
    task_list.innerHTML = "";
    for (let i = 0; i < tasks.length; i++){
        handle_render(tasks[i]);
    }
}

function handle_render(task){
    console.log(task.tex);
    var lis = document.createElement("li");
    lis.innerHTML = `<input type = "checkbox" data-id = "${task.Id}" class = "custom_checkbox">
    <label for = "${task.Id}"> "${task.tex}" </label>
    <span class = "Delete" data-id = "${task.Id}"> Delet </span>`
    task_list.append(lis); 
}

function handle_add(e){
    var text = new_text.value;
    console.log("working");
    if (e.key === "Enter" && text != ""){
        new_text.value = "";
        var id = Date.now().toString();
        var task = {
            tex : text,
            Id : id,
            Done: false
        }
        add_task(task);
        show_noti("task_added");
        return;
    }
}

function handle_click(e){
    var ele = e.target;
    if (ele.className === "custom_checkbox"){
        var i = ele.dataset.id;
        marking(i);
        show_noti("toggle_success");
        return;
    }
    if (ele.className === "Delete"){
        var i = ele.dataset.id;
        delete_task(i);
        show_noti("task_deleted");
        return;
    }
}

document.addEventListener("click",handle_click);
new_text.addEventListener("keyup",handle_add);