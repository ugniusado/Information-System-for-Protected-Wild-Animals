# Information System for Protected Wild Animals of the Republic of Lithuania

[Project description]

## Getting Started

These instructions will guide you through setting up and running the project on your local machine.

### Prerequisites

- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)

### Installation

1. Clone the repository or unzip the project into your preferred directory.

2. Install the `http-server` package globally by running the following command:
```
npm install -g http-server
```

3. Install the required Node.js dependencies:
```
npm install mysql
npm install express mysql
npm install cors
npm install multer
```

4. Set up the database:
   - Launch MySQL Workbench.
   - Execute the queries provided in the `queries.txt` file located in the project's directory to create the necessary database and table.

### Usage

1. Start the species server:
   - Navigate to the `web/species` directory.
   - Run the following command:
```
node server.js
```

2. Start the main server:
- Navigate to the `web` directory.
- Run the following command:
```
node app.js
```

3. Start the chatbot server:
- Navigate to the `web/chatbot` directory.
- Run the following command:
```
node server.js
```

4. Start the front-end server:
- Navigate to the `web` directory.
- Run the following command:
```
python -m http.server
```

5. Open a web browser and access the application at `http://localhost:8000`.
