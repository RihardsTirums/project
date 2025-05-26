# Social Publishing Platform

## Table of Contents
1. [About](#about)
2. [Demo](#demo)
3. [Technologies](#technologies)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Security & Access Control](#security--access-control)

## About
A full-stack Social Publishing Platform built with:
- **Backend**: Laravel 11 (API-only, no Blade)
- **Frontend**: Vue 3 + TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Cookie-based authentication with Laravel Sanctum

Features include:
- User registration, login, logout
- Create, read, update, delete posts with multiple categories
- Commenting on posts
- Profile pages displaying user's posts
- Main feed with category filters and search
- Secure, policy-driven access control and XSS prevention

## Demo
**Watch the video**

[![Social Publishing Platform](https://img.youtube.com/vi/ePUbxIg1uW8/maxresdefault.jpg)](https://www.youtube.com/watch?v=ePUbxIg1uW8)


## Technologies
- Laravel 11
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Laravel Sanctum
- Pinia (state management)
- Axios (HTTP client)

## Prerequisites
- PHP >= 8.2
- Composer
- Node.js >= 16
- npm
- PostgreSQL database
- Git

## Installation

### Backend setup
1. **Clone this repository**:
   ```bash
   git clone https://github.com/RihardsTirums/project.git
   ```
2. **Set up the backend**:
   - Navigate into the backend folder:
     ```bash
     cd backend
     ```
   - Rename the `.env.example` file to `.env`:
     - On macOS/Linux:
       ```bash
       mv .env.example .env
       ```
     - On Windows (PowerShell):
       ```bash
       Rename-Item .env.example .env
       ```
   - Install backend dependencies:
     ```bash
     composer install
     ```
   - Install Node.js dependencies:
     ```bash
     npm install
     ```
   - Create a PostgreSQL database. Update the `.env` file with your database credentials:
     ```
     DB_CONNECTION=pgsql
     DB_HOST=127.0.0.1
     DB_PORT=5432
     DB_DATABASE=<your_db_name>
     DB_USERNAME=<your_db_username>
     DB_PASSWORD=<your_db_password>
     ```
   - Generate an application encryption key:
     ```bash
     php artisan key:generate
     ```
   - Run database migrations:
     ```bash
     php artisan migrate
     ```
   - Run database seeders:
      ```bash
      php artisan db:seed
     ```
   - Start the Laravel development server on port 8000:
     ```bash
     php artisan serve --port=8000
     ```

### Frontend setup
1. **Set up the frontend**:
   - Navigate into the frontend folder:
     ```bash
     cd frontend
     ```
   - Rename the `.env.example` file to `.env`:
     - On macOS/Linux:
       ```bash
       mv .env.example .env
       ```
     - On Windows (PowerShell):
       ```bash
       Rename-Item .env.example .env
       ```
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Start the Vue.js development server on port 5173:
     ```bash
     npm run dev -- --port=5173
     ```

## Usage

### Postman Collection

[Click here to open the Postman collection](https://postman.co/workspace/My-Workspace~1c5a3a38-cfc9-4ea1-8b63-40c511a4d952/collection/30400997-6ab0845c-4133-44a3-9b3b-aff0b15a5449?action=share&creator=30400997&active-environment=30400997-f7a3cfe6-47f9-47b4-8271-bce36a0f1d99)


1. Open \`http://localhost:5173\` in your browser.
2. Register a new user or log in with seeded credentials.
3. Create, edit, or delete posts.
4. Add comments to posts.
5. Filter and search posts on the main feed.
6. View user profiles.

## API Endpoints

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| POST   | \`/api/register\`           | Register a new user                |
| POST   | \`/api/login\`              | Log in (Sanctum cookie-based)      |
| POST   | \`/api/logout\`             | Log out                            |
| GET    | \`/api/user\`               | Get current authenticated user     |
| GET    | \`/api/posts\`              | List posts (filter & search)       |
| POST   | \`/api/posts\`              | Create a post                      |
| GET    | \`/api/posts/{id}\`         | Show a single post                 |
| PUT    | \`/api/posts/{id}\`         | Update a post                      |
| DELETE | \`/api/posts/{id}\`         | Delete a post                      |
| POST   | \`/api/posts/{id}/comments\`| Add comment to post                |
| DELETE | \`/api/comments/{id}\`       | Delete a comment                   |
| GET    | \`/api/categories\`         | List predefined categories         |

## Security & Access Control
- **Input Validation**: All request data validated via FormRequests.
- **Authorization**: Policy-based checks ensuring only owners can edit/delete.
- **XSS Prevention**: All HTML tags stripped server-side; frontend uses safe interpolation.
- **Rate Limiting**: Login attempts limited to 5 per minute.
- **CSRF Protection**: Laravel Sanctum cookie-based flow with CSRF token endpoint.