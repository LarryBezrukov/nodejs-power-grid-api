# nodejs-power-grid-api

The `nodejs-power-grid-api` is a RESTful service designed to visualize and analyze the annual net generation of power plants in the United States. Utilizing data from the eGRID2022 file, this Node.js application allows users to retrieve information about the top N power plants, view data by state, and understand the power generation landscape through absolute values and percentages.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Docker (for containerization)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LarryBezrukov/nodejs-power-grid-api.git
```
2. Navigate to the project directory:

```bash
cd nodejs-power-grid-api
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure the necessary environment variables based on the .example.env provided.
.example.env

```bash
EXCEL_FILE_NAME=egrid2022_data.xlsx
PORT=3000
```
Copy this content into your .env file and adjust the values as per your setup.

### Running the Application

To start the application locally:

```bash
npm start
```

To run the application using Docker Compose:

```bash
docker-compose up --build
```

### API Endpoints

* GET /api/plants: Retrieves the top N power plants sorted by their net generation.
* GET /api/plants/state/{stateCode}: Retrieves the top N power plants for a specific state, including their percentage of the state's total net generation.

### Future Improvements

* **Database Integration:** Transition from storing data in memory to using a database for persistent storage. This change would improve data management efficiency and allow for more complex queries and data analysis. A database would also facilitate real-time updates to the data without needing to restart the server.

* **Automatic Data Updates:** Implement a cron job or a scheduled task to automatically check for and download new versions of the eGRID data file as they become available. After fetching the new data, the system can parse the updated file and refresh the database, ensuring the API always serves the most current information without manual intervention.
