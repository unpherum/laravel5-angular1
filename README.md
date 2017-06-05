## Installing

- Clone this project. and cd into root directory
- Copy .env.example file and make your own .env file with your appropriated database's info
- Run composer update and do generate app key: 
```
$ composer update && php artisan key:generate
```
- Running auto load task
```
$ composer dump-autoload
```
- Running migrate tables: 
```
$ php artisan migrate
```
- Running default user: 
```
$ php artisan db:seed
```
- Start server by: 
```
$ php artisan serve
```
- Installing some node dependencies: 
```
$ npm install
```
- And run gulp for angular libs and styles: 
```
$ gulp
```

Now you can open the brower with http://localhost:8000
