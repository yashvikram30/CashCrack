# CashCrack

CashCrack is a basic Paytm clone application that allows users to trade dummy currency values with other registered users on the platform. Built with React.js, TypeScript, and Express.js, CashCrack provides a seamless interface for users to manage and trade virtual funds.

## Features
- **User Registration and Authentication**: Securely sign up and log in to the platform.
- **Dummy Currency**: Users are credited with virtual currency for trading.
- **Trade System**: Trade virtual currency with other registered users.
- **Responsive UI**: A clean, responsive user interface built with React.js.

## Tech Stack
- **Frontend**:
  - React.js
  - TypeScript
  - Vite
- **Backend**:
  - Express.js
  - TypeScript
- **Database**:
  - MongoDB 
- **Other Tools**:
  - Zod for validation 
  - JWT for authentication 

## Project Structure
```
CashCrack/
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   └── ... (API and server files)
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.tsbuildinfo
│
├── frontend/
    ├── node_modules/
    ├── public/
    ├── src/
    │   └── ... (React components and TypeScript files)
    ├── .env
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── vite.config.ts
```

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v16 or above)
- npm or yarn
- MongoDB 

### Steps to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yashvikram30/CashCrack.git
   cd CashCrack
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the required environment variables:
   ```env
   PORT=5000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory with the required environment variables:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

## Contributing
We welcome contributions to improve CashCrack! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Acknowledgements
- Inspired by Paytm and similar digital payment platforms.
- Built with passion for learning and development.



