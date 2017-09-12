# react-ssr-starter
[![Build Status](https://travis-ci.org/honpery/react-ssr-starter.svg?branch=master)](https://travis-ci.org/honpery/react-ssr-starter)

----

> React服务器端渲染(ssr)脚手架。

## 起步
```bash
git clone https://www.github.com/honpery/react-ssr-starter.git [your project name]
cd [your project name] && yarn
```

## 目录结构
```
react-ssr-starter
    |- src                  # 源码目录
        |- components       # 公共组件
        |- pages            # 界面组件
        |- fetchs           # 后端请求封装
        |- config           # 项目配置
        |- app.tsx          # 顶级组件
        |- client.tsx       # 客户端入口
        |- server.tsx       # 服务器端入口
        |- index.ejs        # ssr渲染模板
        |- router.tsx       # 路由生成封装
    |- test                 # 测试目录
    |- webpack.config.ts    # webpack配置文件
    |- tslint.json          # tslint配置文件
    |- tsconfig.json        # typescript配置文件
    |- .travis.yml          # ci配置文件，请自行替换
```