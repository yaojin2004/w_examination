var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3000;
var DB_PATH = path.join(__dirname, '../data/todos.json');

// 读取todos数据
function readTodos() {
    if (!fs.existsSync(DB_PATH)) {
        return [];
    }
    var data = fs.readFileSync(DB_PATH, 'utf8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

// 写入todos数据
function writeTodos(todos) {
    fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2), 'utf8');
}

// 解析请求体
function parseBody(req, callback) {
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        if (!body) {
            callback({});
            return;
        }
        callback(JSON.parse(body));
    });
}

// 处理静态文件
function serveStaticFile(url, res) {
    var filePath = path.join(__dirname, url === '/' ? 'index.html' : url);
    var extname = path.extname(filePath);
    var contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    }[extname] || 'text/plain';

    if (!fs.existsSync(filePath)) {
        res.writeHead(404).end();
        return;
    }

    var content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
}

// 创建 HTTP 服务器
var server = http.createServer(function(req, res) {
    // 处理静态文件请求
    if (req.method === 'GET' && (req.url === '/' || req.url.match(/\.(html|css|js)$/))) {
        serveStaticFile(req.url, res);
        return;
    }

    // GET /todos - 获取所有待办事项
    if (req.method === 'GET' && req.url === '/todos') {
        var todos = readTodos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
        return;
    }
    
    // POST /todos - 创建待办事项
    if (req.method === 'POST' && req.url === '/todos') {
        parseBody(req, function(body) {
            var todos = readTodos();
            var newTodo = {
                id: String(Date.now()),
                text: body.text,
                completed: false
            };
            todos.push(newTodo);
            writeTodos(todos);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTodo));
        });
        return;
    }
    
    // PUT /todos/:id - 更新待办事项
    if (req.method === 'PUT' && req.url.startsWith('/todos/')) {
        parseBody(req, function(body) {
            var id = req.url.split('/')[2];
            var todos = readTodos();
            var todoIndex = -1;
            
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todoIndex = i;
                    break;
                }
            }
            
            if (todoIndex === -1) {
                res.writeHead(404).end();
                return;
            }

            todos[todoIndex].completed = body.completed;
            writeTodos(todos);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
        });
        return;
    }
    
    // DELETE /todos/:id - 删除待办事项
    if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
        var id = req.url.split('/')[2];
        var todos = readTodos();
        var newTodos = [];
        var found = false;
        
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id !== id) {
                newTodos.push(todos[i]);
            } else {
                found = true;
            }
        }
        
        if (!found) {
            res.writeHead(404).end();
            return;
        }

        writeTodos(newTodos);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
        return;
    }
    
    // 404 - 未找到路由
    res.writeHead(404).end();
});

server.listen(PORT, function() {
    console.log('服务器运行在 http://localhost:' + PORT);
}); 