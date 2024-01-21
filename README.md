# User CRUD API

This is a simple RESTful API built using Node.js and Express.js that performs basic CRUD operations on a user entity.

## Requirements

Before running the API, make sure you have the following requirements installed:

- Docker

## Setup and Initialization

A Docker Compose file has been included in the project that includes all the services required to run the stack. To run the application using Docker Compose, follow these steps:

1. Install Docker and Docker Compose on your machine.

2. Clone this repository to your local machine.

3. Navigate to the project directory and run the following command:

docker-compose up


4. The application should now be running on `http://localhost:8000`.

## Tools

- Node.js
- MongoDB
- Redis caching
- Logger (pino)

## API Endpoints

- `GET /users`/:id: Retrieve a specific user by ID.
- `POST /users/signup`: Add a new user.
- `PATCH /users`/:id: Update a user by ID.
- `DELETE /users`/:id: Delete a user by ID.