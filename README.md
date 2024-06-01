# Tied Siren App Blocker

This project is a session management application built with React Native & Expo, using TypeScript.

It uses Redux for state management, with selectors for creating actions, reducers, and selectors.

The application fetches session data from a local store, maps the raw response to domain entities, and stores these entities in the Redux store.

## Architecture

The project follows the Hexagonal Architecture pattern, with the following components:

- `react-view`: The user interface, built with React and React Native.
- `core`: The heart of the application, containing the main business logic and domain entities.
- `infra`: Handles infrastructure concerns like fetching data from local storage and database access.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of node.js and yarn.
- You are using a macOS machine. Even though the application should work fine on Windows and Linux, it has not been tested on those platforms.

## Installing Tied Siren Session Management

To install Tied Siren Session Management, follow these steps:

1. Clone the repository.
2. Run `yarn` in the root directory to install the dependencies.
3. Run `yarn start` to start the application.
