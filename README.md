# Gym App

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
**Gym App** is a React Native application built using Expo, designed to help users view and log gym exercises. The app connects to a backend service for data retrieval and storage, providing a comprehensive platform for tracking workouts. This project was developed as a learning exercise to enhance proficiency in React Native, focusing on API integration and backend communication.

## Features
- **Form Handling:** Robust form management with validation, ensuring accurate user input.
- **Image Picker:** Enables users to select images from their device gallery.
- **Profile Management:** A dedicated profile screen allows users to update their name, password, and profile picture.
- **Reusable Components:** Modular components used across multiple screens for a consistent UI.
- **Backend Integration:** Seamless communication with a backend server to fetch and store data.
- **Data Persistence:** Stores user data locally to ensure persistence across app sessions.
- **Token Refreshing:** Ensures secure and continuous authentication without requiring frequent logins.
- **Exercise Tracking:** Allows users to view detailed exercise information and log their workouts.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gym-app.git
   cd gym-app
## Usage
- **Viewing Exercises:** Browse a list of exercises pulled from the backend.
- **Logging Workouts:** Keep track of your workouts by logging exercises.
- **Profile Management:** Update your name, password, and profile picture through the profile screen.
- **Custom Components:** Navigate through various screens utilizing a consistent and reusable component structure.

## Technologies Used
- **React Native with Expo:** A powerful framework and toolchain for building cross-platform mobile apps using JavaScript and TypeScript.
- **GluestackUI:** A component library providing a set of pre-built UI components tailored for React Native, ensuring a cohesive design system.
- **TypeScript:** A statically typed superset of JavaScript, adding type safety and enhancing code quality and maintainability.
- **React Hook Form:** A library that simplifies form handling in React Native, providing an intuitive API for managing form state and validation.
- **Yup:** A schema builder for value parsing and validation, used in tandem with React Hook Form to enforce form data integrity.
- **Axios:** A promise-based HTTP client used to interact with the backend API, simplifying data fetching and error handling.
- **AsyncStorage:** A key-value storage system for persisting data locally on the device, ensuring data is retained between sessions.
- **Refresh Token Implementation:** A mechanism to maintain user authentication by securely handling token refreshes, reducing the need for repeated logins.
- **Image Picker:** A native module that allows users to access and select images from their device's gallery.

## Project Structure
```plaintext
├── src/
│   ├── components/    # Reusable components
│   ├── screens/       # Different app screens
│   ├── hooks/         # Custom hooks for form handling and API calls
│   ├── services/      # API service functions using Axios
│   ├── utils/         # Utility functions and constants
│   └── App.tsx        # Entry point of the app
└── package.json       # Project metadata and dependencies
```
## Contributing
This project is intended for educational purposes, but contributions are welcome. Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

