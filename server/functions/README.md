# Cardival Backend Server

The Cardival backend server is built to support the Cardival Flashcard & Quiz Generation App, handling user accounts, card set management, and quiz generation. This server is implemented using Express.js and connects to MongoDB for data persistence.

## Technologies Used

- **Node.js (v20)**: The runtime environment for executing JavaScript on the server side.
- **Express.js**: A web application framework for Node.js, designed for building web applications and APIs.
- **MongoDB**: A NoSQL database used to store application data.
- **Firebase Functions**: Utilized to deploy Express.js applications as serverless functions.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Jest**: A testing framework for JavaScript.

## Setup

Before you begin, ensure Node.js (v20) is installed on your system.

1. **Navigate to the Functions Directory**:

```sh
cd server/functions
```

2. **Install Dependencies**:

```sh
npm install
```

This command installs all necessary packages as defined in `package.json`.

## npm Scripts

The `package.json` file defines the following scripts to assist with development and deployment:

- **`build`**: Compiles TypeScript files to JavaScript, preparing the application for deployment.
- **`build:watch`**: Runs the TypeScript compiler in watch mode, recompiling files as they are changed.
- **`serve`**: Compiles the application and starts the Firebase Emulators for local testing.
- **`serve:dev`**: Runs both `tsc --watch` and `firebase emulators:start` concurrently for active development.
- **`shell`**: Starts the Firebase Shell for interactive testing of Firebase Functions.
- **`start`**: Alias for `npm run shell`.
- **`deploy`**: Deploys the application to Firebase Functions.
- **`logs`**: Fetches and displays logs from the deployed Firebase Functions.
- **`test`**: Runs Jest tests for the application.
- **`test:dev`**: Runs Jest in watch mode, re-running tests as files change.

## API Endpoints

The backend server provides several RESTful endpoints:

- **GET `/accounts/:uid`**: Fetches an account by the user's Google UID.
- **POST `/accounts`**: Creates a new account with the provided Account object.
- **POST `/accounts/:_id/card-sets`**: Adds a new card set to an account.
- **PUT `/accounts/:_id/card-sets/:activeSetId/replace`**: Replaces an existing card set within an account.
- **PATCH `/accounts/:_id/card-sets/:activeSetId/cards`**: Updates the cards within a specific card set.

These endpoints support the core functionality of managing user accounts and card sets for the flashcard and quiz features of the Cardival app.
