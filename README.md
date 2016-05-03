# description
1. node web template is WEB structure.   
2. Express is web framework.   
3. Swig is view template engine.   

# Guid
1. need install nodejs.  (請先安裝 nodejs )
2. need install redis (do session share).   
redis windows ref https://github.com/MSOpenTech/redis/releases 

# Getting started
1. npm install   
2. gulp clean   
3. gulp dev   
4. gulp build   
5. node ./service/appCore/test.js  or npm start


# Folder
service/appCore 		//app server core code

service/config/** 		// runtime config of app server.

service/configTmp/** 	// environment template of app server.

service/controller      // controller layer of MVC

service/model 		    // model layer of MVC

service/views      		// view layer of MVC

service/webResource/**	// web resource (babel coffee react sass) 

web/dist                // build output



# gulp CLI
gulp					// default action.   
gulp info				// pring current environment info.   
gulp production			// change environment to production.   
gulp test				// change environment to test.   
gulp dev				// change environment to dev devlopers.   
gulp clean				// delete temp and dist floder.   
gulp babel				// compile babel to javascript and merge js model.   
gulp coffee				// compile coffeeScript to javascript and merge js model.   
gulp sass				// compile sass to css and merge css model and minfy.   
gulp build				// 


# module
redis : Redis client.
express-session  : server-side session storage, MemoryStore.
connect-redis : is a Redis session store backed by node_redis. (Persistence)
cookie-parser : express cookie manager module.





# redis
1. install & download   
windows : https://github.com/MSOpenTech/redis/releases   
linux : http://redis.io/download   

2. redis start
redis windows start : redis-server redis.windows.conf   
redis client :  redis-cli

3. find all keys
 KEYS *  

4. find data
GET [your key]

#nginx load balancer
1. set nginx.conf
```
#user  nobody;
worker_processes  4;


#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;
	
	#壓縮功能
    gzip  on;
	
	upstream app-server {
		#Use Least Connections strategy (最少連接數策略)
		least_conn;
		server 127.0.0.1:1337 weight=1;
		server 127.0.0.1:1338 weight=1;
		#weigth  權值越高被分配到的機率越大
		#server 127.0.0.1:8080 weight=1;
		#server 127.0.0.1:9080 weight=1;
	}
	
    server {
        listen       80;
        server_name  localhost;
		charset utf-8;
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

		# Browser and robot always look for these
		# Turn off logging for them
		#location = /favicon.ico { log_not_found off; access_log off; }
		#location = /robots.txt  { log_not_found off; access_log off; }

		# Handle static files so they are not proxied to NodeJS
		# You may want to also hand these requests to other upstream
		# servers, as you can define more than one!
		#location ~ ^/(images/|img/|javascript/|js/|css/|stylesheets/|flash/|media/|static/|robots.txt|humans.txt|favicon.ico) {
		#  root /var/www;
		#}
		#location ~ .*\.(htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css|eot|svg|ttf|woff)$    //可用靜態資源型態
        #{
        #     root public;   //這是指nginx底下有新增一個資料夾叫public
        #     expires      7d;
        #}
		
        location / {
            #root   html;
            #index  index.html index.htm;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;

			proxy_pass http://app-server/;
			proxy_redirect off;

			# Handle Web Socket connections
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "upgrade";
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```