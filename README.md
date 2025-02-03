# Task Boards Backend

This project is the backend part of a task management system, built using Node.js, Express.js, MongoDB, and TypeScript. It provides a RESTful API for managing boards and cards, supporting CRUD operations, status updates, and more.

This API is deployed on [Render](https://render.com/).

## Features

- Create, Read, Update, Delete (CRUD) boards.
- Manage cards: Add, update, and delete cards.
- Card status management: Update card statuses ("To Do", "In Progress", "Done").
- Change cards order in a column.

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

- GET /board: Get all boards.
- GET /board/:id: Get board by id.
- POST /board: Create a new board.
- PATCH /board/:id: Update board name by ID.
- PATCH /board/:boardId/move-card: change cards order in a column.
- PATCH /board/:boardId/columns/:columnId: move card between columns.
- DELETE /board/:id: Delete a board by ID.

**Cards**

- GET /card/:id: Get cards by ID.
- POST /card: Add a new card.
- PUT /card/:id: Update a card by ID.
- DELETE /card/:id/board/:boardId: Delete a card by ID and board ID.
