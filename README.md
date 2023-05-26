# Information System for Protected Wild Animals of the Republic of Lithuania

The main objective of the thesis is to develop a prototype of the information system for wild animals protected in the Republic of Lithuania. This prototype system will aim to improve the existing functionalities of the Red Data Book information system, helping to conserve rare and endangered species. The objectives of the work were to analyse and compare existing protected wildlife information systems, to design and implement a prototype of an improved protected wildlife information system for Lithuania, and to test and evaluate the system to ensure its availability, reliability and overall effectiveness. The work resulted in the development of a prototype of the Protected Wildlife Information System for the Republic of Lithuania, which improved the existing functionalities of the Red Data Book Information System, improved performance and extended accessibility to a wider audience.

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
