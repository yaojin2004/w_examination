# Todo应用

一个简单的待办事项管理应用，使用原生JavaScript和Node.js构建。零依赖实现，无需安装任何外部包。

## 1. 功能特点

- 添加、删除、更新待办事项
- 标记待办事项为已完成/未完成
- 数据持久化存储
- RESTful API支持
- 响应式设计
- 零依赖，极简实现
- JSON数据自动格式化

## 2. 技术栈

- 前端：原生JavaScript (ES5)，无任何框架或库
- 后端：原生Node.js，无任何框架或中间件
- 存储：原生文件系统 (JSON)，自动格式化存储
- API：RESTful风格
- 样式：原生CSS，无任何预处理器

## 3. 项目结构

```
todo-app/
│
├── src/                  # 源代码目录
│   ├── server.js        # 服务器入口文件
│   ├── script.js        # 前端JavaScript
│   ├── style.css        # 样式文件
│   └── index.html       # 主页面
│
├── data/                # 数据目录
│   └── todos.json      # 待办事项数据
│
├── docs/                # 文档目录
│   ├── javascript-features.md  # JavaScript特性分析
│   ├── testing-guide.md        # 测试指南
│   └── optimization-guide.md   # 优化建议指南
│
├── README.md            # 项目说明文档
└── package.json         # 项目配置文件
```

## 4. 安装和运行

### 环境要求
- Node.js >= 12.0.0

### 运行步骤
1. 克隆项目
```bash
git clone [项目地址]
cd todo-app
```

2. 直接运行（零依赖，无需安装任何包）
```bash
npm start
```

3. 访问应用
打开浏览器访问 `http://localhost:3000`

### 可选命令
```bash
# API测试指南
npm run test:api

# 手动测试指南
npm run test:manual
```

## 5. API接口

### 5.1 获取所有待办事项
```
GET /todos
```

### 5.2 创建待办事项
```
POST /todos
Content-Type: application/json

{
    "text": "待办事项内容"
}
```

### 5.3 更新待办事项
```
PUT /todos/:id
Content-Type: application/json

{
    "completed": true
}
```

### 5.4 删除待办事项
```
DELETE /todos/:id
```

## 6. 测试

### 6.1 功能测试
按照 [测试指南](docs/testing-guide.md) 进行手动功能测试。

### 6.2 API测试
参考 [测试指南](docs/testing-guide.md) 中的API测试部分进行接口测试。

## 7. 文档说明

- [JavaScript特性分析](docs/javascript-features.md) - JavaScript语法特性和同步编程特性说明
- [测试指南](docs/testing-guide.md) - 完整的测试流程和API使用说明
- [优化建议指南](docs/optimization-guide.md) - 项目优化和改进建议

## 8. 开发指南

### 8.1 基础知识
1. JavaScript基础语法
2. DOM操作基础
3. 事件处理机制
4. Node.js原生API使用

### 8.2 开发工具
1. 代码编辑器（VS Code等）
2. Node.js环境（>= 12.0.0）
3. API测试工具（Postman/curl）
4. 浏览器开发者工具

### 8.3 项目特点
1. 零依赖实现，无需管理外部包
2. 使用原生API，适合学习基础
3. 代码简洁清晰易于理解
4. 适合初学者学习和参考
5. JSON数据自动格式化，提高可读性

## 9. 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建Pull Request

## 10. 问题反馈

如果你发现任何问题或有改进建议，请：
1. 提交Issue
2. 描述问题/建议
3. 提供复现步骤
4. 等待回应

## 11. 许可证

MIT License
