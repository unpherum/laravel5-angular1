## Installing

- clone this project. and cd into root directory
- run composer update and do generate app key: 
```
#!php

composer update && composer key:generate
```
- running auto load task

```

#!php
php artisan dump-autoload
```

- running default user: 
```
#!php

php artisan db:seed
```
- start server by: 
```
#!php

php artisan serve
```

- Installing some node dependencies: 
```
#!php

npm install
```

- And run gulp for angular libs and styles: 
```
#!php

gulp
```

*default user after seeding is user: admin@5andhalf.com pass: admin