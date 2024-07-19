## Installation

```sh

REQUIRED SOFTWARE / CLI: meilisearch
# Install Meilisearch
curl -L https://install.meilisearch.com | sh
composer require meilisearch/meilisearch-php http-interop/http-factory-guzzle




git clone https:://github.com/deJames-13/larajs-system
cd larajs-system
composer install --ignore-platform-req=ext-gd

cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
npm install



# Running
php artisan serve
npm run dev

# FOR SEPARATE RUNNING OF JOBS
php artisan queue:work



# PROPER SEEDING !IMPORTANT
# IF FIRST TIME:
php artisan migrate

# IF THE DATABASE EXIST:
php artisan migrate:refresh
php artisan db:seed                         # This one only seeds the Products, Brand, Promos, Categories and USER
php artisan db:seed --class=OrderSeeder     # Make sure that `php artisan queue:work` is working. Make sure that first db:seed is executed

# To change the count of OrderSeeder
# Goto database/seeders/OrderSeeder.php
# change count $count = 50;



# LARAVEL SCOUT with MeiliSearch
# MEILI CONFIG in .env
SCOUT_DRIVER=meilisearch
# # Use the host below if you're running Meilisearch via Laravel Sail
# MEILISEARCH_HOST=http://meilisearch:7700
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_KEY=masterKey

# Launch Meilisearch: FOR MEILISEARCH engine
./meilisearch





# Accounts
admin:
    'username' => 'admin',
    'email' => 'admin@example.dev',
    password: password

customer:
    'username' => 'johndoe',
    'email' => 'johndoe@example.dev',
    password: password



```
