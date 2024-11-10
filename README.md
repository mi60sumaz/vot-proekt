# VOT Node.js App with MySQL and Docker

This is a Node.js project that handles `post` and `get` requests and saves them in a MySQL database.
The app includes: 
- user authentication
- order management
- basic routes to add and retrieve orders.

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine

## Project Structure

- `docker-compose.yaml`: Defines services for the app and MySQL database
- `Dockerfile`: Specifies the app's Docker container configuration
- `.env`: Environment variables for database connection
- `app/`: Contains the Node.js app source code
- `db/init.sql`: SQL script to initialize the database

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
## Setup Instructions

2. **Set Environment Variables**

   Create a `.env` file in the project root with the following values (or edit if already present):

   ```plaintext
   DB_HOST=mysql
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=orders_db

   MYSQL_ROOT_PASSWORD=password
   MYSQL_DATABASE=orders_db

3. **Run Docker Compose**

   Start the app and MySQL services using Docker Compose:

     ```bash
     docker-compose up --build
>

   - This will build the app image, set up the MySQL container, and run both in a shared network.
   - The app will be available on http://localhost:80.

4. **Database Initialization**

- The MySQL database will be initialized with tables from db/init.sql on first run. This includes the users and orders tables.

## Usage
1. **Sign Up**

- `POST /signup`
- Send JSON body with username and password to create a new user.
2. **Log In**

- `POST /login`
- Send JSON body with username and password to log in.

3. **Add Order**

- `POST /addorders`
- Send JSON body with userId and order_details to add an order for the user.
4. **Get Orders**

- `GET /getorders?userId=<id>`
- Use userId as a query parameter to retrieve all orders for that user.
5. **Cleanup**
- To stop and remove all containers, networks, and volumes:

  ```bash
  docker-compose down -v
