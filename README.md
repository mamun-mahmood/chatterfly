# Chatterfly: Real-Time Chat Application

Chatterfly is a real-time chat application built with React, Material UI, Firebase, and Redux.

![Chatterfly Screenshot](./docs/Screenshot%20from%202023-08-08%2009-45-25.png)
![Chatterfly Screenshot](./docs/Screenshot%20from%202023-08-08%2009-45-01.png)

<!-- live demo -->

[Live Demo](https://chatterfly.vercel.app)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Chatterfly is a modern chat application that leverages the power of Firebase Firestore for real-time data synchronization and Redux for efficient state management. With a user-friendly interface designed using Material UI, Chatterfly provides a seamless and responsive chat experience.

## Features

- Real-time chat rooms and messages synchronization.
- Redux state management for efficient and consistent data handling.
- Responsive user interface with dynamic message rendering.
- Built-in support for user authentication and secure user interactions.

## Prerequisites

- Node.js (v14+)
- Firebase account and project for Firestore setup

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mamun-mahmood/chatterfly
   cd Chatterfly
   ```

   npm install

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a Firebase project and enable Firestore.
4. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
   REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
   REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>
   ```

5. Run the application:

   ```bash
   npm start
   ```

6. Open the application in your browser at `http://localhost:3000`.
