# Code-Copilot

Code-Copilot is a full-stack AI-assisted code generation application that converts natural language prompts into structured code. It integrates **Google Generative AI**, a **Railway-hosted SQL database**, and a modern **React/Tailwind** frontend. The platform supports multi-language generation, persistent history storage, local favorites, theme preferences, and a rich interactive UI.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [System Architecture](#system-architecture)
4. [Data Flow](#data-flow)
5. [Tech Stack](#tech-stack)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Deep Dive](#frontend-deep-dive)
9. [Project Structure](#project-structure)
10. [Setup Instructions](#setup-instructions)

---

## Overview

Code-Copilot is a fully functional code generation tool designed to emulate key capabilities of AI coding assistants. The system allows users to enter prompts, choose a programming language, and generate code through **Google Generative AI**. Generated results are saved in a SQL database and displayed in a fully responsive interface with search, filtering, favorites, and light/dark theming.

### Key Capabilities

* Real AI-powered code generation
* Persistent history stored in a SQL database
* Favorites and theme preferences stored in localStorage
* Client-side history search
* Responsive layout with syntax highlighting
* Scalable architecture with clean separation of concerns

---

## Features

### Core

#### AI-Powered Code Generation

* Uses Google Generative AI (`@google/generative-ai`) to produce code from natural language.
* Supports multiple programming languages through backend-defined language table.
* Includes loading states, error handling, and real-time updates.

#### Code Viewer

* Syntax-highlighted output using `react-syntax-highlighter`.
* Auto-scrolling, line numbers, and theme-consistent styling.
* Copy-to-clipboard functionality.

---

### Advanced Features

#### SQL-Backed History System

Generated code is stored in the **Generations** table containing:

* Prompt
* Code
* Language
* Timestamp
* Auto-incremented ID

The backend exposes `/api/history` to retrieve and manage this data.

#### Client-Side History Search

* Fully client-side search across prompts and code.
* Real-time filtering without backend queries.

#### Favorites (localStorage)

Favorites are **only stored locally**, not in SQL.

Local format:

```json
[12, 8, 5]
```

Each favorite is merged with backend history on load.

#### Theme Persistence

* Light/Dark themes saved to `localStorage` under `code-copilot-theme`.
* Applied globally via root class (`document.documentElement`).

---

## System Architecture

```
┌────────────────────────────────────────────────────────────  ┐
│                           Frontend                           │
│                     React + Vite + Tailwind                  │
│                                                              │
│  PromptInput  LanguageSelector  CodeOutput  HistoryPanel     │
│                                                              │
│        localStorage: favorites[], theme                      │
└──────────────┬───────────────────────────────────────────────┘
               │ Axios
               ▼
┌────────────────────────────────────────────────────────────┐
│                      Backend (Express)                     │
│                                                            │
│  Routes:                                                   │
│   POST   /api/generate   → Google Generative AI            │
│   GET    /api/history    → SQL: Generations table          │
│   DELETE /api/history/:id → Delete row                     │
│   GET    /api/languages  → SQL: Languages table            │
│                                                            │
│  Hybrid Data Model:                                        │
│   SQL → persistent history & language metadata             │
│   localStorage → preferences & favorites                   │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
User enters prompt  
      ↓  
Frontend validates  
      ↓  
POST /api/generate  
      ↓  
Backend calls Google Generative AI  
      ↓  
SQL insert → Generations table  
      ↓  
Frontend renders code  
      ↓  
User marks favorite → saved to localStorage  
      ↓  
Reload merges SQL history + local favorites  
```

---

## Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* Axios
* React Syntax Highlighter
* Lucide Icons

### Backend

* Node.js
* Express.js
* Google Generative AI (`@google/generative-ai`)
* Sequelize ORM
* Railway SQL Database (MySQL/PostgreSQL depending on deployment)

### Hybrid State Approach

| Feature   | Storage      |
| --------- | ------------ |
| History   | SQL database |
| Languages | SQL table    |
| Favorites | localStorage |
| Theme     | localStorage |

---

## Database Schema

### Table: `Languages`

| Column    | Type   | Notes                          |
| --------- | ------ | ------------------------------ |
| id        | INT PK | Auto-increment                 |
| key       | STRING | Unique identifier (`"python"`) |
| name      | STRING | Display name (`"Python"`)      |
| createdAt | DATE   | Timestamp                      |
| updatedAt | DATE   | Timestamp                      |

### Table: `Generations`

| Column     | Type     | Notes                    |
| ---------- | -------- | ------------------------ |
| id         | INT PK   | Auto-increment           |
| prompt     | TEXT     | User input               |
| code       | LONGTEXT | Generated output         |
| languageId | INT FK   | Links to Languages table |
| createdAt  | DATE     | Timestamp                |
| updatedAt  | DATE     | Timestamp                |

---

## API Documentation

### POST `/api/generate`

Generates code using Google AI.

#### Request

```json
{
  "prompt": "Write a bubble sort algorithm",
  "language": "javascript"
}
```

#### Response

```json
{
  "id": 14,
  "prompt": "...",
  "code": "...generated code...",
  "language": "javascript",
  "createdAt": "2025-11-23T10:00:00.000Z"
}
```

---

### GET `/api/history`

Returns full SQL history.

Response:

```json
{
  "data": [
    {
      "id": 1,
      "prompt": "...",
      "code": "...",
      "language": "python",
      "createdAt": "..."
    }
  ]
}
```

---

### DELETE `/api/history/:id`

Deletes one history entry.

---

### GET `/api/languages`

Returns all supported languages.

---

## Frontend Deep Dive

### App.jsx (Main Controller)

Responsible for:

* Loading history from backend
* Merging history with favorites from localStorage
* Managing theme, prompt, language, code output
* Sending generation requests
* Deleting history
* Toggling favorites

Key behaviors:

* Theme stored in localStorage
* Favorites stored in localStorage
* History fetched from backend SQL
* Search performed client-side
* Merged history items include `{ favorite: true/false }`

---

## Project Structure

```
client/
  src/
    components/
      Header.jsx
      PromptInput.jsx
      LanguageSelector.jsx
      CodeOutput.jsx
      HistoryPanel.jsx
    App.jsx
    main.jsx

server/
  models/
  migrations/
    create-languages.js
    create-generations.js
  routes/
  index.js
```

---

## Setup Instructions

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Visit:

```
http://localhost:5173
```
