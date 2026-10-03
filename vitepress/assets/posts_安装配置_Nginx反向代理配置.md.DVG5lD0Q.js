import{_ as e,o as a,c as n,a2 as o}from"./chunks/framework.BZAK_utg.js";const m=JSON.parse('{"title":"Nginx反向代理配置","description":"","frontmatter":{"title":"Nginx反向代理配置","date":"2018-11-11","categories":["安装配置","应用软件"],"tags":["Linux"],"prevTitle":"Centos7.4下LAMP的安装","prevLink":"./Centos7.4下LAMP的安装.html","nextTitle":"树莓派配置","nextLink":"./树莓派配置.html"},"headers":[],"relativePath":"posts/安装配置/Nginx反向代理配置.md","filePath":"posts/安装配置/Nginx反向代理配置.md"}'),r={name:"posts/安装配置/Nginx反向代理配置.md"};function i(s,t,c,l,p,h){return a(),n("div",null,[...t[0]||(t[0]=[o(`<h1 id="nginx反向代理配置" tabindex="-1">Nginx反向代理配置 <a class="header-anchor" href="#nginx反向代理配置" aria-label="Permalink to &quot;Nginx反向代理配置&quot;">​</a></h1><p>以PC机上的Tomcat环境与树莓派上的LNMP环境整合过程为例, 演示Nginx反向代理简单配置过程</p><blockquote><p>整合PC机上的Tomcat环境与树莓派上的LNMP环境</p></blockquote><h2 id="一、启动tomcat服务与apache服务" tabindex="-1">一、启动Tomcat服务与Apache服务 <a class="header-anchor" href="#一、启动tomcat服务与apache服务" aria-label="Permalink to &quot;一、启动Tomcat服务与Apache服务&quot;">​</a></h2><ul><li>访问<a href="http://192.168.43.209:8080" target="_blank" rel="noreferrer">http://192.168.43.209:8080</a> ,测试PC机上的Tomcat环境</li><li>访问<a href="http://192.168.43.105:80" target="_blank" rel="noreferrer">http://192.168.43.105:80</a> ,测试树莓派上的LNMP环境</li></ul><h2 id="二、修改nginx-conf" tabindex="-1">二、修改nginx.conf <a class="header-anchor" href="#二、修改nginx-conf" aria-label="Permalink to &quot;二、修改nginx.conf&quot;">​</a></h2><p><code>sudo vim /etc/nginx/nginx.conf </code></p><pre><code>-----------------------------------------------------------
http    {
    upstream tomcat {  
        server 192.168.43.209:8080;  
    } 
    upstream ksweb {
        server 192.168.43.1:8888;
    }
    server {
        listen       80;
        server_name  tomcat;
        location / {
            proxy_pass http://tomcat;  
        }
    }
    server {
        listen       80;
        server_name  pi;
        location / {
            proxy_pass http://pi; 
            index index.php index.html index.htm;	
        }
    }
}
-----------------------------------------------------------
</code></pre><h2 id="三、修改本地hosts" tabindex="-1">三、修改本地hosts <a class="header-anchor" href="#三、修改本地hosts" aria-label="Permalink to &quot;三、修改本地hosts&quot;">​</a></h2><p><code>sudo vim /etc/hosts </code></p><pre><code>-----------------------------------------------------------
192.168.43.209	tomcat
192.168.43.105	pi
-----------------------------------------------------------
</code></pre><h2 id="四、测试" tabindex="-1">四、测试 <a class="header-anchor" href="#四、测试" aria-label="Permalink to &quot;四、测试&quot;">​</a></h2><p><code>sudo vim ~/Desktop/test.html</code></p><pre><code>-----------------------------------------------------------
&lt;a href =&quot;http://tomcat&quot;&gt;tomcat&lt;/a&gt;
&lt;a href =&quot;http://pi&quot;&gt;pi&lt;/a&gt;
-----------------------------------------------------------
</code></pre><p>运行test.html,点击&quot;tomcat&quot;与&quot;pi&quot;,将分别tomcat首页与LNMP首页</p><h2 id="五、总结" tabindex="-1">五、总结 <a class="header-anchor" href="#五、总结" aria-label="Permalink to &quot;五、总结&quot;">​</a></h2><p>关键字:反向代理、负载均衡、分布式</p><ol><li>反向代理的主要作用是负载均衡</li><li>PC机和树莓派可以看作是一个简单的分布式系统</li></ol>`,18)])])}const u=e(r,[["render",i]]);export{m as __pageData,u as default};
