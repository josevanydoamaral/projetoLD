
# TijoAI - AI Chat and Fake Image Generator App

This project is a mobile application built with **React Native (Expo)**, powered by a **Laravel API** and a backend **AI service** running in **Docker**. The app has two main features:

- Chat with a fake AI assistant  
- Generate fake images using AI

## Project Structure

```
├── ai-services/         # AI service (runs in Docker)
├── project/             # Main React Native application
├── TijoAI/              # Laravel API backend
├── .gitignore
└── README.md
```

## Requirements

- [Node.js & npm](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [PHP >= 8.2](https://www.php.net/) (added to system PATH)
- [Composer](https://getcomposer.org/)
- [MySQL server](https://www.mysql.com/) (via XAMPP, MySQL Workbench, or other)

## 1. Start the AI Service (Docker)

1. Ensure Docker Desktop is installed and running.
2. Open a terminal inside the `ai-services` folder.
3. Run:

```bash
docker compose up
```

This starts the AI service used by the Laravel API.

## 2. Start the Laravel API (TijoAI)

1. Open a terminal inside the `TijoAI` folder.
2. Install PHP dependencies:

```bash
composer install
```

3. Create a MySQL database (e.g., `tijo_ai_db`).
4. Copy the `.env.example` file and rename it to `.env`. Update the database section:

```env
APP_NAME=TijoAI
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8080

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tijo_ai_db
DB_USERNAME=root
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

5. Generate Laravel app key:

```bash
php artisan key:generate
```

6. Run database migrations and seed data:

```bash
php artisan migrate
php artisan db:seed --class=DatabaseSeeder
```

7. Start the Laravel development server:

```bash
php artisan serve --port=8080
```

The API should now be running at `http://localhost:8080`.

## 3. Run the React Native App (Expo)

1. Open a terminal inside the `project` folder.
2. Install Node dependencies:

```bash
npm install
```

3. Start the app using Expo:

```bash
npx expo start
```

You can then run the app on a browser, simulator, or physical device (using the Expo Go app).

## App Features

- **AI Chat**: A conversational interface that connects to the Laravel API, which forwards the request to the AI service.
- **Fake Image Generator**: Users can request a generated image through the API.

## Final Notes

- Make sure **Docker**, **Laravel API**, and **Expo app** are all running simultaneously.
- Ensure API URLs are correct and accessible from the device running the app (adjust CORS settings if needed).
- All communication flows:  
  React Native App → Laravel API → Docker AI Service

## Author

Tiago Martos and Josevany do Amaral
Enjoy it :
