# react-ssr-starter  [![Build Status](https://travis-ci.org/startlines/react-ssr-starter.svg?branch=master)](https://travis-ci.org/startlines/react-ssr-starter)

> React服务器端渲染(ssr)脚手架。

## 起步
```bash
git clone https://www.github.com/honpery/react-ssr-starter.git [your project name]
cd [your project name] && yarn
```

## 技术选型
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Webpack](https://webpack.js.org/)
- [x] [React](https://reactjs.org/)
- [x] [koa](http://koajs.com/)
- [x] [fe-sdk-starter](https://github.com/startlines/fe-sdk-starter)

## 目录结构
```
react-ssr-starter
    |- src                  # 源码目录
        |- components       # 公共组件
        |- pages            # 界面组件
        |- config           # 项目配置
        |- helper           # 助手方法
        |- middlewares      # 后端中间件
        |- router.tsx       # 路由生成封装
        |- client.tsx       # 客户端入口
        |- server.tsx       # 服务器端入口
    |- test                 # 测试目录
    |- webpack.config.ts    # webpack配置文件
    |- tslint.json          # tslint配置文件
    |- tsconfig.json        # typescript配置文件
    |- .travis.yml          # ci配置文件，请自行替换
```

## 脚本
- `dev`: 启动开发环境
- `bundle`: 生产环境打包
- `deploy`: 启动生产环境  
- `test`: 测试
- `ncu`: 升级最新依赖