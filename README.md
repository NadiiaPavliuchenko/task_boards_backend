# Task Boards Backend

This project is the backend part of a task management system, built using Node.js, Express.js, MongoDB, and TypeScript. It provides a RESTful API for managing boards and cards, supporting CRUD operations, status updates, and more.

This API is deployed on [Render](https://render.com/).

## Features

- Create, Read, Update, Delete (CRUD) boards.
- Manage cards: Add, update, and delete cards.
- Card status management: Update card statuses ("To Do", "In Progress", "Done").

## Technologies Used

- Node.js and Express.js for the server-side logic.
- MongoDB with Mongoose for database management.
- TypeScript for type safety and better developer experience.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/NadiiaPavliuchenko/task_boards_backend.git
cd task_boards_backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

- Copy .env.example to .env and update MongoDB URI.

4. Run the server:

```bash
npm run dev
```

The server will run on `http://localhost:4000`.

## API Endpoints

**Boards**

- GET /boards: Get all boards.
- POST /boards: Create a new board.
- PUT /boards/:id: Update a board by ID.
- DELETE /boards/:id: Delete a board by ID.

**Cards**

- GET /boards/:boardId/cards: Get all cards in a specific board.
- POST /boards/:boardId/cards: Add a new card to a board.
- PUT /cards/:id: Update a card by ID.
- DELETE /cards/:id: Delete a card by ID.
