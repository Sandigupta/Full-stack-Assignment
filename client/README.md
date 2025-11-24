# Code Generation Copilot

An AI-powered code generation assistant that helps developers quickly generate code snippets in various languages.

## Setup Instructions

1.  **Prerequisites:** Ensure you have Node.js installed on your machine.
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Application:**
    This command runs both the frontend (Vite) and backend (Express) concurrently.
    ```bash
    npm run dev
    ```
4.  **Access the App:** Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### Other Scripts
-   `npm run client`: Run only the frontend development server.
-   `npm run server`: Run only the backend server.
-   `npm run build`: Build the frontend for production.

## Design & Architecture

The application follows a modern client-server architecture:

-   **Frontend:** Built with **React** and **Vite** for a fast and responsive user interface.
    -   **Styling:** Uses **Tailwind CSS** for utility-first styling, with a custom design system supporting **Light/Dark modes**.
    -   **State Management:** React's `useState` and `useEffect` manage local state, while `localStorage` provides persistence for user history and theme preferences.
    -   **Icons:** Uses `lucide-react` for consistent iconography.
-   **Backend:** A lightweight **Node.js** and **Express** server.
    -   **API:** Exposes a RESTful endpoint `/api/generate` to handle code generation requests.
    -   **Mock Logic:** Currently uses a mock generation engine to simulate AI responses with artificial delays, returning language-specific templates.

## Features

-   **Multi-Language Support:** Generate code for JavaScript, Python, Java, C, C++, and TypeScript.
-   **Smart History:**
    -   Automatically saves generated snippets.
    -   **Search:** Filter history by prompt or language.
    -   **Favorites:** Pin important snippets for quick access.
    -   **Management:** Delete individual items or clear history.
-   **Theme System:** Toggle between Light and Dark modes for comfortable viewing in any environment.
-   **Responsive Design:** Fully responsive layout with a collapsible history drawer for mobile devices.
-   **Code Display:** Syntax highlighting and formatted output for generated code.

## Future Improvements

If I had more time, I would improve the following:

1.  **Real AI Integration:** Replace the mock logic with a real LLM API (like OpenAI or Gemini) for dynamic and accurate code generation.
2.  **User Authentication:** Implement user accounts to sync history across devices using a database (e.g., MongoDB or PostgreSQL).
3.  **Enhanced Editor:** Add a fully featured code editor (like Monaco Editor) for editing and running snippets directly in the browser.
4.  **Testing:** Add comprehensive unit and integration tests (using Jest/Vitest and React Testing Library) to ensure reliability.
5.  **Export Options:** Allow users to download generated code as files or copy to clipboard with one click.

## API Reference

### Generate Code

**Endpoint:** `POST /api/generate`

**Request Body:**

```json
{
  "prompt": "write a function to calculate fibonacci sequence",
  "language": "python"
}
```

**Response:**

```json
{
  "code": "# Python solution for: write a function to calculate fibonacci sequence\n\ndef solution():\n    # ... implementation ...",
  "language": "python",
  "timestamp": 1716384928374
}
```
