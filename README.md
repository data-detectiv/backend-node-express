# 🛡️ Auth-Enabled Task Manager API

A secure, RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows authenticated users to manage personal tasks. Features include user registration, login, token-based authentication, and full task CRUD operations.

---

## 🚀 Features

* **User Authentication**: Secure registration and login using **JWT (Access & Refresh Tokens)**
* **Task CRUD Operations**: Create, read, update, and delete tasks tied to authenticated users
* **MongoDB Integration**: Persistent data storage using MongoDB and Mongoose
* **Middleware**: Custom middleware for authentication, error handling, and input validation
* **Modular Architecture**: Clean MVC structure for scalability and maintainability
* **Role-Based Access**: Support for admin vs. user privileges

---

## 📦 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Authentication**: JWT, bcrypt
* **Dev Tools**: nodemon, dotenv, Postman (for testing)
* **API Docs**: Swagger/OpenAPI

---

## 📂 Project Structure

```
auth-task-manager/
│
├── controllers/        # Route logic
├── middleware/         # Auth, error handling
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── config/             # DB connection, secrets
├── .env
├── server.js
```

---

## 🔐 Authentication Flow

* `POST /register`: Create a new user
* `POST /login`: Authenticate user & receive tokens
* `GET /refresh`: Get a new access token using refresh token
* `POST /logout`: Invalidate session

---

## 📝 Task Endpoints

* `POST /tasks`: Create a new task
* `GET /tasks`: Get all tasks for logged-in user
* `PUT /tasks/:id`: Update a task
* `DELETE /tasks/:id`: Delete a task

---

## 🧪 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/auth-task-manager

# 2. Install dependencies
cd auth-task-manager
npm install

# 3. Set up your environment variables in a `.env` file
PORT=3500
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# 4. Start the server
npm run dev/nodemon
```

---

## 📚 API Documentation (if using Swagger)

> API docs available at:
> `http://localhost:3500/api-docs`

---

## 📌 Future Improvements

* Swagger-based API documentation
* Unit and integration tests (Jest, Supertest)
* Deployment to Render / Vercel
* Frontend integration (React)

---

## 📖 License

This project is open-source and available under the [MIT License](LICENSE).
