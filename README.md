# Cardival - Flashcard & Quiz Generation App

Cardival is a complete flashcard and quiz generation solution, integrating a React-based frontend with an Express.js backend. This platform is designed to facilitate efficient study methods through interactive tools and adaptive learning techniques.

## Technologies Used

- **Frontend**: React, TypeScript, Vite, Jest, React Testing Library, JavaScript (ES6+), TailwindCSS
- **Backend**: Node.js (v20), Express.js, MongoDB, Firebase Functions, TypeScript, Jest

## Project Setup

Ensure Node.js version 20 is installed on your system to ensure compatibility with the development environment.

### Cloning the Repository

To get started, clone the repository to your local machine:

```sh
git clone https://github.com/TheodoreRed/cardival.git
```

### Installation

The project consists of two main parts: the frontend application (`app`) and the backend server (`server/functions`). To set up both environments, you will need to install dependencies in each directory.

1. **Install dependencies**:

   ```sh
   npm install
   npm run setup
   ```

### Running the Project

Back at the root of the project, you can use the following npm scripts defined in `package.json` for development:

- **`npm run setup`**: Concurrently installs both the app and server dependencies.
- **`npm run dev`**: Concurrently starts both the frontend development app and the backend server for local development.
- **`npm run dev:watch`**: Similar to `npm run dev`, but with watch mode enabled for both frontend and backend, allowing live reloading on changes.
- **`npm run test`**: Concurrently runs tests for both frontend and backend.

These commands facilitate simultaneous development and testing of both parts of the Cardival project, ensuring a seamless development experience.
