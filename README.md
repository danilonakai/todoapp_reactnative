# TodoApp (React Native + Redis)

## Overview

A simple TodoApp built with React Native, featuring a task list management system where users can add, edit, delete, save, restore, and clear tasks. This app communicates with a backend built using Node.js and Redis to persist and manage the tasks.

## Features

- Input field to add task names.
- Edit and delete options for each task in the list.
- Action buttons: Add, Save, Restore, and Clear.
- Stores tasks in a Redis database.

## Tech Stack

- **Frontend**:
  - **React Native** for mobile app development.
  - **React** hooks (`useState`, `useEffect`) for managing component state and side effects.
  - **FlatList** for rendering a scrollable list of items.

- **Backend**:
  - **Node.js** with **Express.js** for handling API requests.
  - **Redis** as the in-memory data store to persist and manage task lists.

- **API Endpoints**:
  - **GET `/load`**: Retrieves the TODO list stored in Redis.
  - **POST `/save`**: Saves the updated TODO list to Redis.
  - **GET `/clear`**: Clears the TODO list stored in Redis.

## UI Overview
![WhatsApp Image 2025-02-05 at 18 53 07](https://github.com/user-attachments/assets/7b76f501-fede-4cb1-b094-3f5035d1386e)

## Installation

To get started with this app, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/danilonakai/todoapp_reactnative.git
    cd todoapp_reactnative
    ```

2. **Backend Setup**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
   - The server will run on `http://localhost:3001`.

3. **Frontend Setup**:
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the **frontend** app on your device or emulator:
     ```bash
     npm start
     ```

Your app should now be running, with both the frontend and backend services started. The frontend will launch in your browser or emulator, while the backend will be running on your local server.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
