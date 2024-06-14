## Installation

```sh
git clone https:://github.com/deJames-13/larajs-system
cd larajs-system
composer install --ignore-platform-req=ext-gd

cp .env.example .env
php artisan key:generate
php artisan vendor:publish --provider="Attrixtech\LaravelIcons\LaravelIconsServiceProvider" 
php artisan migrate
php artisan db:seed

npm install



```