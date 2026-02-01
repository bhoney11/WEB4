 Makeship Toy Store — API Assignment 4

##  Project Overview

This project is a professional-grade RESTful API for a Toy Store. It has been refactored from a basic script into a scalable **MVC (Model-View-Controller)** architecture. The system ensures high security using **password hashing** and **JWT-based Role-Based Access Control (RBAC)**.

##  Modular Architecture

To meet industry standards, the project is organized into dedicated directories:

* `models/`: Mongoose schemas defining the data structure for **Users**, **Toys**, and **Reviews**.
* `controllers/`: Business logic, separating database operations from routing.
* `routes/`: Clean API endpoints mapping to controller functions.
* `middleware/`: Security layers including JWT verification (`protect`) and role authorization (`isAdmin`).
* `public/`: Frontend interface for interacting with the API.

##  Objects & CRUD Operations

The application manages two related entities:

1. **Toy (Primary Object):** Represents products in the shop (Name, Price, Image).
2. **Review (Secondary Object):** Feedback left by users for specific toys, linked via `toyId`.

**Full CRUD Implementation:** Both objects support Create, Read, Update, and Delete operations.

##  Security & RBAC Logic

We implemented a multi-tier security system:

* **Password Hashing:** Using `bcryptjs`, user passwords are salted and hashed before saving to MongoDB.
* **JWT Authentication:** Users receive a token upon login, which must be provided in the `Authorization: Bearer <token>` header for protected routes.
* **RBAC Policy:**
* **Public (No Auth):** Can view toys and reviews (GET).
* **User Role:** Can register, login, and create/update their own reviews.
* **Admin Role:** Exclusive access to manage toys (POST, PUT, DELETE) and moderate reviews.



##  Setup & Installation

1. **Clone the project** to your local machine.
2. **Install dependencies**:
```bash
npm install

```


3. **Environment Variables**: Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_unique_secret_key

```


4. **Start the Server**:
```bash
node server.js

```


5. **Access the App**: Open `http://localhost:3000` in your browser.

##  API Testing with Postman

A pre-configured **Postman Collection** (`Assignment4.postman_collection.json`) is included in this repository.

### How to test:

1. **Register/Login**: Use the Auth folder to get a token.
2. **Authorization**: Copy the token and paste it into the **Auth** tab in Postman as a **Bearer Token**.
3. **RBAC Verification**:
* Attempting a `DELETE` request with a **User** token will return `403 Forbidden`.
* The same request with an **Admin** token will return `200 OK`.

