# Projects API (Node.js + MongoDB)

REST API for project management built with Node.js, Express and MongoDB.

This API allows creating, listing, updating and deleting projects, as well as uploading and managing project images.

## Features

- Create projects
- List all projects
- Get project by ID
- Update projects
- Delete projects
- Upload project images
- Retrieve uploaded images
- MongoDB integration with Mongoose
- File upload handling with Multer

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Multer
- CORS

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/projects-api-node-mongodb.git
cd projects-api-node-mongodb
```

Install dependencies:

```bash
npm install
```

Start MongoDB and make sure the database is available.

Configure the connection in:

```text
database/connection.js
```

Run the application:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3977
```

## API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/project/save` | Create a new project |
| GET | `/api/project/list` | Get all projects |
| GET | `/api/project/item/:id` | Get a project by ID |
| PUT | `/api/project/update` | Update a project |
| DELETE | `/api/project/delete/:id` | Delete a project |
| PUT | `/api/project/upload/:id` | Upload a project image |
| GET | `/api/project/image/:file` | Get an uploaded image |

## Architecture

```text
Client (Postman)
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Models (Mongoose)
        │
        ▼
MongoDB
```

## Project Structure

```text
├── controllers
├── database
├── models
├── routes
├── uploads
├── index.js
├── package.json
└── README.md
```

## Author

Gregorio Jose Mesa Fernandez