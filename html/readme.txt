For HTML5 mode enabling:

1. Create .htaccess file at root directory where your index.html is located
2. Edit file /etc/apache2/apache2.conf, set "allowOverride All" for /www/html
3. add base url in index.html --> 
      <head lang="en">
         <base href="/">....
4. Set html5 mode true in config of angular app-->
       $locationProvider.html5Mode({
            enabled: true
        });