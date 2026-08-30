# 插件开发指南

本指南说明如何在此自定义插件市场中创建和添加新插件。

## 创建新插件的步骤

### 1. 创建插件目录结构

在 `plugins/` 目录下创建一个以插件名称命名的子目录：

```bash
plugins/your-plugin-name/
├── .codex-plugin/
│   └── plugin.json       # 必需的插件配置文件
├── skills/               # 可选：技能文件目录
├── scripts/              # 可选：脚本文件目录
├── assets/               # 可选：资源文件目录
└── hooks/                # 可选：钩子文件目录
```

### 2. 编写 plugin.json

在 `.codex-plugin/plugin.json` 文件中定义插件的元数据：

```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "Your plugin description",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "skills": "./skills/",
  "interface": {
    "displayName": "Your Plugin Display Name",
    "shortDescription": "Short description for subtitle",
    "longDescription": "Longer description for details page",
    "developerName": "Your Name",
    "category": "Productivity",
    "capabilities": [],
    "defaultPrompt": "Help me use your plugin.",
    "brandColor": "#3B82F6"
  }
}
```

### 3. 将插件添加到市场

更新 `.agents/plugins/marketplace.json` 文件，将新插件添加到 `plugins` 数组中：

```json
{
  "name": "custom-codex-plugins",
  "interface": {
    "displayName": "Custom Codex Plugins"
  },
  "plugins": [
    {
      "name": "your-plugin-name",
      "source": {
        "source": "local",
        "path": "./plugins/your-plugin-name"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

### 4. 重新加载插件市场

在 Codex 中重新加载插件市场：

```bash
codex plugin add your-plugin-name@custom-codex-plugins
```

## 插件字段说明

### 必需字段

- `name`: 插件标识符（小写，短横线分隔）
- `version`: 语义化版本号
- `description`: 插件简短描述
- `author.name`: 作者或团队名称
- `interface.displayName`: 用户界面中显示的插件名称
- `interface.category`: 插件分类

### 可选字段

- `skills`: 技能文件路径
- `hooks`: 钩子配置路径
- `mcpServers`: MCP 服务器配置
- `apps`: 应用配置路径
- `repository`: 源代码仓库 URL
- `license`: 许可证标识符
- `keywords`: 搜索/发现标签

## 插件分类

常见的插件分类包括：

- `Productivity`: 生产力工具
- `Development`: 开发工具
- `Data`: 数据处理
- `Communication`: 沟通工具
- `Media`: 媒体处理
- `Utilities`: 实用工具

## 插件策略

在 marketplace.json 中，每个插件都有一个 `policy` 字段：

- `installation`: 安装策略
  - `NOT_AVAILABLE`: 不可安装
  - `AVAILABLE`: 可供安装（默认）
  - `INSTALLED_BY_DEFAULT`: 默认安装
- `authentication`: 认证策略
  - `ON_INSTALL`: 安装时认证（默认）
  - `ON_USE`: 使用时认证

## 资源文件

如需为插件添加图标、标志等资源，可以在 `assets/` 目录中放置：

- `icon.png`: 插件图标
- `logo.png`: 插件标志
- `screenshot1.png`: 截图1
- `screenshot2.png`: 截图2

然后在 `plugin.json` 中引用：

```json
{
  "interface": {
    "composerIcon": "./assets/icon.png",
    "logo": "./assets/logo.png",
    "screenshots": [
      "./assets/screenshot1.png",
      "./assets/screenshot2.png"
    ]
  }
}
```

## 参考资源

- [OpenAI 插件开发文档](https://developers.openai.com/plugins/build/plugins)
- [plugin-creator 技能](C:\Users\Tony\.codex\skills\.system\plugin-creator\SKILL.md)
- [插件 JSON 规范](C:\Users\Tony\.codex\skills\.system\plugin-creator\references\plugin-json-spec.md)
