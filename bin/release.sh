#! /usr/bin/env sh
php /var/www/html/artisan migrate --force
php /var/www/html/artisan storage:link