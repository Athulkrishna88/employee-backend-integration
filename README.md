# Employee App Backend Integration

An employee management dashboard with a Node.js, Express.js, and MongoDB backend.

## Features
- View all employees
- View an individual employee
- Add employees
- Edit employee information
- Delete employees

## Technologies
- React and Vite
- Node.js and Express.js
- MongoDB Atlas and Mongoose

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
node app.js
```

In a second terminal, start the frontend:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint |
|---|---|
| GET | `/api/employees` |
| GET | `/api/employees/:id` |
| POST | `/api/employees` |
| PUT | `/api/employees/:id` |
| DELETE | `/api/employees/:id` |

## Security
Never upload `.env` or your MongoDB credentials to GitHub.

## Repository
https://github.com/Athulkrishna88/employee-backend-integration
