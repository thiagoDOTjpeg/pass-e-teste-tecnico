FROM php:8.2-cli-alpine AS builder

RUN apk add --no-cache \
    git \
    zip \
    unzip \
    nodejs \
    npm

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --ignore-platform-reqs \
    --optimize-autoloader

RUN npm ci
RUN npm run build


FROM php:8.2-cli-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql zip bcmath opcache

COPY . .
COPY .env.example .env

COPY --from=builder /app/vendor/ ./vendor/
COPY --from=builder /app/public/build/ ./public/build/

RUN chown -R nobody:nobody /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

RUN rm -rf bootstrap/cache/*.php

RUN php artisan package:discover --ansi

RUN php artisan view:cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]