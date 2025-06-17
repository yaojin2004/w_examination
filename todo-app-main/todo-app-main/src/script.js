var todoInput = document.getElementById('todoInput');
var todoList = document.getElementById('todoList');
var API_URL = 'http://localhost:3000';

// 获取和渲染待办事项
function fetchTodos() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/todos', false);
    xhr.send();

    if (xhr.status === 200) {
        var todos = JSON.parse(xhr.responseText);
        var html = '';
        
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i];
            html += '<li class="' + (todo.completed ? 'completed' : '') + '">' +
                '<span>' + todo.text + '</span>' +
                '<div class="todo-actions">' +
                    '<button class="toggle-btn" onclick="toggleTodo(\'' + todo.id + '\', ' + !todo.completed + ')">' +
                        (todo.completed ? '撤销' : '完成') +
                    '</button>' +
                    '<button class="delete-btn" onclick="deleteTodo(\'' + todo.id + '\')">删除</button>' +
                '</div>' +
            '</li>';
        }
        
        todoList.innerHTML = html;
    } else {
        todoList.innerHTML = '加载失败';
    }
}

// 添加待办事项
function addTodo() {
    var text = todoInput.value.trim();
    if (!text) return;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/todos', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ text: text }));

    if (xhr.status === 201) {
        todoInput.value = '';
        fetchTodos();
    }
}

// 切换待办事项状态
function toggleTodo(id, completed) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL + '/todos/' + id, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ completed: completed }));

    if (xhr.status === 200) {
        fetchTodos();
    }
}

// 删除待办事项
function deleteTodo(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/todos/' + id, false);
    xhr.send();

    if (xhr.status === 200) {
        fetchTodos();
    }
}

// 事件监听
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// 页面加载完成后获取待办事项
document.addEventListener('DOMContentLoaded', fetchTodos); 