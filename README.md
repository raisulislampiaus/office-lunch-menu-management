# Office Lunch Menu Management System

This project is a Office Lunch Menu Management System that allows admins to manage lunch menus and options, and employees to select their lunch choices.

## Technologies Used

- **Backend**: Node.js, Express.js, Sequelize, PostgreSQL
- **Frontend**: React.js, Axios
- **Authentication**: JWT (JSON Web Tokens)

## Features

- **Admin Features**:
  - Add new lunch menus and options for specific dates.
  - View employee choices for lunch options.
- **Employee Features**:
  - Register and log in to the system.
  - View available lunch options for the current day.
  - Select their lunch choice.

## Database Schema

The database schema includes the following tables:

- **Users**: Stores user information.
  - `id`: Primary Key
  - `name`: String
  - `email`: String
  - `password`: String
  - `role`: String (admin or employee)
  
- **Menus**: Stores menu information for specific dates.
  - `id`: Primary Key
  - `date`: Date

- **MenuOptions**: Stores lunch options for menus.
  - `id`: Primary Key
  - `MenuId`: Foreign Key (References Menus)
  - `option_name`: String

- **Choices**: Stores employee choices for lunch options.
  - `id`: Primary Key
  - `UserId`: Foreign Key (References Users)
  - `MenuOptionId`: Foreign Key (References MenuOptions)


**Run Backend:
   1.npm install
   2.npm start
**Run Frontend:
  1.npm install
  2.npm start

**Access the application**:
   - Backend API: `http://localhost:5000`
   - Frontend: `http://localhost:3000`



    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    DATABASE_NAME=your_database_name
    DATABASE_HOST=your_database_host
    JWT_SECRET=your_jwt_secret



