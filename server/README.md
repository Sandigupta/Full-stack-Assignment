# Code Generation Copilot - Backend

The backend service for the Code Generation Copilot application. This service handles code generation requests using Google's Gemini AI, manages supported programming languages, and stores user generation history.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **AI Model**: Google Generative AI (Gemini)

## Prerequisites

- Node.js (v18 or higher)
- MySQL Server
- Google Gemini API Key

## Setup & Installation

1.  **Install Dependencies**
    Navigate to the project root and install the required packages:
    ```bash
    npm install
    ```

2.  **Environment Configuration**
    Ensure you have a `.env` file in the project root directory with the following variables:
    ```env
    PORT=3001
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=code_copilot_db
    GEMINI_API_KEY=your_gemini_api_key
    ```

3.  **Database Setup**
    The project uses Sequelize for database management. Run the migrations and seeders from the project root (or wherever your package.json scripts are configured to run, typically the root for this monorepo structure).

    *Note: The `.sequelizerc` file is located in the `server` directory, so you might need to point to it or run sequelize commands from within `server/` if not using the root scripts.*

    To run migrations (ensure your DB exists first):
    ```bash
    npx sequelize-cli db:migrate --config server/src/config/config.cjs --migrations-path server/migrations
    ```
    
    To seed the database (e.g., with supported languages):
    ```bash
    npx sequelize-cli db:seed:all --config server/src/config/config.cjs --seeders-path server/seeders
    ```

## Running the Server

From the project root directory:

```bash
npm run server
```

The server will start on `http://localhost:3001` (or the port specified in your `.env`).

## API Endpoints

### Languages
-   **GET** `/api/languages`: Retrieve a list of supported programming languages.

### Generation
-   **POST** `/api/generate`: Generate code based on a prompt.
    -   Body: `{ "prompt": "string", "language": "string" }`

### History
-   **GET** `/api/history`: Retrieve past code generations.
-   **POST** `/api/history`: Save a new generation to history.
-   **DELETE** `/api/history/:id`: Delete a specific history item.
-   **DELETE** `/api/history`: Clear all history.
