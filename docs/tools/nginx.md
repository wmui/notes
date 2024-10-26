# Nginx

## 安装

```sh
# ubuntu
sudo apt-get update
sudo apt-get install -y vim wget curl git nginx lsof
service nginx start
```

## 配置HTTPS

1. 把证书复制到`/home/ubuntu/ssl`目录下
2. 在`/etc/nginx/conf.d/`目录下新建`essay.conf`文件
3. 完成域名解析后，执行`sudo nginx -s reload` 重启nginx

```sh title="essay.conf"
upstream www {
    server 127.0.0.1:3025;
}

server {
    listen 80;
    listen 443 ssl;
    server_name www.xxx.com;
    ssl_certificate /home/ubuntu/ssl/1_www.xxx.com_bundle.crt;
    ssl_certificate_key /home/ubuntu/ssl/2_www.xxx.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    if ($scheme = http) {
        rewrite ^(.*) https://$host$1 permanent;
    }
    location / {
        proxy_set_header Host  $http_host;
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-Nginx-proxy true;
        proxy_pass http://www;
        proxy_redirect off;
    }
}
```

**说明：** 同一个文件是可以有多个`upstream`和`server`的，如果不想单独创建文件，可以统一写到默认配置文件中。
