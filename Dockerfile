# 基于官方Nginx镜像
FROM nginx:latest

# 拷贝自定义配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /etc/nginx/html/

# 暴露80端口
EXPOSE 80

# 设置容器启动时执行的命令
CMD ["nginx", "-g", "daemon off;"]