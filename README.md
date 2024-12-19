# QR Password Manager

## Overview

Password Manager is a secure and efficient application that helps users manage their login credentials seamlessly. The project comprises three components:

1. **Chrome Extension**: Detects login pages and interacts with the backend server to facilitate autofill of credentials.
2. **Python Backend**: A Flask-based server hosted on PythonAnywhere, enabling secure communication between the Chrome extension and the mobile app.
3. **Expo Mobile App**: A cross-platform app for managing and storing user credentials locally on the user's phone.

## Features

-   **Login Page Detection**: The Chrome extension identifies login pages and triggers a QR code display.
-   **Credential Management**: The Expo app securely stores user credentials locally and sends them to the browser only upon request.
-   **Secure Communication**: Credentials are temporarily stored on the backend server with a unique request ID and are deleted once the exchange is complete.
-   **User Privacy**: All credentials are stored locally on the user's phone, ensuring complete control and privacy.

## Architecture

1. **Chrome Extension**:

    - Detects login pages using DOM analysis.
    - Displays a QR code for login credential retrieval.
    - Autofills login fields after receiving credentials from the backend server.

2. **Python Backend**:

    - Built using Flask.
    - Tracks incoming requests with unique IDs.
    - Temporarily stores credentials for secure transfer.
    - Deletes credentials from records after the browser successfully retrieves them.

3. **Expo Mobile App**:
    - Manages user credentials securely on the local device.
    - Scans QR codes displayed by the Chrome extension.
    - Sends login credentials to the backend server for browser autofill.

## Technologies Used

-   **Frontend**:

    -   Chrome Extension: JavaScript, HTML, and CSS.
    -   Expo Mobile App: React Native.

-   **Backend**:

    -   Flask (Python).
    -   Hosted on PythonAnywhere.

## Installation

### Chrome Extension

1. Clone this repository:
    ```bash
    git clone https://github.com/aditimishra28/Password-Manager.git
    ```
2. Navigate to the `extension` folder:
    ```bash
    cd Password-Manager/extension
    ```
3. Load the unpacked extension in Chrome:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable **Developer Mode**.
    - Click on **Load unpacked** and select the `extension` folder.

### Python Backend

1. Ensure you have Python installed on your system.

2. Run the Flask server locally:
    ```bash
    python backend/app.py
    ```
    (The server is already hosted on PythonAnywhere for general use.)

### Expo Mobile App

1. Install Expo CLI globally:
    ```bash
    npm install -g expo-cli
    ```
2. Navigate to the `phone-app` folder:
    ```bash
    cd Password-Manager/phone-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the Expo app:
    ```bash
    npx expo start
    ```
    - Use the Expo Go app on your phone to scan the QR code and test the app.

## Usage

1. Install the Chrome extension and visit a login page.
2. The extension detects the login form and displays a QR code.
3. Open the Expo mobile app and scan the QR code.
4. The app sends the credentials to the backend server, which relays them to the browser for autofill.
5. Once the credentials are received and autofilled by the browser, they are deleted from the backend server.

## Security

-   Credentials are stored locally on the user's phone, ensuring privacy and security.
-   The backend server acts as a temporary bridge and does not permanently store any credentials.
-   All communications between the app, server, and extension are encrypted.

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes and push the branch:
    ```bash
    git commit -m "Add new feature"
    git push origin feature-name
    ```
4. Open a pull request describing your changes.

## TODO

-   [ ] ability to import passwords from a CSV / JSON file
-   [ ] ability to add credentials from phone UI
-   [ ] Improve app UI
